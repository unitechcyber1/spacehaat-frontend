"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { SearchBar } from "@/modules/home/components/search-bar";
import { SearchOption } from "@/types";
import { cn } from "@/utils/cn";
import { verticals } from "@/utils/constants";

const headerSearchLocations: SearchOption[] = [
  { label: "Delhi", value: "delhi" },
  /** Same value as homepage `listHomepageCitiesFromAvailable` (label Gurugram, route slug gurgaon). */
  { label: "Gurugram", value: "gurgaon" },
  { label: "Noida", value: "noida" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Pune", value: "pune" },
];

export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderSearchExpanded, setIsHeaderSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHomepage) return undefined;

    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  useEffect(() => {
    if (!isScrolled) {
      setIsHeaderSearchExpanded(false);
    }
  }, [isScrolled]);

  const useSolidHeader = !isHomepage || isScrolled;
  const shouldExpandHeader = isHomepage && isScrolled && isHeaderSearchExpanded;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 overflow-visible transition-[height,background-color,border-color,box-shadow] duration-300",
        isHomepage ? "fixed" : "sticky",
        shouldExpandHeader ? "h-[18rem]" : "h-20",
        useSolidHeader
          ? "border-b border-slate-200/80 bg-white/92 backdrop-blur-xl"
          : "bg-transparent",
        shouldExpandHeader && "shadow-[0_20px_60px_rgba(15,23,42,0.12)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 hidden lg:flex",
          !isScrolled && "items-center",
        )}
      >
        <div
          className={cn(
            "pointer-events-none relative flex h-full w-full flex-col items-center justify-center",
          )}
        >
          <nav
            className={cn(
              "flex items-center justify-center gap-7 transition-all duration-300",
              isHomepage
                ? isScrolled
                  ? "pointer-events-none hidden -translate-y-2 opacity-0"
                  : "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-auto translate-y-0 opacity-100",
              "text-sm",
            )}
          >
            {verticals.map((vertical) => (
              <Link
                key={vertical.key}
                href={vertical.href}
                className={cn(
                  "text-sm font-medium transition",
                  useSolidHeader
                    ? "text-muted hover:text-ink"
                    : "text-[#e8dcc8]/90 hover:text-[#faf6ee]",
                )}
              >
                {vertical.label}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              isHomepage
                ? isScrolled
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
                : "hidden",
              shouldExpandHeader && "pt-4",
            )}
          >
            <SearchBar
              locations={headerSearchLocations}
              teamSizes={[]}
              budgets={[]}
              variant="header"
              submitLabel="Search"
              className={cn(
                "mx-auto",
                shouldExpandHeader ? "max-w-[48rem]" : "max-w-[48rem]",
              )}
              onExpandedChange={setIsHeaderSearchExpanded}
            />
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            "z-30 flex shrink-0 items-center gap-3",
            useSolidHeader ? "text-ink" : "text-[#faf6ee]",
          )}
        >
          <span
            className={cn(
              "relative flex h-12 items-center",
              !useSolidHeader && "drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]",
            )}
          >
            <Image
              src="/spacehaat-logo.png"
              alt="SpaceHaat"
              width={210}
              height={48}
              priority
              className="h-9 w-auto object-contain"
            />
          </span>
        </Link>

        <div
          className={cn(
            "z-30 ml-auto flex items-center gap-2 transition-all duration-300 sm:gap-3",
            shouldExpandHeader && "pointer-events-none opacity-0",
          )}
        >
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition lg:hidden",
              useSolidHeader
                ? "border-slate-200/90 bg-white text-ink shadow-[0_6px_20px_rgba(15,23,42,0.08)] hover:bg-slate-50"
                : "border-[#f0e8d8]/40 bg-[rgba(22,18,14,0.32)] text-[#faf6ee] shadow-[0_10px_36px_rgba(8,6,5,0.35)] backdrop-blur-md hover:border-[#c9a962]/45 hover:bg-[rgba(32,26,20,0.48)]",
            )}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Button
            type="button"
            onClick={() => setIsContactOpen(true)}
            variant={useSolidHeader ? "primary" : "secondary"}
            className={cn(
              "hidden px-4 lg:inline-flex lg:px-5",
              !useSolidHeader &&
                "border-[#f0e8d8]/40 bg-[rgba(22,18,14,0.32)] text-[#faf6ee] shadow-[0_10px_36px_rgba(8,6,5,0.35)] backdrop-blur-md hover:border-[#c9a962]/45 hover:bg-[rgba(32,26,20,0.48)] hover:text-[#fffcf5]",
            )}
          >
            Enquire Now
          </Button>
        </div>
      </Container>

      <div className="hidden lg:block">
        <ContactFormModal
          open={isContactOpen}
          onOpenChange={setIsContactOpen}
          leadTarget={{ city: "global", spaceId: "header" }}
          submitLabel="Enquire Now"
          title="Enquire Now"
          subtitle="Get best deals and availability in minutes."
        />
      </div>

      {isMobileMenuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-20 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            id="site-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className={cn(
              "fixed inset-x-0 top-20 z-50 max-h-[min(32rem,calc(100vh-5rem))] overflow-y-auto border-b shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:hidden",
              useSolidHeader ? "border-slate-200/80 bg-white" : "border-white/10 bg-[#0f1419]/96 text-white backdrop-blur-xl",
            )}
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {verticals.map((vertical) => (
                <Link
                  key={vertical.key}
                  href={vertical.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-base font-medium transition",
                    useSolidHeader
                      ? "text-ink hover:bg-slate-100"
                      : "text-[#f5efe3] hover:bg-white/10",
                  )}
                >
                  {vertical.label}
                </Link>
              ))}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className={cn(
                  "mt-2 rounded-xl px-4 py-3.5 text-center text-base font-semibold transition",
                  useSolidHeader
                    ? "bg-slate-950 text-white hover:bg-slate-800"
                    : "border border-[#c9a962]/45 bg-[rgba(32,26,20,0.55)] text-[#faf6ee] hover:bg-[rgba(40,32,26,0.65)]",
                )}
              >
                Enquire Now
              </Link>
            </nav>
          </div>
        </>
      ) : null}

      <div className="lg:hidden">
        <ContactFormModal
          open={isContactOpen}
          onOpenChange={setIsContactOpen}
          leadTarget={{ city: "global", spaceId: "header" }}
          submitLabel="Enquire Now"
          title="Enquire Now"
          subtitle="Get best deals and availability in minutes."
        />
      </div>
    </header>
  );
}
