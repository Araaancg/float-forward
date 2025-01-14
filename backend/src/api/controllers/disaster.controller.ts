import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { DisasterService } from "../services/disaster.service";
import httpStatus from "http-status";
import { ImageService } from "../services/image.service";
import { IDisaster } from "../../common/types/disaster.type";

@Service()
export class DisasterController {
  constructor(
    private disasterService: DisasterService,
    private imageService: ImageService
  ) {}

  get = catchAsync(async (req, res) => {
    const { limit = 10, skip = 0, ...body } = req.query;
    const result = await this.disasterService.get(body, { limit, skip });
    res.status(200).send({ sucess: true, data: result });
  });

  create = catchAsync(async (req, res) => {
    const body = req.body;

    let disasterInfo: IDisaster = {
      title: body.title,
      description: body.description,
      country: body.country,
      city: body.city,
      slug: body.slug,
      coordinates: body.coordinates,
    };
    const imagesInfo = [...body.images];
    const images = await this.imageService.create(imagesInfo);
    const imagesId = images.map((img: any) => img._id);

    disasterInfo = { ...disasterInfo, images: imagesId };
    const disaster = await this.disasterService.create(disasterInfo);

    return res.status(httpStatus.CREATED).json({ sucess: true, disaster });
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.disasterService.update(id, body);
    return res.status(200).json({ sucess: true, disaster: result });
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.disasterService.delete(id);
    return res.status(200).json(result);
  });
}
