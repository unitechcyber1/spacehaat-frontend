import type { BlogContentBlock } from "@/types/blog";
import { cn } from "@/utils/cn";

export function BlogProse({
  blocks,
  className,
}: {
  blocks: BlogContentBlock[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-[1.0625rem] leading-[1.85] text-slate-700 sm:text-[1.125rem]",
        className,
      )}
    >
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index} className="mt-0 mb-6 last:mb-0">
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mb-4 mt-10 font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-ink first:mt-0 sm:text-[1.85rem]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="mb-3 mt-8 font-display text-xl font-semibold leading-snug text-ink"
            >
              {block.text}
            </h3>
          );
        }
        return (
          <ul key={index} className="mb-6 list-disc space-y-2 pl-5 marker:text-[color:var(--color-brand)]">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
