"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import toast from "react-hot-toast";
import { CopyIcon, ImageUpIcon } from "lucide-react";
import { Icons } from "@/utils/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import ReactCopy from "react-copy-to-clipboard";

type Props = {};

const Gallery = (props: Props) => {
  const { data, isLoading, mutate } = useSWR("/api/master-data/gallery", fetcher);
  const images = data?.data;
  const [copyBtnFlag, setCopyBtnFlag] = useState<{ index: number | null; flag: boolean }>({ index: null, flag: false });
  const [uploadModelOpen, setUploadModelOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageData, setImageData] = useState<{ title: string; image: File | null }>({
    title: "",
    image: null,
  });

  const uploadHandle = async () => {
    if (imageData.title !== "" && imageData.image !== null) {
      let formData = new FormData();
      formData.append("title", imageData.title);
      if (imageData.image) formData.append("image", imageData.image);
      let res = await fetch("/api/master-data/gallery", {
        method: "POST",
        body: formData,
      });
      let response = await res.json();
      if (res.ok) {
        toast.success(response.message);
        mutate();
        setUploadModelOpen(false);
        setImageData({ title: "", image: null });
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error("All fields are required");
    }
  };
  const handleCopy = (index: number) => {
    setCopyBtnFlag({ index: index, flag: true });
    setTimeout(() => {
      setCopyBtnFlag({ index: null, flag: false });
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>Gallery</div>
        <Button size={"sm"} className="px-2" onClick={() => setUploadModelOpen(true)}>
          <Icons.upload className="mr-2 h-4" /> Upload Image
        </Button>
      </div>
      {isLoading ? (
        <div className="mt-5">
          <Icons.loading className="h-9 w-9 animate-spin" />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-6 gap-2">
          {images.map((el: any, index: number) => (
            <div key={el.id} className="h-[200px] relative inline-flex justify-center items-center border rounded-sm overflow-hidden">
              <Image src={`${process.env.imageUrl}/${el.imagePath}/${el.imageTitle}`} sizes="100vw" height={0} width={0} className="h-fit w-fit rounded-sm object-contain" alt="hindinews9" />
              <ReactCopy text={`${process.env.imageUrl}/${el.imagePath}/${el.imageTitle}`} onCopy={() => handleCopy(index)}>
                <Button variant={"ghost"} size={"icon"} className="absolute bottom-0 right-0">
                  {!(copyBtnFlag.flag && copyBtnFlag.index === index) ? (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 start-2">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 start-2">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </>
                  )}
                </Button>
              </ReactCopy>
            </div>
          ))}
        </div>
      )}
      <Dialog
        open={uploadModelOpen}
        onOpenChange={(flag) => {
          setUploadModelOpen(flag);
          setImageData({
            title: "",
            image: null,
          });
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image/File</DialogTitle>
          </DialogHeader>
          <Label htmlFor="imageFile">
            <div className="h-[230px] border border-dashed w-full flex flex-col justify-center items-center text-slate-400">
              {imageData.image ? (
                <Image src={URL.createObjectURL(imageData.image)} sizes="100vw" height={0} width={0} className="h-full w-fit" alt="hindinews9" />
              ) : (
                <>
                  <ImageUpIcon className="h-20 w-20 stroke-1" />
                  <p className="mt-2">
                    Drag and drop or <span className="underline">browse</span>
                  </p>
                </>
              )}
            </div>
          </Label>
          <Input
            id="imageFile"
            type="file"
            className="hidden"
            onChange={(e) =>
              setImageData((old) => {
                return { ...old, image: e.target.files ? e.target.files[0] : null };
              })
            }
          />
          <Input
            placeholder="Image Name"
            className="mt-0"
            onChange={(e) =>
              setImageData((old) => {
                return { ...old, title: e.target.value };
              })
            }
          />
          <DialogFooter>
            <Button onClick={uploadHandle} disabled={uploadLoading}>
              {uploadLoading && <Icons.loading className="mr-2" />}
              {uploadLoading ? "Please wait..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
