import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IPinType } from "../../common/types/pin.type";
import actionLog from "../../common/helpers/actionLog";

@Service()
export class PinTypesService {
  private pinTypesModel: any;

  constructor() {
    this.pinTypesModel = Container.get("PinTypes");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      actionLog("PROCESS", "PIN-TYPES", "Retriving pin types...");
      const pinTypes = await this.pinTypesModel.find(filter, {}, options);
      actionLog("SUCCESS", "PIN-TYPES", "Pin types retrieved successfully");
      return {
        success: true,
        data: pinTypes,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "PIN-TYPES",
        `Something went wrong retriving pin types: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retriving pin types: ${e}`
      );
    }
  }

  async create(pinType: Partial<IPinType>): Promise<any> {
    try {
      actionLog("PROCESS", "PIN-TYPES", "Creating pin type...");
      const pinTypeCreated = await this.pinTypesModel.create([pinType]);
      actionLog("SUCCESS", "PIN-TYPES", "Pin type created succesfully");
      return {
        success: true,
        data: pinTypeCreated[0],
      };
    } catch (e) {
      actionLog("ERROR", "PIN-TYPES", `Something went wrong creating pin type: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong creating pin type: ${e}`
      );
    }
  }

  async update(_id: Types.ObjectId, pinType: Partial<IPinType>): Promise<unknown> {
    try {
      actionLog("PROCESS", "PIN-TYPES", "Updating pin type...");
      if (!_id || !pinType) {
        actionLog("ERROR", "PIN-TYPES", "Information to update not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Information to update not provided"
        );
      }

      const _pinType = (await this.get({ _id }, {})).data[0];

      if (!_pinType) {
        actionLog("ERROR", "PIN-TYPES", "Pin type to update does not exist in db");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Pin type to update does not exist in db"
        );
      }

      // Assign the updated data and save it
      Object.assign(_pinType, pinType);
      const updatedUser = await _pinType.save();
      actionLog(
        "SUCCESS",
        "PIN-TYPES",
        "Pin type updated successfully"
      );
      return { success: true, data: updatedUser };
    } catch (e) {
      actionLog("ERROR", "PIN-TYPES", `Something went wrong updating pin type: ${e}`);
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `There was an error updating pin type: ${e}`
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      actionLog("PROCESS", "PIN-TYPES", "Deleting pin type...");
      const pinType = (await this.get({ _id }, {})).data[0];
      if (!pinType) {
        actionLog("ERROR", "PIN-TYPES", "Pin type to delete not found in db");
        throw new ApiError(httpStatus.NOT_FOUND, "Pin type not found");
      }
      const result = await this.pinTypesModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
      actionLog("SUCCESS", "PIN-TYPES", "Pin type deleted successfully");
      return { success: true, data: result };
    } catch (e) {
      actionLog(
        "ERROR",
        "PIN-TYPES",
        `Something went wrong deleting the pin type: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong deleting the pin type: ${e}`
      );
    }
  }
}
