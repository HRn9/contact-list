import { StringSchema } from "yup";

export default function useValidationSchema(
  validationSchemaField: StringSchema,
  value: string,
  setErrorFunc: React.Dispatch<React.SetStateAction<string>>
) {
  validationSchemaField
    .validate(value)
    .then(() => setErrorFunc(""))
    .catch((error) => setErrorFunc(error.message));

}
