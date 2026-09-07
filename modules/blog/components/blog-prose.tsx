import type { BlogContentBlock } from "@/types/blog";
import { cn } from "@/utils/cn";

export function BlogProse({
  blocks,
  bodyHtml,
  className,
}: {
  blocks?: BlogContentBlock[];
  bodyHtml?: string;
  className?: string;
}) {
  if (bodyHtml?.trim()) {
    return (
      <div
        className={cn(
          "blog-prose max-w-none text-[1.0625rem] leading-[1.85] text-slate-700 sm:text-[1.125rem]",
          "[&_a]:font-medium [&_a]:text-[color:var(--color-brand)] [&_a]:underline-offset-2 hover:[&_a]:underline",
          "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[color:var(--color-brand)] [&_blockquote]:pl-4 [&_blockquote]:text-slate-600",
          "[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[1.65rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h2]:first:mt-0 sm:[&_h2]:text-[1.85rem]",
          "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-ink",
          "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl",
          "[&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mb-6 [&_p]:last:mb-0 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-[color:var(--color-brand)]",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    );
  }

  const contentBlocks = blocks ?? [];

  return (
    <div
      className={cn(
        "max-w-none text-[1.0625rem] leading-[1.85] text-slate-700 sm:text-[1.125rem]",
        className,
      )}
    >
      {contentBlocks.map((block, index) => {
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
