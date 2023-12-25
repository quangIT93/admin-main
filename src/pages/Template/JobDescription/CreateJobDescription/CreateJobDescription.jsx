import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import FormJobDescription from "../FormJobDescription";
import axios from "axios";
import jobDescriptionApi from "api/JobDescriptionApi";

const CreateJobDescription = () => {
  const theme = useTheme();

  const onSubmit = async (data) => {
    try {
      await jobDescriptionApi.createJobDescription(data);
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
          padding: "1rem",
        }}
      >
        <Typography variant="h2" mb={2}>
          Create Job Description Template
        </Typography>

        <FormJobDescription onSubmitProp={onSubmit} onReset />
      </Box>
    </>
  );
};

export default CreateJobDescription;
