import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    password: yup.string().required("This field is required"),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();
