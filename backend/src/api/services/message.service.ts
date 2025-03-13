import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { IMessage } from "../../common/types/chat.type";
import { Types } from "mongoose";

@Service()
export class MessageService {
  private messageModel: any;

  constructor() {
    this.messageModel = Container.get("Message");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    const query = { ...filter, deletedAt: null };
    return await this.messageModel.find(query, {}, options);
  }

  async create(message: Partial<IMessage>): Promise<any> {
    try {
      // console.log(message)
      const messageCreated = await this.messageModel.create([message]);
      return messageCreated
    } catch (e: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error creating the message"
      );
    }
  }

  async update(
    _id: string,
    message: Partial<IMessage>
  ): Promise<any> {
    try {
      const _message = (await this.get({ _id }, {}))[0];
      if (!_message) {
        throw new ApiError(httpStatus.NOT_FOUND, "Message not found");
      }
      // Assign the updated data and save it
      Object.assign(_message, message);
      const updatedDisaster = await _message.save();
      return updatedDisaster;
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error updating the message"
      );
    }
  }

//   async delete(_id: Types.ObjectId): Promise<any> {
//     try {
//       console.log("id", _id)  
//       const disaster = (await this.get({ _id }, {}))[0];
//       if (!disaster) {
//         throw new ApiError(httpStatus.NOT_FOUND, "Pin Type not found");
//       }
//       return await this.pinTypesModel.findByIdAndUpdate(
//         _id,
//         { deletedAt: new Date() }, // Set the logical deletion timestamp
//         { new: true } // Return the updated document
//       );
//     } catch (e) {
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         "There was an error deleting pin type"
//       );
//     }
//   }
}
