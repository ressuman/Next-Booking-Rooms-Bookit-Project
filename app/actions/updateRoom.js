"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function updateRoom(previousState, formData) {
  // Get databases instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to update a room",
      };
    }

    // Get room ID from form data
    const roomId = formData.get("roomId");

    if (!roomId) {
      return {
        error: "Room ID is required",
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

    // Check if room exists and belongs to user
    const existingRoom = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId
    );

    if (!existingRoom) {
      return { error: "Room not found" };
    }

    if (existingRoom.user_id !== user.id) {
      return { error: "You don't have permission to update this room" };
    }

    // Handle image upload if new image is provided
    let imageID = existingRoom.image; // Keep existing image by default

    const image = formData.get("image");

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        // Delete old image if it exists
        if (existingRoom.image) {
          try {
            await storage.deleteFile(
              process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
              existingRoom.image
            );
          } catch (error) {
            console.log("Error deleting old image:", error);
            // Continue even if old image deletion fails
          }
        }

        // Upload new image
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
    }

    // Update room
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomId,
      {
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
    revalidatePath("/rooms/my", "layout");
    revalidatePath(`/rooms/${roomId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update Room Error:", error);

    const errorMessage =
      error?.response?.message || "An unexpected error has occurred";
    return {
      error: errorMessage,
    };
  }
}

export default updateRoom;
