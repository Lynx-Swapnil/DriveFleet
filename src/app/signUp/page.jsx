"use client";

import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validators";
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
      // Sign out immediately after registration to ensure user is not logged in
      await authClient.signOut();
      
      toast.success("Registration successful! Please log in with your credentials.");
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
    <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 py-12 transition-colors duration-300">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Join DriveFleet</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Create your account to start renting cars today
          </p>
        </div>

        <Form className="space-y-6" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField className="w-full" name="name" isRequired>
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Full Name</Label>
            <Input
              placeholder="John Doe"
              className="rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <Description className="text-xs text-slate-500 dark:text-slate-400">
              Enter your full name as it appears on your documents
            </Description>
          </TextField>

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
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <FieldError />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => validatePassword(value)}
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Password</Label>
            <Input
              placeholder="Enter your password"
              className="rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <Description className="text-xs text-slate-500 dark:text-slate-400">
              Minimum 6 characters with uppercase and lowercase letters
            </Description>
            <FieldError />
          </TextField>

          {/* Photo URL Field */}
          <TextField className="w-full" name="imageUrl">
            <Label className="font-semibold text-slate-700 dark:text-slate-200">Profile Photo URL</Label>
            <Input
              placeholder="https://example.com/photo.jpg"
              className="rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <Description className="text-xs text-slate-500 dark:text-slate-400">
              Optional: Provide a link to your profile image
            </Description>
          </TextField>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700"
            >
              Create Account
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
              Sign up with Google
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Already registered?</span>
          <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-base text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="font-semibold text-cyan-600 transition-colors duration-300 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </main>
  );
}
