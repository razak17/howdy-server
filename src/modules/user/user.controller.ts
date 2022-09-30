import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../utils/omit";
import { getUserById } from "./user.service";

export async function getUserHandler(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found.");
    }
    const rest = omit(user.toJSON(), ["password"]);
    return res.status(StatusCodes.OK).json(rest);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

