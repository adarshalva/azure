// import mongoose, { Document, Schema } from "mongoose";

// export interface IFlight extends Document {
//   airline: string;
//   route: string;
//   scheduleDate: Date;
//   departureTime?: Date;
//   arrivalTime?: Date;
//   // Add other fields as needed (e.g., origin, destination, price)
// }

// const FlightSchema: Schema = new Schema({
//   airline: { type: String, required: true },
//   route: { type: String, required: false },
//   scheduleDate: { type: Date, required: true },
//   departureTime: { type: Date },
//   arrivalTime: { type: Date },
//   // Additional fields can be defined here
// });

// export default mongoose.model<IFlight>("Flight", FlightSchema);
