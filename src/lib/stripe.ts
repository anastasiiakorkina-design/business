import Stripe from "stripe";

// ─── Client Singleton ────────────────────────────────────────────────────────

if (!process.env.STRIPE_SECRET_KEY) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("STRIPE_SECRET_KEY is required in production");
  }
  console.warn("[stripe] STRIPE_SECRET_KEY is not set. Stripe features will be unavailable.");
}

export const stripe: Stripe | null = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
      typescript: true,
      maxNetworkRetries: 3,
    })
  : null;

export function getStripe(): Stripe {
  if (!stripe) throw new Error("Stripe is not configured — set STRIPE_SECRET_KEY.");
  return stripe;
}

// ─── Price Map ───────────────────────────────────────────────────────────────
// Maps service slugs to their Stripe Price IDs (set in .env)

export const STRIPE_PRICES = {
  "strategy-session":    process.env.STRIPE_PRICE_STRATEGY_SESSION ?? "",
  "90-day-accelerator":  process.env.STRIPE_PRICE_90_DAY_ACCELERATOR ?? "",
  mastermind:            process.env.STRIPE_PRICE_MASTERMIND ?? "",
  "vip-day":             process.env.STRIPE_PRICE_VIP_DAY ?? "",
} as const satisfies Record<string, string>;

export type ServiceSlug = keyof typeof STRIPE_PRICES;

// ─── Checkout Session ─────────────────────────────────────────────────────────

export interface CreateCheckoutOptions {
  priceId: string;
  mode?: Stripe.Checkout.SessionCreateParams.Mode;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId?: string;
  metadata?: Record<string, string>;
  trialDays?: number;
  allowPromoCodes?: boolean;
  quantity?: number;
}

export async function createCheckoutSession(options: CreateCheckoutOptions): Promise<Stripe.Checkout.Session> {
  const client = getStripe();
  const {
    priceId,
    mode = "payment",
    customerEmail,
    successUrl,
    cancelUrl,
    clientReferenceId,
    metadata,
    trialDays,
    allowPromoCodes = true,
    quantity = 1,
  } = options;

  const params: Stripe.Checkout.SessionCreateParams = {
    mode,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    billing_address_collection: "required",
    allow_promotion_codes: allowPromoCodes,
  };

  if (customerEmail) params.customer_email = customerEmail;
  if (clientReferenceId) params.client_reference_id = clientReferenceId;
  if (metadata) params.metadata = metadata;
  if (mode === "subscription" && trialDays) {
    params.subscription_data = { trial_period_days: trialDays };
  }

  return client.checkout.sessions.create(params);
}

// ─── Payment Intent (one-time) ────────────────────────────────────────────────

export interface CreatePaymentIntentOptions {
  amount: number; // cents
  currency?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
  description?: string;
}

export async function createPaymentIntent(
  options: CreatePaymentIntentOptions
): Promise<Stripe.PaymentIntent> {
  const client = getStripe();
  const { amount, currency = "usd", customerEmail, metadata, description } = options;

  const params: Stripe.PaymentIntentCreateParams = {
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  };

  if (customerEmail) {
    const customers = await client.customers.list({ email: customerEmail, limit: 1 });
    if (customers.data.length > 0) {
      params.customer = customers.data[0].id;
    }
  }
  if (metadata) params.metadata = metadata;
  if (description) params.description = description;

  return client.paymentIntents.create(params);
}

// ─── Customer Management ──────────────────────────────────────────────────────

export async function findOrCreateCustomer(
  email: string,
  name?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  const client = getStripe();
  const existing = await client.customers.list({ email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0];

  return client.customers.create({
    email,
    name,
    metadata,
  });
}

export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const client = getStripe();
  const result = await client.customers.list({ email, limit: 1 });
  return result.data[0] ?? null;
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

export async function getActiveSubscriptions(
  customerId: string
): Promise<Stripe.Subscription[]> {
  const client = getStripe();
  const result = await client.subscriptions.list({
    customer: customerId,
    status: "active",
  });
  return result.data;
}

export async function cancelSubscription(
  subscriptionId: string,
  atPeriodEnd = true
): Promise<Stripe.Subscription> {
  const client = getStripe();
  return client.subscriptions.update(subscriptionId, {
    cancel_at_period_end: atPeriodEnd,
  });
}

// ─── Billing Portal ───────────────────────────────────────────────────────────

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const client = getStripe();
  return client.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

// ─── Webhook Verification ─────────────────────────────────────────────────────

export function constructWebhookEvent(
  payload: Buffer | string,
  signature: string
): Stripe.Event {
  const client = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return client.webhooks.constructEvent(payload, signature, webhookSecret);
}

// ─── Price Helpers ────────────────────────────────────────────────────────────

export function centsToDollars(cents: number): number {
  return cents / 100;
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function formatStripeAmount(amount: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(centsToDollars(amount));
}

// ─── Product Retrieval ────────────────────────────────────────────────────────

export async function getProduct(productId: string): Promise<Stripe.Product> {
  return getStripe().products.retrieve(productId, { expand: ["default_price"] });
}

export async function getPriceWithProduct(priceId: string): Promise<Stripe.Price> {
  return getStripe().prices.retrieve(priceId, { expand: ["product"] });
}

export async function listActiveProducts(): Promise<Stripe.Product[]> {
  const result = await getStripe().products.list({
    active: true,
    expand: ["data.default_price"],
  });
  return result.data;
}

// ─── Invoice Helpers ─────────────────────────────────────────────────────────

export async function getInvoicesForCustomer(
  customerId: string,
  limit = 10
): Promise<Stripe.Invoice[]> {
  const result = await getStripe().invoices.list({
    customer: customerId,
    limit,
    status: "paid",
  });
  return result.data;
}

// ─── Type Guards ──────────────────────────────────────────────────────────────

export function isStripeCustomer(obj: unknown): obj is Stripe.Customer {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "object" in obj &&
    (obj as { object: string }).object === "customer"
  );
}

export function isStripeSubscription(obj: unknown): obj is Stripe.Subscription {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "object" in obj &&
    (obj as { object: string }).object === "subscription"
  );
}
