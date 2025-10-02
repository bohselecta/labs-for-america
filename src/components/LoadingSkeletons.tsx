// Loading skeleton components for better UX
export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
        <div className="py-8 md:py-12 animate-pulse">
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-4/6 bg-gray-200 rounded mb-8"></div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 animate-pulse">
          <div className="w-full h-full bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
