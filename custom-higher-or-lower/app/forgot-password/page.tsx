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
import { useForgotPasswordMutation } from "@/redux/services/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await forgotPasswordMutation(values)
        .unwrap()
        .then((res) => {
          if (res) {
            toast({
              title: "Email sent",
              description:
                "Check your email for instructions to reset your password",
            });
            router.push("/login");
          }
        });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while trying to send the email",
      });
    }
  }

  return (
    <div className="bg-gradient-to-b from-slate-400 min-h-svh to-amber-300 flex justify-center items-center">
      <div className="w-96 h-fit border border-slate-200 p-4  shadow-xl rounded-xl bg-white ">
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
                  <FormDescription>
                    Enter your account email and we will send you a link to
                    reset your password
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Send email</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
