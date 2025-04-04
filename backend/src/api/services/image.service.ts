import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { IUser } from "../../common/types/user.types";
import { Types } from "mongoose";
import { IImages } from "../../common/types/image.types";

@Service()
export class ImageService {
  private imageModel: any;

  constructor() {
    this.imageModel = Container.get("Images");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    return await this.imageModel.find(filter, {}, options);
  }

  async create(images: Partial<IImages>[]): Promise<any> {
    try {
      if (!Array.isArray(images) || images.length === 0) {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Images list must be a non-empty array."
        );
      }

      // Save images to the database
      const savedImages = await this.imageModel.insertMany(images);
      return savedImages;
    } catch (error) {
      console.error("Error creating images:", error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create images."
      );
    }
  }
  

  async update(_id: Types.ObjectId, user: Partial<IUser>): Promise<any> {
    // try {
    //   const _user = (await this.get({ _id }, {}))[0];
    //   if (!_user) {
    //     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    //   }
    //   if (await this.userModel.isEmailTaken()) {
    //     throw new ApiError(
    //       httpStatus.CONFLICT,
    //       "This email is already in use, please use another one instead"
    //     );
    //   }
    //   // Assign the updated data and save it
    //   Object.assign(_user, user);
    //   const updatedUser = await _user.save();
    //   return updatedUser;
    // } catch (e) {
    //   throw new ApiError(
    //     httpStatus.INTERNAL_SERVER_ERROR,
    //     "There was an error updating user"
    //   );
    // }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    // return async () => {
    //   const _chat = (await this.get({ _id }, {}))[0];
    //   // Check chat exists.
    //   if (!_chat) {
    //     throw new ApiError(httpStatus.NOT_FOUND, "CHAT NOT FOUND");
    //   }
    //   // Delete the document.
    //   await _chat.deleteOne();
    //   return _chat;
    // };
  }
}
