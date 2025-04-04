import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ApplicationService } from "../services/application.service";
import httpStatus from "http-status";
import { ApiError } from "../../common/middlewares/error-handler";

@Service()
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  get = catchAsync(async (req, res) => {
    const result = await this.applicationService.get(req.query);
    return res.status(200).send(result);
  });

  create = catchAsync(async (req, res) => {
    if (!req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No file was uploaded")
    }    
    const body = req.body;
    const result = await this.applicationService.create(body, req.token.sub, req.file);
    return res.status(200).send(result);
  });

  update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await this.applicationService.update(id, body);
    return res.status(200).json(result);
  });

  delete = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await this.applicationService.delete(id);
    return res.status(200).json(result);
  });
}
