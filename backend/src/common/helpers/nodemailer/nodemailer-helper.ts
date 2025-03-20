import nodemailer from "nodemailer";
import { ApiError } from "../../middlewares/error-handler";
import httpStatus from "http-status";
import { getForgotPasswordHtml } from "./templates/ForgotPasswordTemplate";
import { getVerifyEmailHtml } from "./templates/VerifyEmailTemplate";
import actionLog from "../actionLog";

export function createTransport() {
  const transporter = nodemailer.createTransport({
    port: Number(process.env.EMAIL_PORT!),
    host: process.env.EMAIL_HOST!,
    service: process.env.EMAIL_SERVICE!,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });
  return transporter;
}

export function sendResetPasswordEmail(email: string, name: string, token: string) {
  if (!email) {
    // actionLog("error", "Email recipient was not provided");
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email recipient was not provided"
    );
  }
  // actionLog("PROCESS", `Ready to send an email to ${email}`);
  try {
    const transporter = createTransport();
    const mailData = {
      from: process.env.EMAIL_USER!, // sender address
      to: email, // list of receivers
      subject: "Reset your password",
      text: "That was easy!",
      html: getForgotPasswordHtml({email, name, token}),
    };
    // actionLog("INFO", "Transporter created succesfully");
    transporter.sendMail(mailData, function (err, info) {
      if (err) actionLog("ERROR", "NODEMAILER", `Something went wrong when sending the email: ${err}`)
        else actionLog("SUCCESS", "NODEMAILER", "Email sent succesfully");
    });
  } catch (e) {
    // actionLog("ERROR", `Something went wrong sending email to: ${email}`);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Something went wrong sending email to: ${email}`
    );
  }
}

export function sendVerifyEmail(email: string, name: string, token: string) {
  if (!email) {
    // actionLog("error", "Email recipient was not provided");
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email recipient was not provided"
    );
  }
  // actionLog("PROCESS", `Ready to send an email to ${email}`);
  try {
    const transporter = createTransport();
    const mailData = {
      from: process.env.EMAIL_USER!, // sender address
      to: email, // list of receivers
      subject: "Verify your email",
      text: "That was easy!",
      html: getVerifyEmailHtml({email, name, token}),
    };
    // actionLog("INFO", "Transporter created succesfully");
    transporter.sendMail(mailData, function (err, info) {
        if (err) actionLog("ERROR", "NODEMAILER", `Something went wrong when sending the email: ${err}`)
        else actionLog("SUCCESS", "NODEMAILER", "Email sent succesfully");
    });
  } catch (e) {
    // actionLog("ERROR", `Something went wrong sending email to: ${email}`);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Something went wrong sending email to: ${email}`
    );
  }
}