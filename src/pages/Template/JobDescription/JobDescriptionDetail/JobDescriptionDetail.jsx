import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { TextField, ConfirmDialog } from "components";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import moment from "moment";
import FormJobDescription from "../FormJobDescription";
import { toast } from "react-toastify";
import { routes } from "configs";
import jobDescriptionApi from "api/JobDescriptionApi";

const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
  paddingBottom: 16,
}));

const JobDescriptionDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [isNotEdit, setIsNotEdit] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await jobDescriptionApi.getJobDescriptionDetail(id);
        setTemplate(data.data);
      } catch (error) {
        throw error;
      }
    })();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await jobDescriptionApi.updateJobDescription(id, data);
      toast.success("Update successful");
      setIsNotEdit(true);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveTemplate = async () => {
    try {
      await jobDescriptionApi.deleteJobDescription(id);
      setIsNotEdit(true);
      toast.success("Delete successful");
      navigate(routes.jobDescriptionTemplate);
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
        padding: "0 1rem",
      }}
    >
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
            onClick={() => setShowConfirmModal(true)}
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
              value={moment(template.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Item>
        </Grid>
      </Grid>

      <FormJobDescription
        isNotEdit={isNotEdit}
        value={template}
        onSubmitProp={onSubmit}
      />

      <Box sx={{ maxWidth: "600px" }}>
        <ConfirmDialog
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onClickConfirm={handleRemoveTemplate}
          title="Xóa mẫu mô tả công việc"
          text="
            Bạn có chắc chắn xóa mẫu mô tả công việc"
        />
      </Box>
    </Box>
  );
};

export default JobDescriptionDetail;
