import * as yup from "yup";
export const schema = yup.object({
  senderAddress: yup.object({
    street: yup.string().required("can't be empty"),
    city: yup.string().required("can't be empty"),
    postCode: yup
      .string()
      .required("can't be empty")
      .matches(/^\d{4,6}$/, "Invalid postal code"),
    country: yup.string().required("can't be empty"),
  }),
  clientName: yup.string().required("can't be empty"),
  clientEmail: yup
    .string()
    .email("Invalid email")
    .required("can't be empty")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email address"),
  clientAddress: yup.object({
    street: yup.string().required("can't be empty"),
    city: yup.string().required("can't be empty"),
    postCode: yup.string().required("can't be empty"),
    country: yup.string().required("can't be empty"),
  }),
  description: yup
    .string()
    .required("can't be empty")
    .max(200, "too long")
    .trim(),
  items: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required("can't be empty")
          .max(50, "Name too Long")
          .trim(),
        quantity: yup
          .number()
          .typeError("not valid")
          .positive("can't be 0")
          .required("can't be empty")
          .integer("not valid"),
        price: yup
          .number()
          .typeError("not valid")
          .positive("can't be 0")
          .max(10000, "too high")
          .required("can't be empty"),
        total: yup.number().required(),
      })
    )
    .required()
    .min(1, "An item must be added"),
});
