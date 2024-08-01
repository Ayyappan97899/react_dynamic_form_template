/* eslint-disable @typescript-eslint/no-explicit-any */
import AppCheckbox from "./AppCheckBox";
import AppDateAndTimePicker from "./AppDateAndTimePicker";
import AppDatePicker from "./AppDatePicker";
import AppDropZone from "./AppDropzone";
import AppFileInput from "./AppFileInput";
import AppInput from "./AppInput";
import AppMultiSelect from "./AppMultiSelect";
import AppRadioInput from "./AppRadioInput";
import AppRichTextEditor from "./AppRichTextEditor";
import AppSelect from "./AppSelect";
import AppTextArea from "./AppTextArea";
import AppTimePicker from "./AppTimePicker";
import AppToggle from "./AppToggle";

interface FormElementsProps {
  type: string;
  [key: string]: any;
}

const FormElements = ({ type, ...props }: FormElementsProps) => {
  if (type === "TextField") {
    return (
      <AppInput
        type={"text"}
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        {...props}
      />
    );
  } else if (type === "IntegerField") {
    return (
      <AppInput
        type={"number"}
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        {...props}
      />
    );
  } else if (type === "PositiveIntegerField") {
    return (
      <AppInput
        type={"number"}
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        InputProps={{ inputMode: "numeric", min: 0 }}
        {...props}
      />
    );
  } else if (type === "TextAreaField") {
    return (
      <AppTextArea
        label={props?.lable}
        name={props?.name}
        onChange={props?.onChange}
        formValues={props?.formValues}
        {...props}
      />
    );
  } else if (type === "RichTextEditorField") {
    return (
      <AppRichTextEditor
        label={props?.lable}
        name={props?.name}
        onChange={props?.onChange}
        formValues={props?.formValues}
        {...props}
      />
    );
  } else if (type === "SelectField") {
    return (
      <AppSelect
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        meta={props.meta}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "MultiSelectField") {
    return (
      <AppMultiSelect
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        meta={props.meta}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "CheckBoxField") {
    return (
      <AppCheckbox
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "RadioField") {
    return (
      <AppRadioInput
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        meta={props.meta}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "DateField") {
    return (
      <AppDatePicker
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "TimeField") {
    return (
      <AppTimePicker
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "DateAndTimeField") {
    return (
      <AppDateAndTimePicker
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "ToggleField") {
    return (
      <AppToggle
        name={props?.name}
        label={props?.label}
        onChange={props?.onChange}
        formValues={props.formValues}
        {...props}
      />
    );
  } else if (type === "DropZoneField") {
    return <AppDropZone name={props?.name} {...props} />;
  } else if (type === "FileField") {
    return (
      <AppFileInput
        label={props?.label}
        name={props?.name}
        onChange={props?.onChange}
        {...props}
      />
    );
  }
};

export default FormElements;
