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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Clipboard, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useCreateCategoryMutation } from "@/redux/services/category";
import { UserItem } from "@/types/Category";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { LoginScreen } from "@/app/maker/_components/LoginScreen";

const MAX_INTEGER = 2147483640;
const JSON_EXAMPLE = `{
  "values": [
    {
      "name": "Phineas and Ferb",
      "value": 1,
    },
    {
      "name": "Hack Club",
      "value": 2,
    }
    ...
  ]
}`;

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  image: z.string().url(),
  metric: z.string().min(2).max(100),
  values: z.array(
    z.object({
      name: z.string().min(2).max(50),
      value: z.number().min(1).max(MAX_INTEGER),
    }),
  ),
});

const MINIMUM_NUMBER_OF_VALUES = 10;

export default function MakerPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      metric: "",
      image: "",
      values: [],
    },
  });
  const emptyValue = {
    name: "",
    value: 0,
  };
  const [values, setValues] = useState<UserItem[]>([]);
  const [JSONValues, setJSONValues] = useState<string>("{}");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { toast } = useToast();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    let finaleValues = values;

    if (values.length === 0) {
      try {
        const parsedValues = JSON.parse(JSONValues);
        if (parsedValues.values) {
          finaleValues = parsedValues.values;
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          toast({
            title: "Invalid JSON",
            description: "Make sure your JSON is valid",
          });
        }
      }
    }
    if (finaleValues.length < MINIMUM_NUMBER_OF_VALUES) {
      toast({
        title: "Not enough values",
        description: `You need at least ${MINIMUM_NUMBER_OF_VALUES} values`,
      });
      return;
    }
    createCategory({
      name: formValues.name,
      description: formValues.description,
      metric: formValues.metric,
      image: formValues.image,
      values: finaleValues,
    })
      .unwrap()
      .then((payload) => {
        toast({ title: "Category successfully created" });
        router.push(`/categories/${payload.slug}`);
      })
      .catch((error) => {
        console.log({ error });
        toast({ title: "Error", description: "Something wrong happened" });
      });
  }

  function handleImportJson() {
    try {
      const parsedValues = JSON.parse(JSONValues);
      if (parsedValues.values) {
        setValues(parsedValues.values);
        form.setValue("values", parsedValues.values);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        toast({
          title: "Invalid JSON",
          description: "Make sure your JSON is valid",
        });
      }
    }
  }

  useEffect(() => {
    let elem = document.getElementById("values-div");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [values]);

  useEffect(() => {
    if (isLoading) {
      toast({ title: "Creating category..." });
    }
  }, [isLoading, toast]);

  function copyPrompt() {
    navigator.clipboard.writeText(
      `Generate a list of 100 values for my category called:${form.getValues().name}, this will be used for a higher lower game, based on this metric: ${form.getValues().name}. Each value should have a name, a numerical value. The names should be between 2 and 20 characters long. This list must be generated in
      JSON format fllowing this structure:
      {
        "values": [
          {
            "name": "Phineas and Ferb",
            "value": 1,
          },
          {
            "name": "Hack Club",
            "value": 2,
          }
          ...
        ]
      }`,
    );
    toast({
      title: "Prompt copied",
      description: "You can now paste it in your favorite AI tool",
    });
  }

  if (!user.isLogged) {
    return <LoginScreen />;
  }

  return (
    <main className="px-20 py-16">
      <h1 className="text-6xl font-bold drop-shadow-blue">
        Create your own category
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 py-8"
        >
          <div className="flex gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metric"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Metric</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of goals" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the metric that will be used to compare the
                      values.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A very fun category" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the description of your category, make it
                      appealing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-96">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="https://giphy.com/gif" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the url of the gif that will be used to represent
                      your category. Make sure to use a giphy link or it
                      won&apos;t work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-fit text-lg" type="submit" size="lg">
                Create
              </Button>
            </div>
            <Separator orientation="vertical" className="h-96" />
            <div className="w-fit">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Add value</h2>
                <Button
                  size="icon"
                  type="button"
                  onClick={() => {
                    setValues([emptyValue, ...values]);
                  }}
                >
                  <Plus />
                </Button>
              </div>
              <div
                id="values-div"
                className="w-fit flex flex-col gap-2 items-center h-96 overflow-y-auto"
              >
                {values.map((val, index) => (
                  <div className="flex gap-4 items-end" key={index}>
                    <h3 className="text-2xl font-bold">{index + 1}</h3>
                    <FormField
                      control={form.control}
                      name={`values.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              defaultValue={val.name}
                              placeholder="Messi"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`values.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input
                              defaultValue={val.value}
                              className="w-20"
                              type="number"
                              placeholder="100"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => {
                        const updatedValues = [...values];
                        updatedValues.splice(index, 1);
                        setValues(updatedValues);
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator orientation="horizontal" />

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className=" text-xl font-bold">
                Import all values from a JSON
              </h3>
              <div className="border border-slate-300 rounded-xl p-4">
                <h3 className=" text-xl font-bold">Example:</h3>
                <pre className="text-sm text-slate-500">{JSON_EXAMPLE}</pre>
              </div>
            </div>
            <Textarea
              onChange={(e) => {
                setJSONValues(e.target.value);
              }}
              value={JSONValues}
              className="w-96"
              placeholder="Paste your json here"
            />
            <div className="flex flex-col justify-between">
              <div className="border h-fit flex flex-col gap-3 w-80 border-slate-300 rounded-xl p-4">
                <h3 className=" text-xl font-bold">Use AI:</h3>
                <p className="text-sm text-slate-500">
                  You can use AI to generate values for your category. Copy the
                  prompt below and use it with your favorite AI tool, to help
                  you create your perfect category.
                </p>
                <Button
                  size="icon"
                  className="self-end"
                  type="button"
                  onClick={copyPrompt}
                >
                  <Clipboard />
                </Button>
              </div>
              <Button type="button" onClick={handleImportJson}>
                Import Data
              </Button>
            </div>
          </div>

          <Separator orientation="horizontal" />
        </form>
      </Form>
    </main>
  );
}
