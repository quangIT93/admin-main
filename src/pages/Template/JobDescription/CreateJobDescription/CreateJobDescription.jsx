import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import FormJobDescription from "../FormJobDescription";
import axios from "axios";

const CreateJobDescription = () => {
  const theme = useTheme();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v3/category-description-templates/by-admin",
        data,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTcwMjk1MTE0NSwiZXhwIjoxNzA2NTUxMTQ1fQ.Uy9BaY2jRON13C81DZOTrkxtbcFYJWO3tdCAcwNUTrM`,
          },
        }
      );
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
        }}
      >
        <Typography variant="h2" mb={1}>
          Create Job Description Template
        </Typography>

        <FormJobDescription onSubmitProp={onSubmit} onReset />
      </Box>
    </>
  );
};

export default CreateJobDescription;
