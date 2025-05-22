import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Form validation schema
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  customSlug: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-Z0-9_-]+$/.test(val),
      {
        message: "Custom slug can only contain letters, numbers, hyphens, and underscores",
      }
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function ShortUrlForm() {
  const { toast } = useToast();
  const [, copy] = useCopyToClipboard();
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      customSlug: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest("POST", "/api/shorten", values);
      return res.json();
    },
    onSuccess: (data) => {
      setShortUrl(data.shortUrl);
      toast({
        title: "URL shortened successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error shortening URL",
        description: error instanceof Error ? error.message : "Failed to shorten URL",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  function handleCopyShortUrl() {
    if (shortUrl) {
      copy(shortUrl);
      toast({
        title: "Copied to clipboard",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter URL to shorten"
                    {...field}
                    disabled={mutation.isPending}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customSlug"
            render={({ field }) => (
              <FormItem>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    yourdomain.com/
                  </span>
                  <FormControl>
                    <Input
                      className="rounded-l-none"
                      placeholder="custom-slug (optional)"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Shortening..." : "Shorten URL"}
          </Button>
        </div>

        {shortUrl && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex justify-between items-center">
              <div className="truncate mr-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  {shortUrl}
                </a>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCopyShortUrl}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
