"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, FieldError, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea } from "@heroui/react";

export function EditModal({ car }) {
    if (!car) return null;
    const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl, dailyRentPrice, description, availabilityStatus } = car;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const car = Object.fromEntries(formData.entries());

        console.log(car);

        const res= await fetch(`http://localhost:5000/cars/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        })

        const data = await res.json();
        console.log(data);
    }

    const isPending = false;

    return (
        <Modal>
            <Modal.Trigger>
                <Button variant="outline" className="mb-4">Edit</Button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Car</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we will get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
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
                                            <TextField name="carName" isRequired defaultValue={carName}>
                                                <Label>Car Name</Label>
                                                <Input placeholder="Toyota RAV4" className="rounded-2xl" defaultValue={carName} />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Daily Rent Price */}
                                        <TextField name="dailyRentPrice" type="number" isRequired defaultValue={dailyRentPrice}>
                                            <Label>Daily Rent Price</Label>
                                            <Input
                                                type="number"
                                                placeholder="79"
                                                className="rounded-2xl"
                                                defaultValue={dailyRentPrice}
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
                                                defaultValue={carType}
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
                                        <TextField name="seatCapacity" type="number" isRequired defaultValue={seatCapacity}>
                                            <Label>Seat Capacity</Label>
                                            <Input
                                                type="number"
                                                placeholder="5"
                                                className="rounded-2xl"
                                                defaultValue={seatCapacity}
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Pickup Location */}
                                        <TextField name="pickupLocation" isRequired defaultValue={pickupLocation}>
                                            <Label>Pickup Location</Label>
                                            <Input
                                                placeholder="Dhaka, Gulshan"
                                                className="rounded-2xl"
                                                defaultValue={pickupLocation}
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://i.ibb.co/example-car.jpg"
                                                    className="rounded-2xl"
                                                    defaultValue={imageUrl}
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField name="description" isRequired defaultValue={description}>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the car details, condition, and features..."
                                                    className="rounded-3xl"
                                                    defaultValue={description}
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
                                                defaultValue={availabilityStatus}
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
                                        {isPending ? "Updating Car..." : "Update Car"}
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}