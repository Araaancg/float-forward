import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { IUser } from "../../common/types/user.types";
import { Types } from "mongoose";
import actionLog from "../../common/helpers/actionLog";

@Service()
export class UserService {
  private userModel: any;

  constructor() {
    this.userModel = Container.get("User");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      actionLog("PROCESS", "USERS", "Retriving users...");
      const users = await this.userModel.find(
        filter,
        { password: 0, authProvider: 0 },
        options
      );
      actionLog("SUCCESS", "USERS", "Users retrieved successfully");
      return {
        success: true,
        data: users,
      };
    } catch (e) {
      actionLog("ERROR", "USERS", `Something went wrong retriving users: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retriving users: ${e}`
      );
    }
  }

  async getByEmail(email: string) {
    const user = await this.userModel.find({ email });
    return user[0];
  }

  async create(user: Partial<IUser>): Promise<any> {
    try {
      const { email } = user;
      actionLog("PROCESS", "USERS", "Creating user...");
      // Check user email is not taken
      actionLog("PROCESS", "USERS", "Confirming email is not taken...");
      if (await this.userModel.isEmailTaken(email)) {
        actionLog("ERROR", "USERS", `Email ${email} is taken`);
        throw new ApiError(
          httpStatus.CONFLICT,
          "This email is already in use, please login instead"
        );
      }
      const userCreated = await this.userModel.create([user]);
      actionLog("SUCCESS", "USERS", "User created succesfully");
      return {
        success: true,
        data: userCreated[0],
      };
    } catch (e) {
      actionLog("ERROR", "USERS", `Something went wrong creating user: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong creating user: ${e}`
      );
    }
  }

  async update(_id: Types.ObjectId, user: Partial<IUser>): Promise<unknown> {
    try {
      actionLog("PROCESS", "USERS", "Updating user...");
      if (!_id || !user) {
        actionLog("ERROR", "USERS", "Information to update not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Information to update not provided"
        );
      }

      const _user = (await this.get({ _id }, {})).data[0];

      if (!_user) {
        actionLog("ERROR", "USERS", "User to update does not exist in db");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "User to update does not exist in db"
        );
      }

      if (user?.email) {
        actionLog(
          "PROCESS",
          "USERS",
          "Making sure the email is not duplicate..."
        );
        const isDuplicate = await this.getByEmail(user.email);
        if (isDuplicate) {
          actionLog("ERROR", "USERS", "Email is already registered in db");
          throw new ApiError(
            httpStatus.CONFLICT,
            "Email is already registered in db"
          );
        }
      }

      // Assign the updated data and save it
      Object.assign(_user, user);
      const updatedUser = await _user.save();
      actionLog("SUCCESS", "USERS", "User updated successfully");
      return { success: true, data: updatedUser };
    } catch (e) {
      actionLog(
        "ERROR",
        "USERS",
        `Something went wrong updating the user: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `There was an error updating user: ${e}`
      );
    }
  }
}
