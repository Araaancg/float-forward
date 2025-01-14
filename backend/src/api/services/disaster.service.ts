import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IDisaster } from "../../common/types/disaster.type";
import { PinService } from "./pin.service";

@Service()
export class DisasterService {
  private disasterModel: any;

  constructor(private pinService: PinService) {
    this.disasterModel = Container.get("Disaster");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    const query = { ...filter, deletedAt: null };
    let disasters = await this.disasterModel
      .find(query, {}, options)
      .populate("images");

    const disastersWithPins = await Promise.all(
      disasters.map(async (disaster: any) => {
        const pins = await this.pinService.get({ disaster: disaster._id });

        // Convert Mongoose document to plain object to avoid modification issues
        const disasterObj = disaster.toObject();
        return {
          ...disasterObj,
          pins,
        };
      })
    );
    return disastersWithPins;
  }

  async create(disaster: Partial<IDisaster>): Promise<any> {
    try {
      const disasterCreated = await this.disasterModel.create(disaster);
      return disasterCreated;
    } catch (e: any) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error creating the disaster"
      );
    }
  }

  async update(
    _id: Types.ObjectId,
    disaster: Partial<IDisaster>
  ): Promise<any> {
    try {
      const _disaster = (await this.get({ _id }, {}))[0];
      if (!_disaster) {
        throw new ApiError(httpStatus.NOT_FOUND, "Disaster not found");
      }
      // Assign the updated data and save it
      Object.assign(_disaster, disaster);
      const updatedDisaster = await _disaster.save();
      return updatedDisaster;
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error updating disaster"
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      console.log("id", _id);
      const disaster = (await this.get({ _id }, {}))[0];
      if (!disaster) {
        throw new ApiError(httpStatus.NOT_FOUND, "Disaster not found");
      }
      return await this.disasterModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
    } catch (e) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error deleting disaster"
      );
    }
  }
}
