export default function TechNewsLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      {/* Back link placeholder */}
      <div className="mb-12 h-4 w-14 rounded bg-muted animate-pulse" />

      {/* Heading */}
      <div className="mb-2 h-8 w-36 rounded-md bg-muted animate-pulse" />
      <div className="mb-10 h-4 w-80 rounded bg-muted animate-pulse" />

      {/* Source filter placeholder */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-20 rounded-md bg-muted animate-pulse"
          />
        ))}
      </div>

      {/* Article rows */}
      <div className="flex flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border-b border-border py-6"
          >
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3.5 w-14 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-4 w-full max-w-lg rounded bg-muted animate-pulse" />
            <div className="h-3.5 w-full max-w-sm rounded bg-muted animate-pulse" />
            <div className="mt-1 flex gap-3">
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3 w-16 rounded bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
