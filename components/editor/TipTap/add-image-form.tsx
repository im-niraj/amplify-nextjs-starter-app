import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    url: z
        .string({
            required_error: "Url is required",
            invalid_type_error: "Invalid URL",
        })
        .url(),
    title: z.string({
        required_error: "Title are required",
    }),
    alt: z.string({
        required_error: "Alt are required",
    }),
});
const AddImageForm = ({ close, addImage }: { close: any; addImage: any }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
            title: "",
            alt: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        close();
        addImage(values);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="Valid Image URL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Image Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="alt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alt Text</FormLabel>
                                <FormControl>
                                    <Input placeholder="Alt Text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default AddImageForm;
