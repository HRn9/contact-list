import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Field name is required")
    .min(3, "Name must be at least 3 characters long"),
  vacancy: Yup.string().required("Field vacancy is required"),
  phone: Yup.string()
    .required("Field phone is required")
    .matches(/^\d+$/, "Phone must contain only numbers"),
});
