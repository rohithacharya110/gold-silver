export function ArtworkGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-ab-border bg-ab-card shadow-sm"
        >
          <div className="aspect-[4/5] animate-pulse bg-gradient-to-br from-ab-line to-ab-border" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-ab-line" />
            <div className="h-3 w-full animate-pulse rounded bg-ab-line/80" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-ab-line/80" />
          </div>
        </div>
      ))}
    </div>
  );
}
