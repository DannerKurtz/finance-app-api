import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteUserRepository {
  async execute(id) {
    return prisma.user.delete({
      where: { id },
    });
  }
  
}