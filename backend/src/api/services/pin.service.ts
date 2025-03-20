import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IPin } from "../../common/types/pin.type";
import actionLog from "../../common/helpers/actionLog";
import { PinTypesService } from "./pinTypes.service";

@Service()
export class PinService {
  private pinModel: any;

  constructor(private pinTypeService: PinTypesService) {
    this.pinModel = Container.get("Pin");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      actionLog("PROCESS", "PINS", "Retrieving pins...");
      const pins = await this.pinModel
        .find(filter, {}, options)
        .populate("type")
        .populate("user");

      actionLog("SUCCESS", "PINS", "Pins retrieved successfully");
      return {
        success: true,
        data: pins,
      };
    } catch (e) {
      actionLog("ERROR", "PIN", `Something went wrong retriving pins: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retriving pins: ${e}`
      );
    }
  }

  async create(pin: Partial<IPin>, user: string): Promise<any> {
    try {
      actionLog("PROCESS", "PINS", "Creating pin in db...");
      const pinType = (await this.pinTypeService.get({ title: pin.type }))
        .data[0];
      actionLog("PROCESS", "PINS", "Retrieving pin type...");
      const pinCreated = await this.pinModel.create({
        ...pin,
        type: pinType._id.toString(),
        user,
      });
      actionLog("SUCCESS", "PINS", "Pin created successfully");
      return { success: true, data: pinCreated };
    } catch (e: any) {
      actionLog("ERROR", "PIN", `Something went wrong creating the pin: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong creating the pin: ${e}`
      );
    }
  }

  async update(_id: Types.ObjectId, pin: Partial<IPin>): Promise<any> {
    try {
      actionLog("PROCESS", "PINS", "Updating pin...");
      if (!_id || !pin) {
        actionLog("ERROR", "PINS", "Information to update not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Information to update not provided"
        );
      }

      const _pin = (await this.get({ _id }, {})).data[0];

      if (!_pin) {
        actionLog("ERROR", "PINS", "Pin to update does not exist in db");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Pin to update does not exist in db"
        );
      }

      // Assign the updated data and save it
      Object.assign(_pin, pin);
      const updatedPin = await _pin.save();
      actionLog("SUCCESS", "PINS", "Pin updated successfully");
      return { success: true, data: updatedPin };
    } catch (e) {
      actionLog("ERROR", "PINS", `Something went wrong updating pin: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `There was an error updating pin: ${e}`
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      actionLog("PROCESS", "PIN", "Deleting pin...");
      const pin = (await this.get({ _id }, {})).data[0];
      if (!pin) {
        actionLog("ERROR", "PIN", "Pin to delete not found in db");
        throw new ApiError(httpStatus.NOT_FOUND, "Pin not found");
      }
      const result = await this.pinModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
      actionLog("SUCCESS", "PIN", "Pin deleted successfully");
      return { success: true, data: result };
    } catch (e) {
      actionLog("ERROR", "PIN", `Something went wrong deleting the pin: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong deleting the pin: ${e}`
      );
    }
  }
}
