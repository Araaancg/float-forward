import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    organization: yup
      .string()
      .required("This field is required"),
    role: yup.string().required("This field is required")
  })
  .required();
