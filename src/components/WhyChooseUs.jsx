const features = [
  {
    title: "Wide Selection",
    description:
      "Choose from SUVs, sedans, hatchbacks, luxury cars, and more — all verified and ready to rent.",
  },
  {
    title: "Secure Booking",
    description:
      "JWT-protected accounts and encrypted sessions keep your data and bookings safe.",
  },
  {
    title: "Flexible Pickup",
    description:
      "Pick up your vehicle at convenient locations across the city with transparent pricing.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Why Choose DriveFleet?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          We make car rental simple, secure, and affordable for every journey.
        </p>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-cyan-700">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
