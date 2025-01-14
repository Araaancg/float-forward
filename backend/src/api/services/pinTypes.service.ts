import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IPinType } from "../../common/types/pin.type";

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
    const query = { ...filter, deletedAt: null };
    return await this.pinTypesModel.find(query, {}, options);
  }

  async create(disaster: Partial<IPinType>): Promise<any> {
    try {
      const disasterCreated = await this.pinTypesModel.create(disaster);
      return disasterCreated;
    } catch (e: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error creating the pin type"
      );
    }
  }

  async update(
    _id: Types.ObjectId,
    disaster: Partial<IPinType>
  ): Promise<any> {
    try {
      const _disaster = (await this.get({ _id }, {}))[0];
      if (!_disaster) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pin Type not found");
      }
      // Assign the updated data and save it
      Object.assign(_disaster, disaster);
      const updatedDisaster = await _disaster.save();
      return updatedDisaster;
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error updating pin type"
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      console.log("id", _id)  
      const disaster = (await this.get({ _id }, {}))[0];
      if (!disaster) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pin Type not found");
      }
      return await this.pinTypesModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error deleting pin type"
      );
    }
  }
}
