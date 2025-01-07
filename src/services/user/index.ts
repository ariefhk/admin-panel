import { ThrowApiError } from "@/utils/api-error";
import { LoginUserRequest, CreateUserRequest } from "./user.type";
import { prismaClient } from "@/utils/prismaClient";
import bcrypt from "bcrypt";
import { makeJwt } from "@/utils/jwt";
import { User } from "@prisma/client";

export const UserService = {
  async login(request: LoginUserRequest): Promise<User> {
    const { email, password } = request;

    if (!email || !password) {
      throw new ThrowApiError(400, "Email and password are required!");
    }

    const existedUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!existedUser) {
      throw new ThrowApiError(404, "Akun tidak ditemukan!");
    }

    const checkPassword = await bcrypt.compare(password, existedUser.password);

    if (!checkPassword) {
      throw new ThrowApiError(404, "Kesalahan email atau password");
    }

    const token = await makeJwt(
      {
        name: existedUser.name,
        email: existedUser.email,
      },
      "6h"
    );

    return prismaClient.user.update({
      where: {
        email: existedUser.email,
      },
      data: {
        token,
      },
    });
  },

  async create(request: CreateUserRequest): Promise<User> {
    const { name, email, password } = request;

    if (!email || !password || !name) {
      throw new ThrowApiError(400, "Name, Email and password are required!");
    }

    const existedUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) {
      throw new ThrowApiError(404, "User sudah ada!");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    return prismaClient.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });
  },

  async getAll(request?: string): Promise<User[]> {
    if (request) {
      return prismaClient.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: request,
              },
            },
            {
              email: {
                contains: request,
              },
            },
          ],
        },
      });
    }

    return prismaClient.user.findMany();
  },

  async getOne(id: number): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ThrowApiError(404, "User tidak ditemukan!");
    }

    return user;
  },

  async update(id: number, request: Partial<CreateUserRequest>): Promise<User> {
    const { name, email, password } = request;

    const existedUser = await this.getOne(id);

    return prismaClient.user.update({
      where: {
        id: existedUser.id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
    });
  },

  async delete(id: number): Promise<User> {
    const existedUser = await this.getOne(id);

    return prismaClient.user.delete({
      where: {
        id: existedUser.id,
      },
    });
  },
};
