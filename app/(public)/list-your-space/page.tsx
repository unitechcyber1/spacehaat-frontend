"use client";

import { Headset, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

type Mode = "signup" | "login";

type CompactFieldProps = {
  label: string;
  icon: React.ReactNode;
  hasPrefix?: boolean;
  children: React.ReactNode;
};

function CompactField({ label, icon, hasPrefix, children }: CompactFieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink/45">
        {label}
      </span>
      <div
        className={cn(
          "flex h-11 items-stretch gap-2 rounded-xl border border-ink/10 bg-white px-3 text-base",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition",
          "focus-within:border-[color:var(--color-brand)] focus-within:ring-2 focus-within:ring-[rgba(76,175,80,0.18)]",
        )}
      >
        <span className="flex w-6 shrink-0 items-center justify-center self-center text-[color:var(--color-brand)]/85">
          {icon}
        </span>
        {hasPrefix ? (
          <span className="flex shrink-0 items-center self-center pr-0.5 text-sm font-medium tabular-nums text-ink/75">
            +91
            <span aria-hidden className="mx-2 text-ink/20">
              |
            </span>
          </span>
        ) : null}
        {children}
      </div>
    </label>
  );
}

export default function ListYourSpacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionExpired = searchParams.get("reason") === "session-expired";
  const loginRequired = searchParams.get("reason") === "login-required";
  const [mode, setMode] = useState<Mode>("signup");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phone10 = useMemo(
    () => phoneNumber.replace(/\D/g, "").slice(-10),
    [phoneNumber],
  );
  const isValidPhone = phone10.length === 10;

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const canSubmitSignup =
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    isValidEmail &&
    isValidPhone;

  const canSubmitLogin = isValidPhone;

  const switchMode = useCallback((next: Mode) => {
    setMode(next);
    setError(null);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);

    const ok = mode === "signup" ? canSubmitSignup : canSubmitLogin;
    if (!ok) {
      setError(mode === "signup" ? "Please fill all details to continue." : "Enter a valid 10-digit mobile number.");
      return;
    }

    // OTP verification is intentionally disabled for now.
    setBusy(true);
    router.push("/add");
  }

  return (
    <div className="min-h-[60vh] bg-[#f7f4ee]">
      <Container className="py-8 sm:py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-8 lg:grid lg:max-w-6xl lg:grid-cols-[1.1fr_minmax(0,28rem)] lg:items-start lg:gap-10 xl:gap-12">
          <div className="order-2 lg:order-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink/50">
              List with SpaceHaat
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl lg:text-[2.25rem]">
              List your property. Get verified leads. Close faster.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 sm:text-[0.95rem]">
              Create your host account to list Coworking and Office spaces. Manage inventory, track
              leads, and update listings anytime.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {["Zero brokerage", "Genuine leads", "Pan-India reach"].map((t) => (
                <div
                  key={t}
                  className="rounded-lg border border-ink/8 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-ink shadow-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 w-full lg:order-2 lg:justify-self-end">
            <div
              className={cn(
                "mx-auto w-full max-w-md rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)]",
                "sm:p-7",
              )}
            >
              <div className="text-center">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.65rem]">
                  {mode === "signup" ? "Create account" : "Log in"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {mode === "signup"
                    ? "Enter your details to continue to the host panel."
                    : "Enter your mobile number to continue to the host panel."}
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/90 px-4 py-2.5 text-sm leading-snug text-amber-950">
                OTP verification is temporarily disabled. You can continue without a code.
              </div>

              {sessionExpired ? (
                <div className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50/90 px-4 py-2.5 text-sm leading-snug text-amber-950">
                  Session expired. Sign in again to continue.
                </div>
              ) : null}

              {loginRequired ? (
                <div className="mt-4 rounded-lg border border-sky-200/90 bg-sky-50/90 px-4 py-2.5 text-sm leading-snug text-sky-950">
                  Sign in to open the host listing panel.
                </div>
              ) : null}

              <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
                {mode === "signup" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <CompactField label="First name" icon={<User className="h-4 w-4" />}>
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First"
                          className="min-h-0 w-full min-w-0 border-0 bg-transparent py-0.5 text-base outline-none placeholder:text-ink/35"
                          disabled={busy}
                          autoFocus
                        />
                      </CompactField>
                      <CompactField label="Last name" icon={<User className="h-4 w-4" />}>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last"
                          className="min-h-0 w-full min-w-0 border-0 bg-transparent py-0.5 text-base outline-none placeholder:text-ink/35"
                          disabled={busy}
                        />
                      </CompactField>
                    </div>

                    <CompactField label="Email" icon={<Mail className="h-4 w-4" />}>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@email.com"
                        className="min-h-0 w-full min-w-0 border-0 bg-transparent py-0.5 text-base outline-none placeholder:text-ink/35"
                        disabled={busy}
                      />
                    </CompactField>
                  </>
                ) : null}

                <CompactField label="Mobile" icon={<Phone className="h-4 w-4" />} hasPrefix>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit number"
                    className="min-h-0 w-full min-w-0 border-0 bg-transparent py-0.5 text-base outline-none placeholder:text-ink/35"
                    disabled={busy}
                    autoFocus={mode === "login"}
                  />
                </CompactField>

                {error ? (
                  <div className="rounded-lg border border-red-200/90 bg-red-50/90 px-4 py-2.5 text-sm text-red-800">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={busy || (mode === "signup" ? !canSubmitSignup : !canSubmitLogin)}
                  className={cn(
                    "mt-1 flex h-12 w-full items-center justify-center rounded-full text-base font-semibold transition",
                    "border border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white",
                    "hover:brightness-105 active:scale-[0.99]",
                    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100",
                  )}
                >
                  {busy ? "Opening panel…" : "Continue"}
                </button>

                <p className="pt-1 text-center text-sm text-ink/65">
                  {mode === "signup" ? (
                    <>
                      Already have an Account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("login")}
                        className="font-semibold text-[color:var(--color-brand)] hover:text-[color:var(--color-accent)]"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      Create an Account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="font-semibold text-[color:var(--color-brand)] hover:text-[color:var(--color-accent)]"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>

            <div className="mx-auto mt-4 flex w-full max-w-md items-start gap-4 rounded-2xl border border-ink/8 bg-white/95 p-5 shadow-[0_8px_28px_rgba(0,0,0,0.05)] sm:p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                <Headset className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-ink">Need help listing?</h3>
                <p className="mt-1 break-words text-sm leading-relaxed text-ink/70">
                  <a
                    href="tel:+917017333425"
                    className="font-medium text-ink hover:text-[color:var(--color-brand)]"
                  >
                    +91 701 733 3425
                  </a>
                  <span className="mx-1.5 text-ink/40">,</span>
                  <a
                    href="mailto:hello@spacehaat.com"
                    className="font-medium text-ink hover:text-[color:var(--color-brand)]"
                  >
                    hello@spacehaat.com
                  </a>
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-ink/55 lg:hidden">
              <Link href="/" className="hover:text-ink">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
