import Image from "next/image";
import { Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

type ResidentStory = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const STORIES: ResidentStory[] = [
  {
    id: "ananya",
    quote:
      "I moved cities for a new role and had a tour booked the same evening. The home matched the photos — which I cannot say about the three other PG apps I tried.",
    name: "Ananya Rao",
    role: "Product manager · moved Mumbai → Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&q=80",
  },
  {
    id: "karan",
    quote:
      "What sold me was the pricing being all-inclusive on paper and in practice. No surprise electricity bills six months in. The concierge stayed in touch even after I moved.",
    name: "Karan Shetty",
    role: "Founder · Maison Cyber, Gurugram",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
  },
  {
    id: "riya",
    quote:
      "As a woman moving alone, the women-only residences with on-site managers were the only thing my parents were comfortable with. The shortlist saved me a week of visits.",
    name: "Riya Bansal",
    role: "Designer · Brookhouse, Indiranagar",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
  },
];

function StarRating({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4"
          aria-hidden
        />
      ))}
    </div>
  );
}

function StoryCard({ story }: { story: ResidentStory }) {
  return (
    <article className="flex min-h-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft sm:p-7 lg:p-8">
      <StarRating />
      <blockquote className="mt-5 flex-1 font-serif text-lg leading-[1.65] tracking-[-0.01em] text-ink sm:mt-6 sm:text-[1.125rem] sm:leading-[1.7]">
        &ldquo;{story.quote}&rdquo;
      </blockquote>
      <div className="mt-6 border-t border-slate-200/80 pt-5 sm:mt-7 sm:pt-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200/80 bg-slate-100 ring-1 ring-slate-900/[0.04]">
            <Image src={story.avatar} alt="" fill className="object-cover" sizes="40px" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold tracking-[-0.01em] text-ink sm:text-[0.9375rem]">
              {story.name}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">{story.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ColivingResidentStories() {
  return (
    <section className="bg-[linear-gradient(180deg,#f9f8f5_0%,#ffffff_55%,rgba(244,248,255,0.75)_100%)] bg-hero-glow py-14 sm:py-20">
      <Container>
        <header className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-x-16 xl:gap-x-24">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs">
              <span
                className="h-px w-7 bg-gradient-to-r from-transparent via-slate-400/80 to-slate-400/80"
                aria-hidden
              />
              <span className="text-brand">Resident stories</span>
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-5 sm:max-w-none sm:text-4xl sm:leading-[1.06] lg:text-[2.5rem] lg:leading-[1.05] xl:text-[2.65rem]">
              People who found{" "}
              <span className="font-serif text-[1.06em] font-semibold italic text-[color:var(--color-accent)]">
                home,
              </span>{" "}
              not just a room.
            </h2>
          </div>
          <div className="flex min-w-0 lg:justify-end lg:pb-1">
            <p className="max-w-md text-left text-base leading-relaxed text-muted sm:text-lg lg:max-w-lg lg:text-right">
              From relocations to first jobs, founders&apos; moves to long-stay returns — the homes we list earn their
              reviews honestly.
            </p>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Container>
    </section>
  );
}
