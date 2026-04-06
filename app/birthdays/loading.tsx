export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-12 h-4 w-10 animate-pulse rounded bg-muted" />
      <div className="mb-10">
        <div className="h-8 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-44 animate-pulse rounded bg-muted/60" />
      </div>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className="h-[100px] w-[100px] animate-pulse rounded-full bg-muted"
              style={{ animationDelay: `${i * 80}ms` }}
            />
            <div
              className="h-3 w-10 animate-pulse rounded bg-muted/60"
              style={{ animationDelay: `${i * 80}ms` }}
            />
            <div
              className="h-2.5 w-14 animate-pulse rounded bg-muted/40"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
