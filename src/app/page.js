import AvailableCars from "@/components/AvailableCars";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

export default async function Home() {
  let cars = [];
  try {
    const res = await fetch(`${backendUrl}/cars`, { cache: "no-store" });
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
