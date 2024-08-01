import { Typography } from "@mui/material";
import FormContainer from "src/components/common/form/FormContainer";
import { orgInformationFields } from "src/constant";

interface OrgInformationProps {
  onChange: () => void;
  formik: any;
}

const OrgInformation = ({ onChange, formik }: OrgInformationProps) => {
  return (
    <section>
      <Typography variant="h6">Organization Information</Typography>
      <FormContainer
        fields={orgInformationFields}
        onChange={onChange}
        direction="row"
        formik={formik}
      />
    </section>
  );
};

export default OrgInformation;
