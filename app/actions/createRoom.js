"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
  // Get databases instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to create a room",
      };
    }

    // Extract and validate form values
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const sqft = formData.get("sqft")?.trim();
    const capacity = formData.get("capacity")?.trim();
    const location = formData.get("location")?.trim();
    const address = formData.get("address")?.trim();
    const availability = formData.get("availability")?.trim();
    const pricePerHour = formData.get("price_per_hour")?.trim();
    const amenities = formData.get("amenities")?.trim();

    const requiredFields = {
      name,
      description,
      sqft,
      capacity,
      location,
      address,
      availability,
      pricePerHour,
      amenities,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return { error: `Missing required field: ${key}` };
      }
    }

    // Uploading image
    let imageID;

    const image = formData.get("image");

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        // Upload
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
          ID.unique(),
          image
        );
        imageID = response.$id;
      } catch (error) {
        console.log("Error uploading image", error);
        return {
          error: "Error uploading image",
        };
      }
    } else {
      console.log("No image file provided or file is invalid");
    }

    // Create room
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name,
        description,
        sqft,
        capacity,
        location,
        address,
        availability,
        price_per_hour: pricePerHour,
        amenities,
        image: imageID,
      }
    );

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Create Room Error:", error);

    const errorMessage =
      error?.response?.message || "An unexpected error has occured";
    return {
      error: errorMessage,
    };
  }
}

export default createRoom;
