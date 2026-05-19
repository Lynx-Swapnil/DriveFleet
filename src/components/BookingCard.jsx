"use client";
import React, { useState } from "react";
import { Button, Fieldset, Form, Label, TextArea } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BookingCard = ({ car }) => {

    const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl, dailyRentPrice, description, availabilityStatus } = car;

    const { data: session } = authClient.useSession();

    const user = session?.user;
    const [driverNeeded, setDriverNeeded] = useState(false);
    const [specialNote, setSpecialNote] = useState("");

    const handleBooking =  async (e) => {
        e.preventDefault();
        const bookingData = {
            userId: user?.id,
            userName: user?.name,
            driverNeeded,
            specialNote,
            carId: car?._id,
            carName: car?.carName,
            carType: car?.carType,
            seatCapacity: car?.seatCapacity,
            pickupLocation: car?.pickupLocation,
            imageUrl: car?.imageUrl,
            dailyRentPrice: car?.dailyRentPrice,
            description: car?.description,
            availabilityStatus: car?.availabilityStatus,
        };
        console.log("Booking Data:", bookingData);

        const res = await fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });
        const data = await res.json();

        toast.success("Car booked successfully!");

    };

    return (
        <div className="p-4 bg-white rounded-md shadow-sm w-full max-w-md">
            <Form onSubmit={handleBooking}>
                <Fieldset>
                    <Fieldset.Legend>Book This Car</Fieldset.Legend>

                    <div className="mb-4">
                        <Label>Driver Needed</Label>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="driver"
                                    checked={!driverNeeded}
                                    onChange={() => setDriverNeeded(false)}
                                />
                                <span>No</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="driver"
                                    checked={driverNeeded}
                                    onChange={() => setDriverNeeded(true)}
                                />
                                <span>Yes</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label>Special Note</Label>
                        <TextArea
                            value={specialNote}
                            onChange={(e) => setSpecialNote(e.target.value)}
                            placeholder="Add any special instructions (optional)"
                        />
                    </div>

                    <Fieldset.Actions>
                        <Button type="submit">Book Now</Button>
                    </Fieldset.Actions>
                </Fieldset>
            </Form>
        </div>
    );
}
export default BookingCard;