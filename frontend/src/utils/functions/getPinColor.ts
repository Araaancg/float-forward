import { PinTypes, pinTypesCrossColor } from "@/types/enums";
import { IPin } from "@/types/structures";

export default function getPinColor(pin: IPin) {
    return pinTypesCrossColor[pin.type.title as PinTypes];
}