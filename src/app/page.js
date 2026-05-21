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
  return (
    <>
      <Hero />
      <AvailableCars cars={cars} />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
