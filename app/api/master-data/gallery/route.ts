import { prismaDB } from "@/lib/connect";
import { roleValidate } from "@/lib/roleValidate";
import { Methods } from "@/types/method";
import { roleList } from "@/utils/master-data";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { format } from "date-fns";
import slugify from "slugify";
const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});

export const GET = async (req: Request) => {
  try {
    let gallery = await prismaDB.gallery.findMany({ where: { isDeleted: false } });
    return Response.json({ message: "success", data: gallery }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error", error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    let isLoggedIn = await roleValidate({ apiPath: "/api/master-data/gallery", method: Methods.POST });
    if (!isLoggedIn.status) {
      return Response.json({ message: "You don't have permission" });
    }

    let data = await req.formData();
    let title = data.get("title");
    let image = data.get("image");
    if (image instanceof Blob) {
      const stream = image.stream();
      const chunks = [];
      const reader = stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      let slug = slugify(title as string,{ remove: /[*+~.()'"!:,@]/g, lower: true });
      let imageName = slug + "." + image.name.split(".")[1];
      let imagePath = format(new Date(), "yyyy-MM");
      let imageObj = await prismaDB.gallery.findUnique({ where: { imageTitle: imageName } });
      if (imageObj) {
        return Response.json({ message: "Image already exists with this name" }, { status: 400 });
      }
      const buffer = Buffer.concat(chunks);
      const params: PutObjectCommandInput = {
        Bucket: process.env.BUCKET as string,
        Key: imagePath + "/" + imageName,
        Body: buffer,
        ContentType: image.type,
      };
      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        await prismaDB.gallery.create({
          data: {
            imageTitle: imageName,
            imagePath: imagePath,
            createdById: isLoggedIn.loggedInUserId || "",
          },
        });
      }
      return Response.json({ message: "File uploaded successfully", data: "response" }, { status: 200 });
    }
    return Response.json({ message: "Image not uploaded" }, { status: 400 });
  } catch (error) {
    return Response.json({ message: "Server error", error }, { status: 500 });
  }
};
