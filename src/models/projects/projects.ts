import { Document, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ProjectType } from "./project";

const projectSchema = new Schema<ProjectType>({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 24,
  },
  description: {
    type: String,
    maxlength: 120,
  },
  users: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
      },
      _id: false,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["To start", "In progres", "Done", "Canceled", "Overdue"],
    default: "To start",
  },
  createdAt: {
    type: Date,
    deafult: Date.now,
  },
});

export class Project {
  private model;

  constructor() {
    this.model = model("projects", projectSchema);
  }

  async create({
    name,
    endDate,
    startDate,
    users,
    description = "",
  }: Omit<ProjectType, keyof Document | "status" | "createdAt">) {
    return await this.model.create({
      name,
      endDate,
      startDate,
      users,
      description,
    });
  }

  async findById(_id: string) {
    return await this.model.findOne({ _id });
  }

  async getInformations(_id: string) {
    return await this.model
      .findById({ _id })
      .populate("users.userId", "-passowrd -hasConfirmedAccount -_id");
  }
}
