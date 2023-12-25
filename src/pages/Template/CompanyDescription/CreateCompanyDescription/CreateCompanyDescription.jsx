import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormCompanyDescription from "../FormCompanyDescription";
import { toast } from "react-toastify";

import companyDescriptionApi from "api/companyDescriptionApi";

const CreateCompanyDescription = () => {
  const theme = useTheme();

  const onSubmit = async (data) => {
    try {
      await companyDescriptionApi.createCompanyDescription(data);
      return toast.success("Create successful");
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: `calc(100% - ${theme.height.navbar} - 6rem)`,
          color: theme.palette.color.main,
          padding: "0 1rem",
        }}
      >
        <Typography variant="h2" mb={2}>
          Create Company Description Template
        </Typography>

        <FormCompanyDescription onSubmitProp={onSubmit} onReset />
      </Box>
    </>
  );
};

export default CreateCompanyDescription;
