import mongoose, { Schema, model, models, Model } from "mongoose";

// Define the parking method type
export type PaymentMethod = "easypaisa" | "debit_card";

export interface IParking {
  slot: string;
  duration: number;
  date: Date;
  amount: number;
  method: PaymentMethod;
  userId: mongoose.Types.ObjectId;  // Reference to the user who booked the parking spot
  paymentId?: mongoose.Types.ObjectId; // Reference to the payment made for this booking
  createdAt?: Date;
  updatedAt?: Date;
}

const ParkingSchema = new Schema<IParking>(
  {
    slot: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["easypaisa", "debit_card"], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: false },
  },
  { timestamps: true }
);

const Parking: Model<IParking> = models.Parking || model<IParking>("Parking", ParkingSchema);

export { Parking };
