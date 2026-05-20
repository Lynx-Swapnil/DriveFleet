"use client";

import { authClient } from "@/lib/auth-client";
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
    <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 py-12 transition-colors duration-300">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Sign in to access your DriveFleet account
          </p>
        </div>

        <Form className="space-y-6" onSubmit={onSubmit}>
          {/* Email Field */}
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
            className="w-full"
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="rounded-lg"
              classNames={{
                input: "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
              }}
            />
            <FieldError />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Password</Label>
            <Input
              placeholder="Enter your password"
              className="rounded-lg"
              classNames={{
                input: "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500",
              }}
            />
            <FieldError />
          </TextField>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700"
            >
              Sign In
            </Button>

            {/* <Button
              type="reset"
              className="w-full rounded-lg border-2 border-slate-300 bg-white py-3 text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              Clear
            </Button> */}

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full gap-3 rounded-lg border-2 border-slate-300 bg-white py-3 text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">New to DriveFleet?</span>
          <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-base text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signUp"
            className="font-semibold text-cyan-600 transition-colors duration-300 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Create one now
          </Link>
        </p>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </main>
  );
}
