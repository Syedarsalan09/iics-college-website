import Loading from "./Loading";

export default function ApiStatus({ loading, error, retry, children }) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        role="alert"
      >
        <p>{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-3 font-semibold underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return children;
}
