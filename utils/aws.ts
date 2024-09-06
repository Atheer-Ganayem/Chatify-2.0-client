"use server";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3({
  region: "eu-central-1",
});

export async function uploadFile(file: File): Promise<string> {
  try {
    const bufferedImage = await file.arrayBuffer();
    const filename = "avatar-" + uuidv4() + "." + file.name.split(".").pop();

    await s3.putObject({
      Bucket: "atheer-web-projects",
      Key: `chatify-2.0/${filename}`,
      Body: Buffer.from(bufferedImage),
      ContentType: file.type,
    });

    return filename;
  } catch (error) {
    throw error;
  }
}

export async function deleteFile(filename: string) {
  s3.deleteObject({
    Bucket: "atheer-web-projects",
    Key: `chatify-2.0/${filename}`,
  });
}
