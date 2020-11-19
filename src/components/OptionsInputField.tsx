import React, { SelectHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/core";

type OptionsInsputFieldProps = {
  label?: string;
  name: string;
  placeholder: string;
  options: string[];
};

export const OptionsInputField: React.FC<OptionsInsputFieldProps> = ({
  placeholder,
  options,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let formLabel = props.label ? (
    <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
  ) : (
    ""
  );
  return (
    <FormControl isInvalid={!!error}>
      {formLabel}
      <Select {...field} {...props}>
        <option value="" disabled defaultValue="">
          {placeholder}
        </option>
        {options.map((op) => (
          <option value={op} key={op}>
            {op}
          </option>
        ))}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
