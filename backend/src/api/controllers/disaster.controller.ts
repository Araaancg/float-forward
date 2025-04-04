import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { DisasterService } from "../services/disaster.service";
import { ImageService } from "../services/image.service";

@Service()
export class DisasterController {
  constructor(
    private disasterService: DisasterService,
    private imageService: ImageService
  ) {}

  get = catchAsync(async (req, res) => {
    const { limit, skip, ...body } = req.query;
    const result = await this.disasterService.get(body, { limit, skip });
    res.status(200).send(result);
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await this.disasterService.create(body)
    return res.status(200).json(result);
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.disasterService.update(id, body);
    return res.status(200).json(result);
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.disasterService.delete(id);
    return res.status(200).json(result);
  });
}
