/* eslint-disable react/prop-types */
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 text-red-600 text-center bg-red-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">An error occurred!</h2>
      <p className="mt-2">{error?.message || "Unknown error"}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
}

export default function AppWithErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}