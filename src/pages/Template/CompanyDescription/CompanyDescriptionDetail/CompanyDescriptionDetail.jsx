import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// import { Typography, Stack, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// import { useForm } from "react-hook-form";
import { TextField } from "components";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import FormCompanyDescription from "../FormCompanyDescription";
import axios from "axios";
import { routes } from "configs";

const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
  paddingBottom: 16,
}));

const CompanyDescriptionDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [isNotEdit, setIsNotEdit] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        `http://localhost:8000/api/v3/company-description-templates/${id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTcwMzE1MTQxNiwiZXhwIjoxNzA2NzUxNDE2fQ.5NDg2F_NzK6qHvwRhg4Ag5GGzCpucb9C6vqHksn4Akk",
          },
        }
      );
      setTemplate(data.data);
    })();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v3/company-description-templates/${id}/by-admin`,
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTcwMzE1MTQxNiwiZXhwIjoxNzA2NzUxNDE2fQ.5NDg2F_NzK6qHvwRhg4Ag5GGzCpucb9C6vqHksn4Akk",
          },
        }
      );
      toast.success("Update successful");
      setIsNotEdit(true);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveTemplate = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v3/company-description-templates/${id}/by-admin`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTcwMzE1MTQxNiwiZXhwIjoxNzA2NzUxNDE2fQ.5NDg2F_NzK6qHvwRhg4Ag5GGzCpucb9C6vqHksn4Akk",
          },
        }
      );

      toast.success("Delete successful");
      navigate(routes.companyDescriptionTemplate);
    } catch (error) {
      throw error;
    }
  };

  if (!template) {
    return;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: `calc(100% - ${theme.height.navbar} - 6rem)`,
        color: theme.palette.color.main,
        padding: "1rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          paddingBottom: "0 1rem",
        }}
      >
        Company Description Template Detail
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Stack
          flexWrap="wrap"
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb="1rem"
        >
          <Typography variant="h3" color={theme.palette.color.main}>
            Information Template
          </Typography>

          <Stack
            flexWrap="wrap"
            direction="row"
            justifyContent={{ xs: "start", sm: "end" }}
            spacing={2}
          >
            {!isNotEdit ? (
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => setIsNotEdit(!isNotEdit)}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={() => setIsNotEdit(!isNotEdit)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              size="medium"
              onClick={handleRemoveTemplate}
            >
              Delete
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={{ sm: 2 }}>
          <Grid item xs={12} sm={6}>
            <Item>
              <TextField
                label="Id"
                variant="outlined"
                value={template.id}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <TextField
                label="Creation date"
                variant="outlined"
                value={moment(template.createAt).format("DD/MM/YYYY HH:mm:ss")}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Item>
          </Grid>
        </Grid>

        <FormCompanyDescription
          onSubmitProp={onSubmit}
          isNotEdit={isNotEdit}
          value={template}
        />
      </Box>
    </Box>
  );
};

export default CompanyDescriptionDetail;
