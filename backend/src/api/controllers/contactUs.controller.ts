import { Service } from "typedi";
import { catchAsync } from "../../common/helpers/catch-async";
import { ContactUsService } from "../services/contactUs.service";

@Service()
export class ContactUsController {
  constructor(private contactUsService: ContactUsService) {}

  sendMessage = catchAsync(async (req, res) => {
    const body = req.body;
    const result = await this.contactUsService.sendMessage(body);
    res.send(result);
  });
}
