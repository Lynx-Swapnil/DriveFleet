"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteAlert({ car, redirectTo = "/explore-cars" }) {
  const { _id, carName } = car;
  const router = useRouter();

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await apiFetch(`/cars/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    if (res.ok) {
      toast.success("Car deleted successfully.");
      router.push(redirectTo);
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.message || "Failed to delete car.");
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger" className="mb-4">
        Delete
      </Button>
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
                This will permanently delete <strong>{carName}</strong>. This
                action cannot be undone.
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
