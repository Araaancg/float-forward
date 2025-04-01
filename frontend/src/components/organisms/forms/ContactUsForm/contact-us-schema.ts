import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .required("This field is required")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        "Invalid email format"
      ),
    message: yup.string().required("This field is required")
  })
  .required();
