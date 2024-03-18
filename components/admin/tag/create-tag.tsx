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

const CreateTag = (props: Props) => {
    const [tagValue, setTagValue] = useState({ label: "", href: "", isActive: false });
    const [submitLoading, setSubmitLoading] = useState(false);
    const submitHandle = async () => {
        if (tagValue.href && tagValue.label) {
            setSubmitLoading(true);
            let res = await fetch("/api/master-data/tag", {
                method: "POST",
                body: JSON.stringify(tagValue),
            });
            let response = await res.json();
            if (res.ok) {
                toast.success(response.message);
                setTagValue({ label: "", href: "", isActive: false });
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
                <Label htmlFor="label">Tag Title</Label>
                <Input
                    id="label"
                    placeholder="Tag Title"
                    value={tagValue.label}
                    onChange={(e) =>
                        setTagValue((old) => {
                            return { ...old, label: e.target.value };
                        })
                    }
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">
                    Tag slug <span className="text-blue-400">[unique]</span>
                </Label>
                <Input
                    id="title"
                    placeholder="Tag slug"
                    value={tagValue.href}
                    onChange={(e) =>
                        setTagValue((old) => {
                            return { ...old, href: e.target.value };
                        })
                    }
                />
            </div>
            <div className="grid items-center gap-1.5">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="airplane-mode"
                        checked={tagValue.isActive}
                        onCheckedChange={(flag) =>
                            setTagValue((old) => {
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

export default CreateTag;
