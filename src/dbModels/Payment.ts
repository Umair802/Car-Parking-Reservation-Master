import mongoose, { Schema, model, models, Model } from "mongoose";

export interface IPayment {
  method: "easypaisa" | "debit_card";
  amount: number;
  details: {
    number?: string; // For easypaisa
    cardNumber?: string; // For debit card
    expiry?: string; // For debit card
    cvv?: string; // For debit card
  };
  createdAt?: Date;
  updatedAt?: Date;
  parkingId: mongoose.Schema.Types.ObjectId;  // Reference to the Parking record
  userId: mongoose.Schema.Types.ObjectId;     // Reference to the User who made the payment
}

const PaymentSchema = new Schema<IPayment>(
  {
    method: { type: String, enum: ["easypaisa", "debit_card"], required: true },
    amount: { type: Number, required: true },
    details: {
      number: { type: String },   // For easypaisa payment method
      cardNumber: { type: String }, // For debit card payment method
      expiry: { type: String },     // For debit card payment method
      cvv: { type: String },        // For debit card payment method
    },
    parkingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> = models.Payment || model<IPayment>("Payment", PaymentSchema);

export { Payment };
