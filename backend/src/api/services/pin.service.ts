import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IPin } from "../../common/types/pin.type";

@Service()
export class PinService {
  private pinModel: any;

  constructor() {
    this.pinModel = Container.get("Pin");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      console.log("GETTING PIN...", filter)
      return await this.pinModel
        .find(filter, {}, options)
        .populate("type")
        .populate("user");
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error retrieving the pin(s)"
      );
    }
  }

  async create(pin: Partial<IPin>): Promise<any> {
    try {
      console.log(pin);
      const pinCreated = await this.pinModel.create(pin);
      return pinCreated;
    } catch (e: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error creating the pin"
      );
    }
  }

  async update(_id: Types.ObjectId, pin: Partial<IPin>): Promise<any> {
    try {
      const _pin = (await this.get({ _id }, {}))[0];
      if (!_pin) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
      }
      // Assign the updated data and save it
      Object.assign(_pin, pin);
      const updatedPin = await _pin.save();
      return updatedPin;
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error updating pin"
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      console.log("id", _id);
      const pin = (await this.get({ _id }, {}))[0];
      if (!pin) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
      }
      return await this.pinModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error deleting pin"
      );
    }
  }
}
