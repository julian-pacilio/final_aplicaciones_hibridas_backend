import yup from "yup";

export const AccountSchema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("El email es un campo obligatorio"),
  name: yup
    .string()
    .required("El nombre es un campo obligatorio"),
  surname: yup
    .string()
    .required("El apellido es un campo obligatorio"),
  password: yup
    .string()
    .length(8, "El password debe contener 8 caracteres")
    .required("El password es un campo obligatorio"),
  confirm_password: yup
    .string()
    .length(8, "El password debe contener 8 caracteres")
    .required("El password es un campo obligatorio")
    .oneOf([yup.ref("password"), null], "Las constraseñas no coinciden"),
});

export const AccountLoginSchema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("El email es un campo obligatorio"),
  password: yup
    .string()
    .length(8, "El password debe contener 8 caracteres")
    .required("El password es un campo obligatorio"),
});