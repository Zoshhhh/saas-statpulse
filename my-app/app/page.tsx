import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 text-center">
        <Link href="/dashboard">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
            Accéder au Dashboard
          </button>
        </Link>
      </div>
  );
}