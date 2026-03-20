import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "peer_reviews_submissions" }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(buffer);
    });

    return NextResponse.json(
      { message: "Image uploaded successfully", url: uploadResult.secure_url },
      { status: 200 }
    );

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}