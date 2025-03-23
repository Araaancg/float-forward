import theme from "@/theme";

export enum PinTypes {
  HELP_REQUEST = "Help Request",
  COLLECTION_POINT = "Collection Point",
  MEDICAL_POINT = "Medical Request",
  MISSINGS = "Missings",
  HELP_OFFER = "Help Offer",
  INFORMATION_POINT = "Information Point",
}

export enum PriorityTypes {
  HIGH = "High Priority",
  MEDIUM = "Medium Priority",
  LOW = "Low Priority"
}

export const pinTypesCrossColor: Record<PinTypes, keyof typeof theme.extend.colors.pins> = {
  [PinTypes.HELP_REQUEST]: "yellow",
  [PinTypes.COLLECTION_POINT]: "lightBlue",
  [PinTypes.MEDICAL_POINT]: "red",
  [PinTypes.MISSINGS]: "black",
  [PinTypes.HELP_OFFER]: "green",
  [PinTypes.INFORMATION_POINT]: "darkBlue",
};

export enum MessageStatus {
  SENT = "sent",
  RECEIVED = "received",
  READ = "read",
  FAILED = "failed"
}

export enum ChatStatus {
  ACTIVE = "active",
  ARCHIVED = "archived"
}

export enum PinStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  DELETED = "deleted",
}