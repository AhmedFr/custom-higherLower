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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Clipboard, Plus, Trash } from "lucide-react";
import { useEffect } from "react";

const ImageProviderEnum = z.enum(["unsplash", "giphy"]);

type Value = {
  name: string;
  value: number;
  image_url?: string;
};

const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(100),
  cover_image: z.string().url(),
  values: z.array(
    z.object({
      name: z.string().min(2).max(50),
      value: z.number().min(1).max(16),
      image_url: z.string().url().optional(),
    }),
  ),
  default_image_provider: ImageProviderEnum,
});

export default function MakerPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      cover_image: "",
      values: [],
      default_image_provider: "unsplash",
    },
  });

  const emptyValue = {
    name: "",
    value: 0,
    image_url: "",
  };
  const [values, setValues] = useState<Value[]>([emptyValue]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    let elem = document.getElementById("values-div");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [values]);

  function copyPrompt() {
    navigator.clipboard.writeText(
      "Generate a list of 100 values for my category called:{name}, this will be used for a higher lower game, based on this metric: {}. Each value should have a name, a numerical value and an image url. The names should be between 2 and 20 characters long. The image urls should be valid urls using either unsplash or giphy.",
    );
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-96">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="cover_image"
              render={({ field }) => (
                <FormItem className="w-96">
                  <FormLabel>Cover image</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="default_image_provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default image provider</FormLabel>
                  <FormControl className="justify-start">
                    <ToggleGroup type="single" defaultValue="unsplash">
                      <ToggleGroupItem value="unsplash">
                        Unsplash
                      </ToggleGroupItem>
                      <ToggleGroupItem value="giphy">Giphy</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator orientation="horizontal" />

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className=" text-xl font-bold">
                Add a Json file containing all the values:
                <br />
                Or add the values manually below
              </h3>
              <div className="border border-slate-300 rounded-xl p-4">
                <h3 className=" text-xl font-bold">Example:</h3>
                <pre className="text-sm text-slate-500">
                  {`{
  "values": [
    {
      "name": "Phineas and Ferb",
      "value": 1,
      "image_url": "image_url"
    },
    {
      "name": "Hack Club",
      "value": 2,
      "image_url": "image_url"
    }
    ...
  ]
}`}
                </pre>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Input className="w-fit" type="file" placeholder="shadcn" />
              <div className="border flex flex-col gap-3 w-80 border-slate-300 rounded-xl p-4">
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
            </div>
          </div>

          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-4">
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
            <div id="values-div" className="w-fit pr-10 h-96 overflow-y-auto">
              {values.map((_, index) => (
                <div className="flex gap-4 items-center" key={index}>
                  <h3 className="text-2xl w-8 font-bold">{index + 1}</h3>
                  <FormField
                    control={form.control}
                    name={`values.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                            type="number"
                            placeholder="shadcn"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`values.${index}.image_url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
          <Button
            className="fixed px-16 py-8 text-lg bottom-32 right-32"
            type="submit"
            size="lg"
          >
            Create
          </Button>
        </form>
      </Form>
    </main>
  );
}
