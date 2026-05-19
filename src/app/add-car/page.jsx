'use client';
import { authClient } from '@/lib/auth-client';
import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button } from '@heroui/react';
import React from 'react';

const page = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const car = Object.fromEntries(formData.entries());

        console.log(car);

        const { data: tokenData } = await authClient.token();
               console.log("Token Data:", tokenData);
       
        const res= await fetch('http://localhost:5000/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(car),
        })
        const data = await res.json();
        console.log(data);
    }

    const isPending = false;

    return (
        <div>
            <style>{`
              input[type="number"]::-webkit-outer-spin-button,
              input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            `}</style>
            <form
            onSubmit={onSubmit}
                className="p-10 space-y-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Car Name */}
                    <div className="md:col-span-2">
                        <TextField name="carName" isRequired>
                            <Label>Car Name</Label>
                            <Input placeholder="Toyota RAV4" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Daily Rent Price */}
                    <TextField name="dailyRentPrice" type="number" isRequired>
                        <Label>Daily Rent Price</Label>
                        <Input
                            type="number"
                            placeholder="79"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Car Type */}
                    <div>
                        <Select
                            name="carType"
                            isRequired
                            className="w-full"
                            placeholder="Select car type"
                        >
                            <Label>Car Type</Label>
                            <Select.Trigger className="rounded-2xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="SUV" textValue="SUV">
                                        SUV
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Sedan" textValue="Sedan">
                                        Sedan
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Hatchback" textValue="Hatchback">
                                        Hatchback
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Luxury" textValue="Luxury">
                                        Luxury
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Compact" textValue="Compact">
                                        Compact
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Van" textValue="Van">
                                        Van
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Seat Capacity */}
                    <TextField name="seatCapacity" type="number" isRequired>
                        <Label>Seat Capacity</Label>
                        <Input
                            type="number"
                            placeholder="5"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Pickup Location */}
                    <TextField name="pickupLocation" isRequired>
                        <Label>Pickup Location</Label>
                        <Input
                            placeholder="Dhaka, Gulshan"
                            className="rounded-2xl"
                        />
                        <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <TextField name="imageUrl" isRequired>
                            <Label>Image URL</Label>
                            <Input
                                type="url"
                                placeholder="https://i.ibb.co/example-car.jpg"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Description</Label>
                            <TextArea
                                placeholder="Describe the car details, condition, and features..."
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Availability Status */}
                    <div className="md:col-span-2">
                        <Select
                            name="availabilityStatus"
                            isRequired
                            className="w-full"
                            placeholder="Select availability status"
                        >
                            <Label>Availability Status</Label>
                            <Select.Trigger className="rounded-2xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="Available" textValue="Available">
                                        Available
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Booked" textValue="Booked">
                                        Booked
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Maintenance" textValue="Maintenance">
                                        Maintenance
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>

                {/* Buttons */}

                <Button
                    type="submit"
                    variant="outline"
                    isLoading={isPending}
                    className=" rounded-none w-full bg-cyan-500 text-white"
                >
                    {isPending ? "Adding Car..." : "Add Car"}
                </Button>
            </form>
        </div>
    );
};

export default page;