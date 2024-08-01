import { getDateFormat, getTimeFormat } from "src/utils/common";

interface onChangeProps {
  event: any;
  selectValue: any;
  name: string;
  type: string;
  upload_path: string;
  formik: any;
}

const useOnChangeHandler = () => {
  const onChange = ({
    event,
    selectValue,
    name,
    type,
    formik,
  }: onChangeProps) => {
    if (type === "FileField") {
      formik.setFieldValue(name, event.target.files[0]);
      event.target.value = "";
    } else if (["SelectField"].includes(type)) {
      formik.setFieldValue(name, selectValue?.id || selectValue);
    } else if (type === "MultiSelectField") {
      formik.setFieldValue(
        name,
        selectValue?.map((data: any) => {
          return data.id;
        }),
      );
    } else if (type === "ToggleField" || type === "CheckBoxField") {
      const { checked } = event.target;
      formik.setFieldValue(name, checked);
    } else if (type === "DateField") {
      const date = getDateFormat(event);

      formik.setFieldValue(name, date !== "NaN-NaN-NaN" ? date : null);
    } else if (type === "TimeField") {
      const time = getTimeFormat(event);

      formik.setFieldValue(name, time);
    } else if (type === "DateAndTimeField") {
      const date = getTimeFormat(event);

      formik.setFieldValue(name, date);
    } else {
      const { value } = event.target;

      formik.setFieldValue(name, value);
    }
  };

  return {
    onChange,
  };
};

export default useOnChangeHandler;
