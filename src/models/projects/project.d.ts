import { Document, Types } from "mongoose";

export interface ProjectType extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  users: ProjectUserRole[];
  status: "To start" | "In progres" | "Done" | "Canceled" | "Overdue";
  createdAt: Date;
}

export interface ProjectUserRole {
  userId: Types.ObjectId;
  role: "admin" | "member";
}
