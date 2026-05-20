const steps = [
  { step: "1", title: "Browse Cars", text: "Explore our fleet and compare prices, types, and locations." },
  { step: "2", title: "Book Online", text: "Sign in, choose your dates, add notes, and confirm your booking." },
  { step: "3", title: "Drive Away", text: "Pick up your car at the listed location and enjoy the ride." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold text-slate-900">How It Works</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
        Rent a car in three simple steps.
      </p>
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((item) => (
          <li key={item.step} className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
              {item.step}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
