import { FieldErorr } from "../generated/graphql";

export const toErrorMap = (errors: FieldErorr[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
