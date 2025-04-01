import { Request, Response } from "express";
import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { UserService } from "../services/user.service";

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  get = catchAsync(async (req: Request, res: Response) => {
    const { limit = 10, skip = 0, ...body } = req.query;
    const result = await this.userService.get(body, { limit, skip });
    res.status(200).send(result);
  });

  update = catchAsync(async (req: any, res: Response) => {
    const result = await this.userService.update(req.token.sub, req.body);
    res.status(200).send(result);
  });
}
