import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { PinService } from "../services/pin.service";
import { PinStatus } from "../../common/types/pin.type";

@Service()
export class PinController {
  constructor(private pinService: PinService) {}

  get = catchAsync(async (req, res) => {
    const { limit, skip, ...body } = req.query;
    const result = await this.pinService.get(body, { limit, skip, status: PinStatus.ACTIVE });
    return res.status(200).send(result);
  });

  getMyPins = catchAsync(async (req, res) => {
    const { limit, skip, ...body } = req.query;
    const user = req.token.sub;
    const result = await this.pinService.getMyPins(user, body, { limit, skip });
    return res.status(200).send(result);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await this.pinService.create(body, req.token.sub);
    return res.status(200).send(result);
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.pinService.update(id, body);
    return res.status(200).json(result);
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.pinService.delete(id);
    return res.status(200).json(result);
  });
}
