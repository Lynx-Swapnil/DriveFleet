"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCar, FaXmark } from "react-icons/fa6";
import { CarForm } from "./CarForm";

export function EditModal({ car }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const modalBodyRef = useRef(null);

    // Scroll to top when modal opens - MUST be before any conditional returns
    useEffect(() => {
        if (isOpen && modalBodyRef.current) {
            modalBodyRef.current.scrollTop = 0;
        }
    }, [isOpen]);

    if (!car) return null;
    const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl, dailyRentPrice, availabilityStatus, description } = car;

    const onSubmit = async (formData) => {
        setIsPending(true);
        const updates = {
            carName: formData.carName,
            carType: formData.carType,
            seatCapacity: parseInt(formData.seatCapacity),
            dailyRentPrice: parseFloat(formData.dailyRentPrice),
            pickupLocation: formData.pickupLocation,
            availabilityStatus: formData.availabilityStatus,
            imageUrl: formData.imageUrl,
            description: formData.description || "",
        };

        try {
            const res = await fetch(`/api/cars/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updates),
            });

            if (res.ok) {
                toast.success("Car updated successfully!");
                setIsOpen(false);
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || "Failed to update car.");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update car. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg px-4 py-2.5 transition-all duration-200"
            >
                Edit
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-2xl dark:shadow-2xl max-w-2xl w-full overflow-hidden">
                        {/* Header */}
                        <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                                    <FaCar className="text-lg text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Update Car Details
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Modify your car information
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            >
                                <FaXmark className="text-lg" />
                            </button>
                        </div>

                        {/* Body */}
                        <div ref={modalBodyRef} className="p-6 max-h-[80vh] overflow-y-auto">
                            <CarForm
                                onSubmit={onSubmit}
                                isLoading={isPending}
                                initialData={{
                                    carName,
                                    carType,
                                    seatCapacity: seatCapacity.toString(),
                                    dailyRentPrice: dailyRentPrice.toString(),
                                    pickupLocation,
                                    availabilityStatus,
                                    imageUrl,
                                    description: description || "",
                                }}
                                mode="edit"
                                showSidebar={false}
                                formClassName="space-y-6"
                                onCancel={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditModal;
