"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-[#0D1015] border border-[#2C2F36] rounded-sm pl-10 pr-4 py-3.5 text-[#F8F8F8] text-sm placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]"
        aria-hidden="true"
      >
        <filter id="noise-login">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-login)" />
      </svg>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#D4AF37]/15 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#D4AF37]/15 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div
          className="rounded-sm p-8 lg:p-10"
          style={{
            background: "linear-gradient(135deg, #1a1f28 0%, #171B22 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)",
          }}
        >
          {/* Logo / branding */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-14 h-14 mx-auto mb-4 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center"
            >
              <Shield className="w-6 h-6 text-[#D4AF37]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div
                className="font-black tracking-[0.12em] uppercase text-[#F8F8F8] mb-1"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.4rem" }}
              >
                APEX
              </div>
              <div
                className="text-[#D4AF37] text-xs font-semibold tracking-[0.28em] uppercase"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Admin Portal
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)",
            }}
          />

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-[0.12em] mb-1.5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="admin@apexcoaching.com"
                  required
                  className={inputClass}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#A8A8A8] uppercase tracking-[0.12em] mb-1.5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••••••"
                  required
                  className={`${inputClass} pr-11`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#A8A8A8] transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 bg-[#ef4444]/10 border border-[#ef4444]/25 rounded-sm px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <p
                  className="text-[#ef4444] text-xs leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {error}
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing In…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to Admin
                </>
              )}
            </button>
          </motion.form>

          {/* Divider */}
          <div
            className="h-px mt-8 mb-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(44,47,54,0.8), transparent)",
            }}
          />

          {/* Footer note */}
          <p
            className="text-center text-[#6b6b6b] text-xs leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            This portal is restricted to authorized Apex team members only.
            <br />
            Unauthorized access attempts are logged and reported.
          </p>
        </div>

        {/* Below card */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-6 text-[#6b6b6b] text-xs"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Having trouble?{" "}
          <a
            href="mailto:admin@apexcoaching.com"
            className="text-[#D4AF37] hover:text-[#e8c84a] transition-colors duration-150"
          >
            Contact support
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
