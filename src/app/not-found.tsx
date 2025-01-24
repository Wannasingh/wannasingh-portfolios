import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">
        Not Found Page
      </h2>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
