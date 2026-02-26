export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="card p-8 max-w-lg w-full">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist.</p>
        <a
          href="/en"
          className="mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90"
        >
          Go to home
        </a>
      </div>
    </div>
  );
}
