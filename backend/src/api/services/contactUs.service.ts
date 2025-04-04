import Container, { Service } from "typedi";
import { ApiError } from "../../common/middlewares/error-handler";
import httpStatus from "http-status";
import actionLog from "../../common/helpers/actionLog";
import { sendContactUsMessage } from "../../common/helpers/nodemailer/nodemailer-helper";

@Service()
export class ContactUsService {
  constructor() {}

  async sendMessage({
    name,
    email,
    message,
  }: {
    name: string;
    email: string;
    message: string;
  }): Promise<any> {
    try {
      sendContactUsMessage(name, email, message);
      return {
        success: true,
      };
    } catch (e: any) {
      actionLog(
        "ERROR",
        "CONTACT-US",
        "There was an error when sending the message"
      );
      if (e instanceof ApiError) {
        // rethrow the error if it is a custom error
        throw e;
      }
      // else make it custom
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "There was an error when sending the messages"
      );
    }
  }
}
