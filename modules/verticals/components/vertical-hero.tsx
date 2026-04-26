import Image from "next/image";
import { Building2, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { VerticalLandingData } from "@/types";

type VerticalHeroProps = {
  data: VerticalLandingData;
};

export function VerticalHero({ data }: VerticalHeroProps) {
  if (data.vertical === "coworking") {
    return (
      <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
        <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(75,154,255,0.16),transparent_32%),radial-gradient(circle_at_70%_12%,rgba(123,97,255,0.12),transparent_24%),linear-gradient(180deg,#f7fbff_0%,#ffffff_90%)]" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <FadeIn>
                <Badge className="bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                  {data.hero.eyebrow}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
                  {data.hero.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  {data.hero.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <div className="mt-8">
                  <Button href="#lead-form">Get Instant Details</Button>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.18}>
              <div className="hidden lg:block">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_40px_120px_rgba(15,23,42,0.14)]">
                  <div className="grid gap-3 lg:grid-cols-[1.06fr_0.94fr]">
                    <div className="relative min-h-[26rem] overflow-hidden rounded-[1.6rem]">
                      <Image
                        src={data.hero.image}
                        alt={data.hero.imageLabel}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/62 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                          Productive environments
                        </p>
                        <p className="mt-2 text-2xl font-semibold leading-tight">
                          Flexible inventory across India&apos;s most active startup and business districts.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {(data.hero.stats ?? []).map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.5rem] bg-[linear-gradient(135deg,#f7faff_0%,#eef4ff_100%)] p-5"
                        >
                          <Sparkles className="h-5 w-5 text-[color:var(--color-brand)]" />
                          <p className="mt-5 text-lg font-semibold text-ink">{item.value}</p>
                          <p className="mt-2 text-sm text-muted">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    );
  }

  if (data.vertical === "virtual-office") {
    return (
      <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(76,175,80,0.18),transparent_32%),radial-gradient(circle_at_70%_12%,rgba(34,197,94,0.12),transparent_24%),linear-gradient(180deg,#f7fbff_0%,#ffffff_90%)]" />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <FadeIn>
                <Badge className="bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                  {data.hero.eyebrow}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
                  {data.hero.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  {data.hero.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {(data.hero.badges ?? []).map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-700 shadow-soft"
                    >
                      <ShieldCheck className="h-4 w-4 text-[color:var(--color-brand)]" />
                      {badge}
                    </span>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.24}>
                <div className="mt-8">
                  <Button href="#lead-form">{data.hero.ctaLabel}</Button>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="hidden lg:block">
                <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_40px_120px_rgba(15,23,42,0.14)]">
                  <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem]">
                      <Image
                        src={data.hero.image}
                        alt={data.hero.imageLabel}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/60 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                          Compliance-led setup
                        </p>
                        <p className="mt-2 text-2xl font-semibold leading-tight">
                          Professional addresses and documentation support that feel credible from day one.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
                        <CheckCircle2 className="h-5 w-5 text-[color:var(--color-brand)]" />
                        <p className="mt-4 text-lg font-semibold">Trusted provider network</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Start from providers with better documentation standards and service clarity.
                        </p>
                      </div>
                      <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#0b1119_0%,#10203b_60%,#17324f_100%)] p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/66">
                          Common use cases
                        </p>
                        <div className="mt-4 grid gap-3 text-sm text-white/82">
                          <p>GST registration</p>
                          <p>Company incorporation</p>
                          <p>Business mail handling</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top_left,rgba(63,92,171,0.18),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(145,176,255,0.16),transparent_22%),linear-gradient(180deg,#f5f8fd_0%,#ffffff_92%)]" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge className="bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                {data.hero.eyebrow}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
                {data.hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                {data.hero.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#lead-form">{data.hero.ctaLabel}</Button>
                <Button href="/office-space/gurgaon" variant="secondary">
                  Explore premium offices
                </Button>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.18}>
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_40px_120px_rgba(15,23,42,0.16)]">
                <div className="relative min-h-[30rem] overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={data.hero.image}
                    alt={data.hero.imageLabel}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/76 via-[#08111f]/18 to-transparent" />
                  <div className="absolute inset-0 flex items-end justify-between p-6 text-white">
                    <div className="max-w-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                        Enterprise-ready inventory
                      </p>
                      <p className="mt-2 text-3xl font-semibold leading-tight">
                        Premium offices for teams that care about brand, service, and scale.
                      </p>
                    </div>
                    <div className="hidden w-[16rem] gap-3 lg:grid">
                      {(data.hero.stats ?? []).map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.3rem] border border-white/14 bg-white/10 p-4 backdrop-blur"
                        >
                          <Building2 className="h-5 w-5 text-white" />
                          <p className="mt-4 text-base font-semibold">{item.value}</p>
                          <p className="mt-1 text-sm text-white/68">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
