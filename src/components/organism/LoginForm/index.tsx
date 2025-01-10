import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import useInput from "@/hooks/use-input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const initialLoginData = {
  email: "",
  password: "",
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { values, handleChange } = useInput(initialLoginData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const response = await signIn("login", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!response?.ok) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Success",
      description: "Berhasil login!",
    });
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden ">
        <CardContent className="grid p-0 md:grid-cols-2 h-[400px]">
          <div className="relative hidden bg-black/90 md:block"></div>
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">Login to your Acme Inc account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="very secret"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login {isSubmitting && <Loader className="animate-spin flex-shrink-0" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking login, you agree to our app.
      </div>
    </div>
  );
}
