import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { PinTypesService } from "../services/pinTypes.service";

@Service()
export class PinTypesController {
  constructor(private pinTypesService: PinTypesService) {}

  get = catchAsync(async (req, res) => {
    const { limit = 10, skip = 0, ...body } = req.query;
    const result = await this.pinTypesService.get(body, { limit, skip });
    res.status(200).send(result);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await this.pinTypesService.create(body);
    return res.status(200).json({ sucess: true, pinType: result });
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.pinTypesService.update(id, body);
    return res.status(200).json({ sucess: true, disaster: result });
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.pinTypesService.delete(id);
    return res.status(200).json(result);
  });}
