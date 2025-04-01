import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import { Types } from "mongoose";
import actionLog from "../../common/helpers/actionLog";
import {
  ApplicationStatus,
  IApplication,
} from "../../common/types/application.types";
import { sendApplicationUpdateEmail } from "../../common/helpers/nodemailer/nodemailer-helper";
import { UserService } from "./user.service";
import { MulterFile } from "../../common/helpers/multer.config";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid"; // You might need to install this package

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
const storage = new Storage({ projectId, keyFilename });

@Service()
export class ApplicationService {
  private applicationModel: any;

  constructor(private userService: UserService) {
    this.applicationModel = Container.get("Application");
  }

  async get(
    filter?: { [key: string]: any },
    options?: { [key: string]: any }
  ): Promise<any> {
    try {
      const query = { ...filter, deletedAt: null } as any;
      actionLog("PROCESS", "APPLICATION", "Retrieving applications...");
      const pins = await this.applicationModel
        .find(query, {}, options)
        .populate("user");

      actionLog(
        "SUCCESS",
        "APPLICATION",
        "Applications retrieved successfully"
      );
      return {
        success: true,
        data: pins,
      };
    } catch (e) {
      actionLog(
        "ERROR",
        "APPLICATION",
        `Something went wrong retriving application: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong retriving application: ${e}`
      );
    }
  }

  async create(
    application: Partial<IApplication>,
    user: string,
    fileUser: MulterFile
  ): Promise<any> {
    try {
      actionLog("PROCESS", "APPLICATION", "Creating application in db...");
      actionLog("PROCESS", "APPLICATION", "Generating reference...");
      const reference = this.generateRandomReference();
      actionLog("PROCESS", "INFO", `Reference generated: ${reference}`);

      // Generate a secure filename with no identifiable information
      const fileExtension = fileUser.originalname.split(".").pop();
      const secureFilename = `${uuidv4()}.${fileExtension}`;

      // Upload file to Google Cloud Storage
      const fileMetadata = await this.uploadToGCS(fileUser, secureFilename);

      // Store the file reference (not public URL) in the database
      const applicationCreated = await this.applicationModel.create({
        file: fileMetadata.name, // Store just the file path/name
        user: user,
        reference,
        ...application,
      });

      actionLog("SUCCESS", "APPLICATION", "Application created successfully");
      return { success: true, data: applicationCreated };
    } catch (e: any) {
      actionLog(
        "ERROR",
        "APPLICATION",
        `Something went wrong creating the application: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong creating the application: ${e}`
      );
    }
  }

  // Secure method to upload file to GCS without using legacy ACLs
  private async uploadToGCS(file: MulterFile, filename: string): Promise<any> {
    const bucketName = process.env.BUCKET_NAME!;
    const bucket = storage.bucket(bucketName);
    const gcsFile = bucket.file(filename);

    return new Promise((resolve, reject) => {
      const stream = gcsFile.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
        resumable: false,
        // Remove predefinedAcl: 'private' as it's not compatible with uniform bucket-level access
      });

      stream.on("error", (err) => {
        reject(err);
      });

      stream.on("finish", async () => {
        try {
          // Get file metadata
          const [metadata] = await gcsFile.getMetadata();
          resolve({
            name: gcsFile.name,
            bucket: bucketName,
            contentType: metadata.contentType,
          });
        } catch (err) {
          reject(err);
        }
      });

      // Write the file buffer to GCS
      stream.end(file.buffer);
    });
  }

  // For authorized access later (implement in a separate method)
  async getSignedUrl(filename: string): Promise<string> {
    const bucketName = process.env.BUCKET_NAME!;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    // Generate a signed URL that expires in 15 minutes
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return url;
  }

  // Implement the reference generator method
  private generateRandomReference(): string {
    return `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  async update(
    _id: Types.ObjectId,
    application: Partial<IApplication>
  ): Promise<any> {
    try {
      actionLog("PROCESS", "APPLICATION", "Updating application...");
      if (!_id || !application) {
        actionLog("ERROR", "APPLICATION", "Information to update not provided");
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Information to update not provided"
        );
      }

      const _application = (await this.get({ _id }, {})).data[0];

      if (!_application) {
        actionLog(
          "ERROR",
          "APPLICATION",
          "Application to update does not exist in db"
        );
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "Application to update does not exist in db"
        );
      }

      // Assign the updated data and save it
      Object.assign(_application, application);
      const updatedApplication = await _application.save();
      actionLog("SUCCESS", "APPLICATION", "Application updated successfully");
      console.log(application.status);
      if (
        application.status &&
        application.status === ApplicationStatus.APPROVED
      ) {
        actionLog("PROCESS", "INFO", "Application was approved");
        actionLog("PROCESS", "APPLICATION", "Sending information email...");
        // application was approved
        sendApplicationUpdateEmail(
          _application.user.name,
          _application.user.email,
          ApplicationStatus.APPROVED
        );
        actionLog("PROCESS", "APPLICATION", "Updating user role...");
        await this.userService.update(_application.user._id, {
          role: "first-responder",
        });
      } else if (
        application.status &&
        application.status === ApplicationStatus.DENIED
      ) {
        actionLog("PROCESS", "INFO", "Application was denied");
        // application was denied
        actionLog("PROCESS", "APPLICATION", "Sending information email...");
        sendApplicationUpdateEmail(
          _application.user.name,
          _application.user.email,
          ApplicationStatus.DENIED
        );
      }

      actionLog("SUCCESS", "APPLICATION", "Email sent successfully");
      return { success: true, data: updatedApplication };
    } catch (e) {
      actionLog(
        "ERROR",
        "APPLICATION",
        `Something went wrong updating application: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `There was an error updating application: ${e}`
      );
    }
  }

  async delete(_id: Types.ObjectId): Promise<any> {
    try {
      actionLog("PROCESS", "APPLICATION", "Deleting application...");
      const pin = (await this.get({ _id }, {})).data[0];
      if (!pin) {
        actionLog(
          "ERROR",
          "APPLICATION",
          "Application to delete not found in db"
        );
        throw new ApiError(httpStatus.NOT_FOUND, "Application not found");
      }
      const result = await this.applicationModel.findByIdAndUpdate(
        _id,
        { deletedAt: new Date(), status: ApplicationStatus.DELETED }, // Set the logical deletion timestamp
        { new: true } // Return the updated document
      );
      actionLog("SUCCESS", "APPLICATION", "Application deleted successfully");
      return { success: true, data: result };
    } catch (e) {
      actionLog(
        "ERROR",
        "APPLICATION",
        `Something went wrong deleting the application: ${e}`
      );
      if (e instanceof ApiError) {
        throw e;
      }
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        `Something went wrong deleting the application: ${e}`
      );
    }
  }
}
