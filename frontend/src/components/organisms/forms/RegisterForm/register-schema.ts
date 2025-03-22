import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .required("Este campo es obligatorio")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        "Email format is invalid"
      ),
    password: yup.string().required("This field is required"),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();
