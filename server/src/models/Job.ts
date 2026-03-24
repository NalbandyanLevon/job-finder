import { model, Schema, Types } from "mongoose";

export interface IJob {
  title: string;
  company: string;
  description?: string;
  status: "applied" | "interview" | "offer" | "rejected";
  location?: string;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
    location: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Job = model<IJob>("Job", jobSchema);
