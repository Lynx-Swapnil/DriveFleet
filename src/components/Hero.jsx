import Link from "next/link";
import { Button } from "@heroui/react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          DriveFleet — Rent Your Dream Car
        </h1>
        <p className="mt-4 text-lg text-cyan-100 md:text-xl">
          Explore premium vehicles, book in minutes, and hit the road with
          confidence. SUVs, sedans, luxury cars, and more — all in one place.
        </p>
        <Link href="/explore-cars" className="mt-8 inline-block">
          <Button size="lg" className="bg-cyan-500 font-semibold text-white">
            Explore Cars
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
