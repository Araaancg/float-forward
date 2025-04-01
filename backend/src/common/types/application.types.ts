import { IUser } from "./user.types";

export interface IApplication {
    file: string,
    user: IUser,
    status: ApplicationStatus,
    reference: string
}

export enum ApplicationStatus {
    SUBMITTED = "submitted",
    LACKING_INFO = "lacking-info",
    DENIED = "denied",
    APPROVED = "approved",
    DELETED = "deleted"
  }