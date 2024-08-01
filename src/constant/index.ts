import * as Yup from "yup";

// Form:

export const validationSchema = Yup.object().shape({
  text: Yup.string().required("Text field is Required"),
  select: Yup.string().required("Select field is Required"),
  multiSelect: Yup.array().min(1).required("Multi Select field is Required"),
  checkbox: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("Checkbox field is Required"),
  textArea: Yup.string().required("Textarea field is Required"),
  textEditor: Yup.string().required(" Text editor field is Required"),
  radio: Yup.string().required(" Radio field is Required"),
  date_picker: Yup.string().required(" Date field is Required"),
  time_picker: Yup.string().required(" Time field is Required"),
  date_time_picker: Yup.string().required(" Date and Time field is Required"),
  toggle: Yup.boolean()
    .oneOf([true], "You must enable toggle")
    .required(" toggle field is Required"),

  file: Yup.mixed().required(" File field is Required"),
  dropzone: Yup.array().min(1).required(" Dropozne field is Required"),
});

export const meta = {
  select: [
    {
      id: "1",
      label: "Leo",
    },
    {
      id: "2",
      label: "KO",
    },
    {
      id: "3",
      label: "Wrong Turn",
    },
  ],
  multiSelect: [
    {
      id: "1",
      label: "India",
    },
    {
      id: "2",
      label: "UK",
    },
    {
      id: "3",
      label: "USA",
    },
  ],
  radio: [
    {
      id: "1",
      label: "Yes",
    },
    {
      id: "2",
      label: "No",
    },
  ],
};

export const fields = [
  {
    name: "text",
    type: "TextField",
    label: "Text",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "select",
    type: "SelectField",
    label: "Select",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "multiSelect",
    type: "MultiSelectField",
    label: "Multi Select",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "checkbox",
    type: "CheckBoxField",
    label: "CheckBox",
    isRequired: true,
  },
  {
    name: "textArea",
    type: "TextAreaField",
    label: "Textarea",
    isRequired: true,
    size: {
      lg: 12,
      sm: 12,
      md: 12,
      xs: 12,
    },
  },
  {
    name: "textEditor",
    type: "RichTextEditorField",
    label: "Text Editor",
    isRequired: true,
    size: {
      lg: 12,
      sm: 12,
      md: 12,
      xs: 12,
    },
  },
  {
    name: "radio",
    type: "RadioField",
    label: "Radio",
    isRequired: true,
  },
  {
    name: "date_picker",
    type: "DateField",
    label: "Date",
    isRequired: true,
  },
  {
    name: "time_picker",
    type: "TimeField",
    label: "Time",
    isRequired: true,
  },
  {
    name: "date_time_picker",
    type: "DateAndTimeField",
    label: "Date And Time",
    isRequired: true,
  },
  {
    name: "toggle",
    type: "ToggleField",
    label: "Toggle",
    isRequired: true,
  },
  {
    name: "file",
    type: "FileField",
    label: "File",
    isRequired: true,
  },
  {
    name: "dropzone",
    type: "DropZoneField",
    label: "DropZone",
    isRequired: true,
    size: {
      lg: 12,
    },
  },
];

// Array Form:

export const validationSchemaForArray = Yup.object().shape({
  qualification: Yup.array().of(
    Yup.object().shape({
      department: Yup.string().required("Department is required"),
      degree: Yup.string().required("Degree is required"),
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      documents: Yup.array().min(1).required("Documents field is Required"),
    })
  ),
});

export const fieldsForArray = [
  {
    name: "department",
    type: "TextField",
    label: "Department",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "degree",
    type: "TextField",
    label: "Degree",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "start_date",
    type: "DateField",
    label: "Start Date",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "end_date",
    type: "DateField",
    label: "End Date",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "documents",
    type: "DropZoneField",
    label: "Documents",
    isRequired: true,
    size: {
      lg: 12,
    },
  },
];

// Stepper Form:

export const contactInformationFields = [
  {
    name: "first_name",
    type: "TextField",
    label: "First Name",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "last_name",
    type: "TextField",
    label: "Last Name",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
];

export const orgInformationFields = [
  {
    name: "business_name",
    type: "TextField",
    label: "Business Name",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
  {
    name: "address",
    type: "TextField",
    label: "Address",
    isRequired: true,
    size: {
      lg: 3,
      sm: 6,
      md: 4,
      xs: 12,
    },
  },
];

export const contactInformationInitialValues = {
  first_name: "",
  last_name: "",
};
export const contactInformationValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last name"),
});

export const orgInformationInitialValues = {
  business_name: "",
  address: "",
};
export const orgInformationValidationSchema = Yup.object().shape({
  business_name: Yup.string().required("Please enter your business name"),
  address: Yup.string().required("Please enter your address name"),
});
