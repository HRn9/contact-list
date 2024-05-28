import * as Yup from "yup";

export async function validateFields(
  fields: { [key: string]: string },
  validationSchema: Yup.ObjectSchema<Record<string, string | undefined>>
): Promise<{ [key: string]: string } | undefined> {
  try {
    await validationSchema.validate(fields, { abortEarly: false });
    return undefined;
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return err.inner.reduce((acc, error) => {
        if (error.path) {
          acc[error.path] = error.message;
        }
        return acc;
      }, {} as { [key: string]: string });
    } else {
      throw err;
    }
  }
}
