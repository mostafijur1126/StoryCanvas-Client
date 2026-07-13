const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getEvent = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/events/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
