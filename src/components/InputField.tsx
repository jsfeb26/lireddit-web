import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputOrTextareaFieldType =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputFieldProps = InputOrTextareaFieldType & {
  name: string;
  label: string;
  size?: number;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _, // don't pass size in because we're not using it and typescript is not happy
  ...props
}) => {
  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }

  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        // value={values.username}
        // onChange={handleChange}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
