export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border p-3">
      <div className="h-40 w-full rounded-xl bg-gray-200" />
      <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-2 h-8 w-full rounded bg-gray-200" />
    </div>
  );
}
