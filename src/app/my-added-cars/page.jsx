import MyCarCard from "@/components/MyCarCard";
import { apiFetch } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyAddedCarsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  let cars = [];
  try {
    const res = await apiFetch("/cars/my", {
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      cars = await res.json();
    }
  } catch {
    cars = [];
  }

  if (!Array.isArray(cars)) {
    cars = [];
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">My Added Cars</h1>
      <p className="mt-2 text-slate-600">Manage your listed vehicles.</p>

      {cars.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">
          You have not added any cars yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <MyCarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}
