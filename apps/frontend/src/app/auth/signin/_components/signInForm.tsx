"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInForm = () => {
  return (
    <form className="flex flex-col gap-2">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          type="email"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
