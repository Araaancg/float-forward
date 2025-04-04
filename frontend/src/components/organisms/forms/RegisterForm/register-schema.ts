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
    password: yup.string().required("This field is required"),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();
