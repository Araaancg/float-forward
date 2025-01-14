import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { PinService } from "../services/pin.service";
import { PinTypesService } from "../services/pinTypes.service";

@Service()
export class PinController {
  constructor(
    private pinService: PinService,
    private pinTypeService: PinTypesService
  ) {}

  get = catchAsync(async (req, res) => {
    const { limit = 10, skip = 0, ...body } = req.query;
    const pins = await this.pinService.get(body, { limit, skip });
    return res.status(200).send(pins);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    console.log("Inside backend pin controller")
    console.log("body", body)
    const pinType = (await this.pinTypeService.get({ title: body.type }))[0];
    console.log(pinType)

    const pin = await this.pinService.create({
      ...body,
      type: pinType._id.toString(),
      user: req.token.sub,
    });
    console.log("\n PIN CREATED", pin)
    return res.status(200).send({ sucess: true, data: pin });
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.pinService.update(id, body);
    return res.status(200).json({ sucess: true, disaster: result });
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.pinService.delete(id);
    return res.status(200).json(result);
  });
}
