import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// ── Extended Skeleton Variants ─────────────────────────────────────────

/** Inline text placeholder — thin bar */
function SkeletonText({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("h-4 w-20", className)} {...props} />;
}

/** Larger text placeholder — e.g. a dollar value */
function SkeletonValue({ className, ...props }: React.ComponentProps<"div">) {
  return <Skeleton className={cn("h-6 w-24", className)} {...props} />;
}

/** Card-shaped skeleton */
function SkeletonCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm", className)} {...props}>
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-32 mb-1" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

/** Table row skeleton */
function SkeletonRow({ columns = 6, className, ...props }: React.ComponentProps<"tr"> & { columns?: number }) {
  return (
    <tr className={cn("border-b border-gray-200 dark:border-slate-700", className)} {...props}>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-2">
          <Skeleton className="h-4 w-full max-w-[80px]" />
        </td>
      ))}
    </tr>
  );
}

/** Mobile card skeleton for positions/trades */
function SkeletonMobileCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("animate-pulse border border-gray-200 dark:border-slate-700 rounded-lg p-4", className)} {...props}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
        <div className="text-right">
          <Skeleton className="h-5 w-16 mb-1" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Inline skeleton for the TopBar stats strip */
function SkeletonStat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col px-2 md:px-3 leading-tight", className)} {...props}>
      <Skeleton className="h-3 w-12 mb-1" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

/** Chart area skeleton */
function SkeletonChart({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-[250px] w-full rounded-lg" />
    </div>
  );
}

/** Watchlist item skeleton */
function SkeletonWatchlistItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-lg", className)} {...props}>
      <div className="flex items-center gap-3 flex-1">
        <Skeleton className="w-4 h-4 rounded" />
        <div className="flex-1">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="text-right ml-4">
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonValue,
  SkeletonCard,
  SkeletonRow,
  SkeletonMobileCard,
  SkeletonStat,
  SkeletonChart,
  SkeletonWatchlistItem,
};
