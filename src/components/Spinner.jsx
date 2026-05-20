export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}