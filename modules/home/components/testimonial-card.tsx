import { Quote } from "lucide-react";

import { Testimonial } from "@/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft">
      <Quote className="h-5 w-5 text-[color:var(--color-brand)]" />
      <p className="mt-5 text-base leading-7 text-slate-700">{testimonial.quote}</p>
      <div className="mt-6">
        <p className="font-semibold text-ink">{testimonial.name}</p>
        <p className="mt-1 text-sm text-muted">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
    </article>
  );
}
