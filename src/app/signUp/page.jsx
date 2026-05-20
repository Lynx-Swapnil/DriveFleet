"use client";

import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validators";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
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

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userdata = Object.fromEntries(formData.entries());

    const passwordError = validatePassword(userdata.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: userdata.name,
      email: userdata.email,
      password: userdata.password,
      image: userdata.imageUrl,
    });

    if (data) {
      toast.success("Registration successful! Please log in.");
      router.push("/signIn");
      return;
    }

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-12 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Registration</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Create your DriveFleet account</p>

      <Form className="mt-8 flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <TextField className="w-full" name="name" isRequired>
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <Description>Enter your full name</Description>
        </TextField>
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
        <TextField
          isRequired
          name="password"
          type="password"
          validate={(value) => validatePassword(value)}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            At least 6 characters with uppercase and lowercase letters
          </Description>
          <FieldError />
        </TextField>
        <TextField className="w-full" name="imageUrl">
          <Label>Photo URL</Label>
          <Input placeholder="Enter image URL" />
          <Description>Provide a link to your profile image</Description>
        </TextField>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" className="bg-cyan-500 text-white">
            <Check />
            Register
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
          <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
            <FcGoogle /> Sign up with Google
          </Button>
        </div>
      </Form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link href="/signIn" className="font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
          Login here
        </Link>
      </p>
    </main>
  );
}
