import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserByEmailRepository {
  execute(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  
}