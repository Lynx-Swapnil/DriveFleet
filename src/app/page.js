import AvailableCars from "@/components/AvailableCars";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import { apiFetch } from "@/lib/api";

export default async function Home() {
  let cars = [];
  try {
    const res = await apiFetch("/cars");
    if (res.ok) {
      cars = await res.json();
    }
  } catch {
    cars = [];
  }

  const featuredRes = await apiFetch("/featured");
  let featuredCars = [];
  if (featuredRes.ok) {
    featuredCars = await featuredRes.json();
  }


  return (
    <>
      <Hero />
      <AvailableCars cars={featuredCars} />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
