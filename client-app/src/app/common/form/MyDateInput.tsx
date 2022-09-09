import { useField } from "formik";
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FormField, Label } from "semantic-ui-react";

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={value => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">{meta.error}</Label>
      ) : null}
    </FormField>
  )
}