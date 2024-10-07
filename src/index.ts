import Fastify from "fastify";
import { connectToDatabase } from "./config/database";
import { UserType } from "./models/users/user";
import { UserController } from "./controller/user-controller";
import { errorMiddleware } from "./middlewares/error-middleware";
import { ProjectType } from "./models/projects/project";
import { Document, Types } from "mongoose";
import { ProjectController } from "./controller/project-controller";

const fastify = Fastify();

fastify.setErrorHandler(errorMiddleware);

fastify.post("/api/v1/user", async (req, res) => {
  const { email, name, password, profilePicture, surname } =
    req.body as UserType;

  const userController = new UserController();

  const response = await userController.createNewUser({
    email,
    name,
    password,
    profilePicture,
    surname,
  });

  res.status(response.status).send({ message: response.message });
});

fastify.post("/api/v1/project", async (req, res) => {
  const { endDate, name, startDate, users, description, userId } =
    req.body as Omit<ProjectType, keyof Document | "createdAt" | "status"> & {
      userId: Types.ObjectId;
    };

  const projectController = new ProjectController();
  const { data, message, status } = await projectController.createNewProject({
    name,
    description,
    endDate,
    startDate,
    userId,
    users,
  });

  res.status(status).send({ message, data });
});

fastify.get("/api/v1/project/:projectId", async (req, res) => {
  const param = req.params as string;

  const projectController = new ProjectController();
  const { data, status } = await projectController.getSpecificProject(param);

  res.status(status).send({ data });
});

fastify.listen({ port: 3333 }, () => {
  connectToDatabase();

  console.log("Server running at port 3333");
});
