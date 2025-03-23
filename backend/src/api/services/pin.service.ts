import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { IPin, PinStatus } from "../../common/types/pin.type";
import actionLog from "../../common/helpers/actionLog";
import { PinTypesService } from "./pinTypes.service";

@Service()
export class PinService {
  private pinModel: any;
  private disasterModel: any;
  private chatModel: any

  constructor(
    private pinTypeService: PinTypesService,
  ) {
    this.pinModel = Container.get("Pin");
    this.disasterModel = Container.get("Disaster");
    this.chatModel = Container.get("Chat")
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      const query = { ...filter, deletedAt: null, status: PinStatus.ACTIVE } as any;
      actionLog("PROCESS", "PINS", "Retrieving pins...");
      const pins = await this.pinModel
        .find(query, {}, options)
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

  // async getMyPins(
  //   userId: string,
  //   filter?: { [key: string]: any },
  //   options?: { [key: string]: any }
  // ): Promise<any> {
  //   try {
  //     actionLog("PROCESS", "PINS", "Retrieving user pins with maps...");
  //     let info = [];

  //     const pinFilter = {
  //       user: userId,
  //       ...filter,
  //     };

  //     const pins = await this.pinModel
  //       .find(pinFilter, {}, options)
  //       .populate("type")
  //       .populate("user");

  //     if (pins.length > 0) {
  //       const disasterIds = [
  //         ...new Set(pins.map((pin: IPin) => pin.disaster.toString())),
  //       ];

  //       const disasters = await this.disasterModel
  //         .find(
  //           {
  //             _id: { $in: disasterIds },
  //           },
  //           {},
  //           options
  //         )
  //         .populate("images");

  //       info = disasters.map((disaster: any) => {
  //         const mapPins = pins.filter(
  //           (pin: IPin) => pin.disaster.toString() === disaster._id!.toString()
  //         );

  //         return {
  //           ...disaster.toObject(),
  //           pins: mapPins,
  //         };
  //       });

  //       actionLog(
  //         "SUCCESS",
  //         "PINS",
  //         "User pins with disasters retrieved successfully"
  //       );
  //     } else {
  //       actionLog("INFO", "PINS", "User has no pins");
  //     }
  //     return {
  //       success: true,
  //       data: info,
  //     };
  //   } catch (e) {
  //     actionLog(
  //       "ERROR",
  //       "PIN",
  //       `Something went wrong retrieving disasters with maps: ${e}`
  //     );
  //     if (e instanceof ApiError) {
  //       throw e;
  //     }
  //     throw new ApiError(
  //       httpStatus.INTERNAL_SERVER_ERROR,
  //       `Something went wrong retrieving pins with maps: ${e}`
  //     );
  //   }
  // }

  async getMyPins(
    userId: string,
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      actionLog("PROCESS", "PINS", "Retrieving user pins with maps...");
      let info = [];
  
      const pinFilter = {
        user: userId,
        ...filter,
      };
  
      const pins = await this.pinModel
        .find(pinFilter, {}, options)
        .populate("type")
        .populate("user");
  
      if (pins.length > 0) {
        // Get all pin IDs
        const pinIds = pins.map((pin: IPin) => pin._id);
        
        // Find all chats related to these pins where the user is a participant
        const chats = await this.chatModel.find({
          pin: { $in: pinIds },
          "participants.user": userId
        }).populate({
          path: "participants.user",
          select: "firstName lastName email profilePicture" // Adjust fields as needed
        });
        
        // Create a map of pin ID to users who contacted the requesting user
        const pinContactsMap = new Map();
        
        chats.forEach((chat: any) => {
          const pinId = chat.pin.toString();
          
          // Find the other participants (not the requesting user)
          const otherParticipants = chat.participants.filter(
            (participant: any) => participant.user._id.toString() !== userId
          );
          
          // Get or initialize the contacts array for this pin
          const contacts = pinContactsMap.get(pinId) || [];
          
          // Add other participants to contacts if they're not already there
          otherParticipants.forEach((participant: any) => {
            if (!contacts.some((contact: any) => contact._id.toString() === participant.user._id.toString())) {
              contacts.push({
                ...participant.user.toObject(),
                role: participant.role,
                chatId: chat._id
              });
            }
          });
          
          pinContactsMap.set(pinId, contacts);
        });
  
        const disasterIds = [
          ...new Set(pins.map((pin: IPin) => pin.disaster.toString())),
        ];
  
        const disasters = await this.disasterModel
          .find(
            {
              _id: { $in: disasterIds },
            },
            {},
            options
          )
          .populate("images");
  
        info = disasters.map((disaster: any) => {
          const mapPins = pins.filter(
            (pin: IPin) => pin.disaster.toString() === disaster._id!.toString()
          ).map((pin: any) => {
            return {
              ...pin.toObject(),
              contacts: pinContactsMap.get(pin._id.toString()) || []
            };
          });
  
          return {
            ...disaster.toObject(),
            pins: mapPins,
          };
        });
  
        actionLog(
          "SUCCESS",
          "PINS",
          "User pins with disasters and contacts retrieved successfully"
        );
      } else {
        actionLog("INFO", "PINS", "User has no pins");
      }
      return {
        success: true,
        data: info,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "PIN",
        `Something went wrong retrieving disasters with maps: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retrieving pins with maps: ${e}`
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
        status: PinStatus.ACTIVE,
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
        { deletedAt: new Date(), status: PinStatus.DELETED }, // Set the logical deletion timestamp
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
