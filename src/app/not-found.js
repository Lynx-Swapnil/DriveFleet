import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-cyan-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">Page not found</h2>
      <p className="mt-2 max-w-md text-slate-600">
        Sorry, we could not find the page you are looking for. It may have been
        moved or removed.
      </p>
      <Link href="/" className="mt-8">
        <Button className="bg-cyan-500 text-white">Back to Home</Button>
      </Link>
    </main>
  );
}
