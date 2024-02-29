"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/services/user";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loginMutation] = useLoginMutation();
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await loginMutation(values)
        .unwrap()
        .then((res) => {
          if (res) {
            router.push("/");
          }
        });
    } catch (error) {
      console.error(error);
      toast({
        title: "Invalid credentials",
        description: "Make sure your email and password are correct",
      });
    }
  }

  function goToRegister() {
    router.push("/register");
  }

  function goToForgotPassword() {
    router.push("/forgot-password");
  }

  return (
    <main className="bg-gradient-to-b from-slate-400 min-h-svh to-emerald-300 flex justify-center items-center">
      <div className="w-80 lg:w-96 h-fit border border-slate-200 flex flex-col p-4 gap-2 shadow-xl rounded-xl bg-white ">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@email.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                  <FormDescription>
                    <Button
                      type="button"
                      variant="link"
                      onClick={goToForgotPassword}
                      className="p-0 text-sm text-slate-400"
                    >
                      Forgot your password ?
                    </Button>
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <Separator orientation="horizontal" />
        <Button variant="outline" onClick={goToRegister} className="w-full">
          Create an account
        </Button>
      </div>
    </main>
  );
}

export default LoginPage;
