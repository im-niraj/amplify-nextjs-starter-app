"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/utils/icons";
import React, { useState } from "react";
import toast from "react-hot-toast";
type Props = {
    mutate?: () => void;
};

const CreateCategory = (props: Props) => {
    const [categoryValue, setCategoryValue] = useState({ label: "", href: "", isActive: false });
    const [submitLoading, setSubmitLoading] = useState(false);
    const submitHandle = async () => {
        if (categoryValue.href && categoryValue.label) {
            setSubmitLoading(true);
            let res = await fetch("/api/master-data/category", {
                method: "POST",
                body: JSON.stringify(categoryValue),
            });
            let response = await res.json();
            if (res.ok) {
                toast.success(response.message);
                setCategoryValue({ label: "", href: "", isActive: false });
                if (props.mutate) props.mutate();
            } else {
                toast.error(response.message);
            }
            setSubmitLoading(false);
        } else {
            toast.error("All fields required");
        }
    };
    return (
        <div className="flex gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="label">Category Title</Label>
                <Input
                    id="label"
                    placeholder="Category Title"
                    value={categoryValue.label}
                    onChange={(e) =>
                        setCategoryValue((old) => {
                            return { ...old, label: e.target.value };
                        })
                    }
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">
                    Category slug <span className="text-blue-400">[unique]</span>
                </Label>
                <Input
                    id="title"
                    placeholder="Category slug"
                    value={categoryValue.href}
                    onChange={(e) =>
                        setCategoryValue((old) => {
                            return { ...old, href: e.target.value };
                        })
                    }
                />
            </div>
            <div className="grid items-center gap-1.5">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="airplane-mode"
                        checked={categoryValue.isActive}
                        onCheckedChange={(flag) =>
                            setCategoryValue((old) => {
                                return { ...old, isActive: flag };
                            })
                        }
                    />
                    <Label htmlFor="airplane-mode">Active</Label>
                </div>
            </div>
            <div className="inline-flex items-end">
                <Button disabled={submitLoading} onClick={submitHandle} className="bg-green-500 hover:bg-green-600">
                    {submitLoading ? (
                        <>
                            <Icons.loading className="h-5 w-5 animate-spin text-current mr-2" /> <span>Please wait.</span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CreateCategory;
