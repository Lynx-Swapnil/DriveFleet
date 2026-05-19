"use client";

import {AlertDialog, Button} from "@heroui/react";

export  function BookingCancelAlert({ booking }) {

    const handleCancelBooking = async () => {

    const res = await fetch(`http://localhost:5000/bookings/${booking._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }, 
    });
    const data = await res.json();
}


  return (
    <AlertDialog>
     <Button variant="outline" className="mt-4">Cancel Booking</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{booking.carName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleCancelBooking}>
                Delete Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}