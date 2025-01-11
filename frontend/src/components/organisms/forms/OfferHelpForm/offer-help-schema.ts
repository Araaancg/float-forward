import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Este campo es obligatorio")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        "El formato del email no parece válido!"
      )
  })
  .required();
