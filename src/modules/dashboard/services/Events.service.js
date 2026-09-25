import Event from "../../../models/upcomingEvents.js";

const eventsService = async () => {
  const events = await Event.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .select("eventName lastDate -_id");

  return events;
};

export default  eventsService ;
