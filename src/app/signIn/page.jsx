"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userdata = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userdata.email,
      password: userdata.password,
    });

    if (data) {
      toast.success("Logged in successfully!");
      router.push("/");
      router.refresh();
      return;
    }

    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Login</h1>
      <p className="mt-2 text-slate-600">Sign in to your DriveFleet account</p>

      <Form className="mt-8 flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField isRequired name="password" type="password">
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" className="bg-cyan-500 text-white">
            <Check />
            Login
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
          <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
            <FcGoogle /> Login with Google
          </Button>
        </div>
      </Form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/signUp" className="font-medium text-cyan-600 hover:underline">
          Register here
        </Link>
      </p>
    </main>
  );
}
