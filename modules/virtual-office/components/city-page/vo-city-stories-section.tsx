"use client";

import type { ReactNode } from "react";
import { BadgeCheck, Lock, Star } from "lucide-react";

import {
  VoEyebrow,
  VoSection,
  VoSectionTitle,
} from "@/modules/virtual-office/components/city-page/vo-city-ui";
import { cn } from "@/utils/cn";

type StoryAvatarTone = "brand" | "blue" | "orange" | "emerald" | "purple";

type VoCityStory = {
  id: string;
  quote: ReactNode;
  initials: string;
  name: string;
  role: string;
  tag: string;
  avatarTone: StoryAvatarTone;
  featured?: boolean;
};

const AVATAR_TONE: Record<StoryAvatarTone, string> = {
  brand: "bg-[#EDF7EE] text-[color:var(--color-brand)]",
  blue: "bg-[#E8F0FE] text-[#1A56DB]",
  orange: "bg-[#FFF3E6] text-[#C45A11]",
  emerald: "bg-[#E7F8EF] text-emerald-700",
  purple: "bg-[#F0EBFF] text-[#6B46C1]",
};

function StoryStars({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#F4A621] text-[#F4A621] sm:h-4 sm:w-4" aria-hidden />
      ))}
    </div>
  );
}

function StoryRatingSummary() {
  return (
    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
      <StoryStars />
      <p className="text-[13px] leading-snug text-[#555] sm:text-sm">
        <span className="font-semibold text-ink">4.8/5</span> from{" "}
        <span className="font-semibold text-ink">512</span> verified businesses
      </p>
    </div>
  );
}

function StoryAuthor({
  initials,
  name,
  role,
  avatarTone,
}: Pick<VoCityStory, "initials" | "name" | "role" | "avatarTone">) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:text-[13px]",
          AVATAR_TONE[avatarTone],
        )}
        aria-hidden
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1 text-[13px] font-semibold text-ink sm:text-sm">
          {name}
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand)]" aria-hidden />
        </p>
        <p className="truncate text-[12px] text-muted sm:text-[13px]">{role}</p>
      </div>
    </div>
  );
}

function StoryTag({ tag }: { tag: string }) {
  return (
    <span className="inline-flex max-w-full self-start rounded-md bg-[#EDF7EE] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-brand)] sm:text-xs">
      {tag}
    </span>
  );
}

function StoryCard({ story, className }: { story: VoCityStory; className?: string }) {
  if (story.featured) {
    return (
      <article
        className={cn(
          "relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#EAE7E0] bg-[#F4FAF6] p-5 sm:p-6 lg:p-7",
          className,
        )}
      >
        <span
          className="pointer-events-none absolute right-4 top-3 select-none font-serif text-[5.5rem] leading-none text-[color:var(--color-brand)]/10 sm:right-5 sm:top-4 sm:text-[6.5rem]"
          aria-hidden
        >
          &ldquo;
        </span>
        <StoryStars />
        <p className="relative mt-4 flex-1 text-[15px] leading-[1.65] text-[#333] sm:mt-5 sm:text-base sm:leading-[1.7]">
          {story.quote}
        </p>
        <div className="relative mt-auto space-y-3 pt-6 sm:pt-8">
          <StoryAuthor
            initials={story.initials}
            name={story.name}
            role={story.role}
            avatarTone={story.avatarTone}
          />
          <StoryTag tag={story.tag} />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex h-full min-h-0 flex-col rounded-2xl border border-[#EAE7E0] bg-white p-4 sm:p-5",
        className,
      )}
    >
      <StoryStars />
      <p className="mt-3 flex-1 text-[13.5px] leading-[1.6] text-[#333] sm:mt-3.5 sm:text-[15px] sm:leading-[1.65]">
        {story.quote}
      </p>
      <div className="mt-auto space-y-2.5 pt-4 sm:pt-5">
        <StoryAuthor
          initials={story.initials}
          name={story.name}
          role={story.role}
          avatarTone={story.avatarTone}
        />
        <StoryTag tag={story.tag} />
      </div>
    </article>
  );
}

function buildStories(cityDisplay: string): VoCityStory[] {
  return [
    {
      id: "featured",
      featured: true,
      quote: (
        <>
          Got my {cityDisplay} GSTIN in <b className="font-semibold text-ink">6 days</b>. The documents were
          perfect NOC, agreement and the DHBVN bill all lined up, so there was zero rejection. I was
          registering from Bangalore and never had to travel once.
        </>
      ),
      initials: "AS",
      name: "Aarav Sharma",
      role: "Founder, D2C E-commerce brand",
      tag: `GST Registration · Sohna Road`,
      avatarTone: "brand",
    },
    {
      id: "meera",
      quote: (
        <>
          Moved to a Cyber City address in <b className="font-semibold text-ink">3 days</b>. Clients noticed it
          on our invoices immediately it changed how enterprise buyers took our calls.
        </>
      ),
      initials: "MK",
      name: "Meera Kapoor",
      role: "Independent Consultant",
      tag: "Business Address · Cyber City",
      avatarTone: "blue",
    },
    {
      id: "rohit",
      quote: (
        <>
          The SpaceHaat team shortlisted 3 options for us no pressure, no brokerage. We picked Golf Course
          Road and never looked back.
        </>
      ),
      initials: "RT",
      name: "Rohit Talwar",
      role: "Co-founder, SaaS Startup",
      tag: "Company Registration · Golf Course Rd",
      avatarTone: "orange",
    },
    {
      id: "sneha",
      quote: (
        <>
          As an Amazon seller I needed a Haryana GSTIN fast. Filed on a Monday, had the certificate by the
          next week. The helpdesk actually replied.
        </>
      ),
      initials: "SP",
      name: "Sneha Patel",
      role: "Marketplace Seller",
      tag: "GST Registration · Udyog Vihar",
      avatarTone: "emerald",
    },
    {
      id: "vikram",
      quote: (
        <>
          We incorporated our Pvt Ltd entirely remotely from Pune. CIN, PAN and the registered office address
          were all sorted in under two weeks.
        </>
      ),
      initials: "VN",
      name: "Vikram Nair",
      role: "Director, Fintech startup",
      tag: "Company Registration · Cyber City",
      avatarTone: "purple",
    },
  ];
}

export function VoCityStoriesSection({ cityDisplay }: { cityDisplay: string }) {
  const stories = buildStories(cityDisplay);
  const [featured, ...rest] = stories;

  return (
    <VoSection id="customer-stories">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <VoEyebrow>Customer stories</VoEyebrow>
          <VoSectionTitle>Trusted by founders across India</VoSectionTitle>
        </div>
        <StoryRatingSummary />
      </div>

      <div className="mt-6 grid items-stretch gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
        <StoryCard story={featured} className="sm:col-span-2 lg:col-span-1 lg:row-span-2" />

        {rest.map((story) => (
          <StoryCard key={story.id} story={story} className="h-full min-h-0" />
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-[12px] text-muted sm:mt-8 sm:text-[13px]">
        <Lock className="h-3.5 w-3.5 shrink-0 text-[#C4A035]" aria-hidden />
        Every review is from a verified, paying SpaceHaat customer
      </p>
    </VoSection>
  );
}
