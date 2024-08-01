import { Typography } from "@mui/material";
import FormContainer from "src/components/common/form/FormContainer";
import { contactInformationFields } from "src/constant";

interface ContactInformationProps {
  onChange: () => void;
  formik: any;
}

const ContactInformation = ({ onChange, formik }: ContactInformationProps) => {
  return (
    <section>
      <Typography variant="h6">Contact Information</Typography>
      <FormContainer
        fields={contactInformationFields}
        onChange={onChange}
        direction="row"
        formik={formik}
      />
    </section>
  );
};

export default ContactInformation;
