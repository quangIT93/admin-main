import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import TableCustom from "components/Table/TableCustom";
import jobDescriptionTemplateColumns from "configs/table/jobDescritionTemplateCoumn";
import { Link } from "react-router-dom";
import { routes } from "configs";

const JobDescription = () => {
  const [templates, setTemplates] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        "http://localhost:8000/api/v3/category-description-templates/by-admin",
        {
          headers: {
            Authorization: ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTcwMjk1MTE0NSwiZXhwIjoxNzA2NTUxMTQ1fQ.Uy9BaY2jRON13C81DZOTrkxtbcFYJWO3tdCAcwNUTrM`,
          },
        }
      );
      setTemplates(data.data);
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: `calc(100vh - ${theme.height.navbar} - 6rem)`,
        color: theme.palette.color.main,
      }}
    >
      <Stack
        flexWrap="wrap"
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h2">Company Description Template</Typography>

        <Box>
          <Link to={routes.jobDescriptionTemplateCreate}>
            <Button variant="outlined" color="success">
              Create Template
            </Button>
          </Link>
        </Box>
      </Stack>

      <Box sx={{ height: "80vh" }}>
        <TableCustom rows={templates} columns={jobDescriptionTemplateColumns} />
      </Box>
    </Box>
  );
};

export default JobDescription;
