"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { Button, Fieldset, Form, Label, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ car }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a car.");
      router.push("/signIn");
      return;
    }

    if (car.availabilityStatus !== "Available") {
      toast.error("This car is not available for booking.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userId: user.id,
      userName: user.name,
      driverNeeded,
      specialNote,
      carId: car._id,
      carName: car.carName,
      carType: car.carType,
      seatCapacity: car.seatCapacity,
      pickupLocation: car.pickupLocation,
      imageUrl: car.imageUrl,
      dailyRentPrice: car.dailyRentPrice,
      description: car.description,
      availabilityStatus: car.availabilityStatus,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await apiFetch("/bookings", {
        method: "POST",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Car booked successfully!");
        router.push("/my-bookings");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Booking failed. Please try again.");
      }
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md dark:shadow-lg border border-slate-200 dark:border-slate-700 w-full transition-colors duration-300">
      <Form onSubmit={handleBooking}>
        <Fieldset>
          <Fieldset.Legend className="text-lg font-semibold text-slate-900 dark:text-white">Book This Car</Fieldset.Legend>

          <div className="mb-6 mt-4">
            <Label className="text-slate-900 dark:text-slate-100 font-medium">Driver Needed</Label>
            <div className="mt-3 flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="driver"
                  checked={!driverNeeded}
                  onChange={() => setDriverNeeded(false)}
                  className="w-4 h-4"
                />
                <span className="text-slate-700 dark:text-slate-300">No</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="driver"
                  checked={driverNeeded}
                  onChange={() => setDriverNeeded(true)}
                  className="w-4 h-4"
                />
                <span className="text-slate-700 dark:text-slate-300">Yes</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <Label className="text-slate-900 dark:text-slate-100 font-medium">Special Note</Label>
            <TextArea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Add any special instructions (optional)"
              className="mt-2 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            />
          </div>

          <Fieldset.Actions>
            <Button type="submit" isLoading={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-semibold py-2 transition-colors duration-300">
              Book Now
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default BookingCard;
