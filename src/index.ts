import Fastify from "fastify";
import { connectToDatabase } from "./config/database";

const fastify = Fastify();

fastify.listen({ port: 3333 }, () => {
  connectToDatabase();

  console.log("Server running at port 3333");
});
