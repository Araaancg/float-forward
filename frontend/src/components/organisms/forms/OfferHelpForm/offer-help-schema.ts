import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    title: yup.string().required("Este campo es obligatorio"),
    description: yup.string().required("Este campo es obligatorio"),
    additionalInformation: yup.string(),
  })
  .required();
