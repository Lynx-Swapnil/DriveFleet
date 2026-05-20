"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function BookingCancelAlert({ booking }) {
  const router = useRouter();

  const handleCancelBooking = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await apiFetch(`/bookings/${booking._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    if (res.ok) {
      toast.success("Booking cancelled.");
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.message || "Failed to cancel booking.");
    }
  };

  return (
    <AlertDialog>
      <Button variant="outline" className="mt-4">
        Cancel Booking
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will cancel your booking for <strong>{booking.carName}</strong>.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep Booking
              </Button>
              <Button slot="close" variant="danger" onClick={handleCancelBooking}>
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
