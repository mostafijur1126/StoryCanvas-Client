import { getEvent } from "@/lib/api/getEvent";
import React from "react";

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const event = await getEvent(id);
  const data = event.data;
  console.log(data);

  return (
    <div>
      <h1>Event Details</h1>
      <p>Event ID: {data._id}</p>
      <p>{data.title}</p>
      <p>{data.description}</p>
    </div>
  );
};

export default EventDetailsPage;
