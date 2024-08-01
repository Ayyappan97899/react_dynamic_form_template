export const getDateFormat = (event: { $d: Date }) => {
  const date = new Date(event?.$d);
  const format =
    date?.getFullYear() + "-" + (date?.getMonth() + 1) + "-" + date?.getDate();
  return format;
};

export const getTimeFormat = (event: { $d: Date }) => {
  const time = new Date(event?.$d)?.toISOString();
  return time;
};

export const getInitialFormValues = (fields: any) => {
  const values = {};

  fields?.map((field: any) => {
    if (["DropZoneField", "MultiSelectField"]?.includes(field?.type)) {
      Object.assign(values, { [field?.name]: [] });
    } else if (["FileField"]?.includes(field?.type)) {
      Object.assign(values, { [field?.name]: null });
    } else {
      Object.assign(values, { [field?.name]: "" });
    }
  });

  return values;
};

export const getInitialFormValuesForArray = (fields: any, name: string) => {
  const values = {};

  fields?.map((field: any) => {
    if (["DropZoneField", "MultiSelectField"]?.includes(field?.type)) {
      Object.assign(values, { [field?.name]: [] });
    } else if (["FileField"]?.includes(field?.type)) {
      Object.assign(values, { [field?.name]: null });
    } else {
      Object.assign(values, { [field?.name]: "" });
    }
  });

  return { [name]: [values] };
};
