"use client";
import { Button } from "@/components/ui/button";
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
import { useNewPasswordMutation } from "@/redux/services/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  token: z.string(),
});

function NewPasswordPage() {
  const [newPasswordMutation] = useNewPasswordMutation();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      token: token ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await newPasswordMutation(values)
        .unwrap()
        .then((res) => {
          if (res) {
            toast({
              title: "New password set",
              description: "You can now login with your new password",
            });
            router.push("/login");
          }
        });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while trying to set the new password",
      });
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-200 min-h-svh to-rose-300 flex justify-center items-center">
      <div className="w-80 lg:w-96 h-fit border border-slate-200 p-4  shadow-xl rounded-xl bg-white ">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Set new password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewPasswordPage;
