import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { IUser } from "../../common/types/user.types";
import { Types } from "mongoose";

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
    return await this.userModel.find(filter, {}, options);
  }

  async getByEmail(email: string) {
    const user = await this.userModel.find({email})
    return user[0]
  }

  async create(user: Partial<IUser>): Promise<any> {  
    const { email } = user
    // Check user email is not taken - first and last names can be taken
    if (await this.userModel.isEmailTaken(email)) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "This email is already in use, please login instead"
      );
    }
    const userCreated = await this.userModel.create([user])
    return userCreated[0]
  }

  // async update(_id: Types.ObjectId, user: Partial<IUser>): Promise<unknown> {
  //   return async () => {
  //     const { email } = user;

  //     const _user = (await this.get({ _id }, {}))[0];

  //     if (!_user) {
  //       throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  //     }

  //     // if (await this.userModel.isEmailTaken()) {
  //     //   throw new ApiError(
  //     //     httpStatus.CONFLICT,
  //     //     "This email is already in use, please use another one instead"
  //     //   );
  //     // }

  //     // Assign the updated data and save it
  //     Object.assign(_user, user);
  //     await _user.save();

  //     return _user;
  //   };
  // }

  //   async delete(
  //     _id: Types.ObjectId
  //   ): Promise<unknown> {
  //       return async () => {
  //         const _chat = (await this.get({ _id }, {}))[0]

  //         // Check chat exists.
  //         if (!_chat) {
  //           throw new ApiError(httpStatus.NOT_FOUND, 'CHAT NOT FOUND')
  //         }

  //         // Delete the document.
  //         await _chat.deleteOne()

  //         return _chat
  //       }
  //   }
}
