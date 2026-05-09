export function Loading() {
  return <p className="p-6">Loading...</p>
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="p-6">
      <p className="text-red-500">Something went wrong</p>

      {onRetry && (
        <button onClick={onRetry} className="underline mt-2">
          Retry
        </button>
      )}
    </div>
  )
}
