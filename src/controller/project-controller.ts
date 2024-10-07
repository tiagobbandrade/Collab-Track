import { Document, Types } from "mongoose";
import { ProjectType, ProjectUserRole } from "../models/projects/project";
import { Project } from "../models/projects/projects";
import { isAfter, isBefore, isEqual, startOfDay } from "date-fns";

interface CreateNewUserProps
  extends Omit<ProjectType, keyof Document | "createdAt" | "status"> {
  userId: Types.ObjectId;
}

export class ProjectController {
  private projectModel = new Project();

  async createNewProject({
    name,
    description = "",
    startDate,
    endDate,
    users = [],
    userId,
  }: CreateNewUserProps) {
    if (!name) throw new Error("Project name is required!");

    if (isBefore(startOfDay(startDate), new Date()))
      throw new Error("Start date must be after atual date");

    if (isAfter(startOfDay(startDate), startOfDay(endDate)))
      throw new Error("Start date must be before end date");

    if (isEqual(startOfDay(startDate), startOfDay(endDate)))
      throw new Error("Start date and end date must be different");

    const adminUser: ProjectUserRole = { userId, role: "admin" };
    const usersToAdd: ProjectUserRole[] = [adminUser, ...users];

    const project = await this.projectModel.create({
      name,
      endDate,
      startDate,
      users: usersToAdd,
      description,
    });

    return {
      status: 201,
      message: "Project created successfully",
      data: project,
    };
  }

  async getSpecificProject(projectId: string) {
    const project = await this.projectModel.findById(projectId);

    if (!project) throw new Error("Project not founded");

    return {
      status: 201,
      data: project,
    };
  }
}
