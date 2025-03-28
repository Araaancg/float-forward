import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IDisaster } from "../../common/types/disaster.type";
import { PinService } from "./pin.service";
import actionLog from "../../common/helpers/actionLog";
import { ImageService } from "./image.service";

@Service()
export class DisasterService {
  private disasterModel: any;

  constructor(
    private pinService: PinService,
    private imageService: ImageService
  ) {
    this.disasterModel = Container.get("Disaster");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      actionLog("PROCESS", "DISASTERS", "Retriving disasters...");
      const query = { ...filter, deletedAt: null };
      let disasters = await this.disasterModel
        .find(query, {}, options)
        .populate("images");
      
      if (disasters && disasters.length === 0) {
        actionLog("ERROR", "DISASTERS", "No disasters were found");
        throw new ApiError(httpStatus.NOT_FOUND, "No disasters were found")
      }

      actionLog("INFO", "DISASTERS", "Disasters retrieved successfully");
      actionLog(
        "PROCESS",
        "DISASTERS",
        "Getting pin information from each disaster..."
      );
      const disastersWithPins = await Promise.all(
        disasters.map(async (disaster: any) => {
          const pins = (await this.pinService.get({ disaster: disaster._id })).data;

          // Convert Mongoose document to plain object to avoid modification issues
          const disasterObj = disaster.toObject();
          return {
            ...disasterObj,
            pins,
          };
        })
      );

      actionLog(
        "SUCCESS",
        "DISASTERS",
        "Disaster information and its pins retrieved successfully"
      );

      return {
        success: true,
        data: disastersWithPins,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "DISASTERS",
        `Something went wrong retriving disasters: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retriving disasters: ${e}`
      );
    }
  }

  async create(disaster: any): Promise<any> {
    try {
      actionLog("PROCESS", "DISASTER", "Creating disaster...");
      const disasterInfo: IDisaster = {
        title: disaster.title,
        description: disaster.description,
        country: disaster.country,
        city: disaster.city,
        slug: disaster.slug,
        coordinates: disaster.coordinates,
      };

      actionLog("PROCESS", "DISASTER", "Uploading images...");
      const imagesInfo = [...disaster.images];
      const images = await this.imageService.create(imagesInfo);
      const imagesId = images.map((img: any) => img._id);

      actionLog("SUCCESS", "DISASTER", "Images uploaded successfully");
      const disasterCreated = await this.disasterModel.create(disasterInfo);
      const allDisaster = { ...disasterCreated, images: imagesId };
      actionLog("SUCCESS", "DISASTER", "Disaster created successfully");
      return { success: true, data: allDisaster };
    } catch (e: any) {
      actionLog(
        "ERROR",
        "DISASTERS",
        `Something went wrong creating the disaster: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong creating the disaster: ${e}`
      );
    }
  }

  async update(
    _id: Types.ObjectId,
    disaster: Partial<IDisaster>
  ): Promise<any> {
    try {
      actionLog("PROCESS", "DISASTERS", "Updating disaster...");
      if (!_id || !disaster) {
        actionLog("ERROR", "DISASTERS", "Information to update not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Information to update not provided"
        );
      }
      const _disaster = (await this.get({ _id }, {})).data[0];
      if (!_disaster) {
        actionLog("ERROR", "DISASTERS", "Disaster to update not found in db");
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Disaster to update not found in db"
        );
      }
      Object.assign(_disaster, disaster);
      const updatedDisaster = await _disaster.save();
      return { success: true, data: updatedDisaster };
    } catch (e) {
      actionLog(
        "ERROR",
        "DISASTERS",
        `Something went wrong updating the disaster: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong updating the disaster: ${e}`
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      actionLog("PROCESS", "DISASTERS", "Deleting disaster...");
      const disaster = (await this.get({ _id }, {})).data[0];
      if (!disaster) {
        actionLog("ERROR", "DISASTERS", "Disaster to delete not found in db");
        throw new ApiError(httpStatus.NOT_FOUND, "Disaster not found");
      }
      const result = await this.disasterModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
      actionLog("SUCCESS", "DISASTERS", "Disaster deleted successfully");
      return { success: true, data: result };
    } catch (e) {
      actionLog(
        "ERROR",
        "DISASTERS",
        `Something went wrong deleting the disaster: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong deleting the disaster: ${e}`
      );
    }
  }
}
