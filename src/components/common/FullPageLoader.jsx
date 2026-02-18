export default function FullPageLoader() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-16 text-white/70">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/25 border-t-white" aria-hidden="true" />
      <p className="text-xs uppercase tracking-[0.4em]">Loading</p>
    </div>
  );
}
