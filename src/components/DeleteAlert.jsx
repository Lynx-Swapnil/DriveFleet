"use client";

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteAlert({ car }) {
  const { _id, carName, carType, seatCapacity, pickupLocation, imageUrl, dailyRentPrice, description, availabilityStatus } = car;

  const handleDelete = async () => {

     const { data: tokenData } = await authClient.token();
            console.log("Token Data:", tokenData);
    
    const res = await fetch(`http://localhost:5000/cars/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
    });
    const data = await res.json();
    redirect("/explore-cars");
    console.log(data);
  };

  return (
    <AlertDialog>
     <Button variant="danger" className="mb-4">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete {carName} permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{carName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete {carName}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}