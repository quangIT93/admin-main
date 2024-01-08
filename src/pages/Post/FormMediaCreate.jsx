import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";

import { TextField } from "components";
import { Input, Label } from "@mui/icons-material";
import moment from "moment";
const FormMediaCreate = ({ onSubmitProp, onReset, isNotEdit }) => {
  const theme = useTheme();
  const [source, setSource] = useState();
  const [imageState, setImageState] = useState({
    mainState: "initial", // initial
    imageUploaded: 0,
    selectedFile: "",
  });

  const defaultValues = {
    title: "",
    content: "",
    parentCategoryId: 0,
  };

  const { handleSubmit, reset, setValue, register, formState } = useForm({
    defaultValues,
    mode: "onTouched",
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("data");
    try {
      onSubmitProp(data);

      // onReset && resetForm();
    } catch (error) {
      throw error;
    }
  };

  const handleFileChange = (event) => {
    console.log("event");
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleUploadClick = (event) => {
    console.log("event");
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImageState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    setImageState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        color: theme.palette.color.main,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <TextField
                label="CompanyId"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("CompanyId", {
                  required: {
                    value: true,
                    message: "companyId is require",
                  },
                })}
                error={!!errors.CompanyId}
                helperText={errors.CompanyId?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="PostId"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("postId", {
                  required: {
                    value: true,
                    message: "Title is require",
                  },
                })}
                error={!!errors.postId}
                helperText={errors.postId?.message}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Company Name"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("companyName", {
                  required: {
                    value: true,
                    message: "companyName is require",
                  },
                })}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Title post"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is require",
                  },
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Link Tiktok"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("linkTiktok", {
                  required: {
                    value: true,
                    message: "Link Tiktok is require",
                  },
                })}
                error={!!errors.linkTiktok}
                helperText={errors.linkTiktok?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="Link Youtube"
                type="text"
                InputProps={{
                  readOnly: !isNotEdit ? false : true,
                }}
                {...register("linkYoutube", {
                  required: {
                    value: true,
                    message: "Link Youtube is require",
                  },
                })}
                error={!!errors.linkYoutube}
                helperText={errors.linkYoutube?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="Created at"
                variant="outlined"
                value={moment(213213213123).format("DD/MM/YYYY HH:mm:ss") || ""}
                InputProps={{
                  readOnly: true,
                }}
                {...register("createdAt", {
                  required: {
                    value: true,
                    message: "Created at is require",
                  },
                })}
                onChange={(e) => {}}
                fullWidth
                error={!!errors.createdAt}
                helperText={errors.createdAt?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="Updated Date"
                variant="outlined"
                value={moment(213213213123).format("DD/MM/YYYY HH:mm:ss") || ""}
                InputProps={{
                  readOnly: true,
                }}
                {...register("updatedAt", {
                  required: {
                    value: true,
                    message: "Updated at is require",
                  },
                })}
                onChange={(e) => {}}
                fullWidth
                error={!!errors.updatedAt}
                helperText={errors.updatedAt?.message}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <label htmlFor="file-video">
                <Button variant="contained" component="span">
                  Chọn file video (mp4)
                  <input
                    id="file-video"
                    label="Video"
                    type="file"
                    {...register("video", {
                      required: "File video is require",
                    })}
                    onChange={handleFileChange}
                    error={!!errors.video}
                    helperText={errors.video?.message}
                    accept=".mov,.mp4"
                    style={{ display: "none" }}
                  />
                </Button>
                <Typography variant="h6" ml={2} mt={0.5} color={"#f44336"}>
                  {errors.video?.message}
                </Typography>
              </label>
              {source && (
                <video
                  className="VideoInput_video"
                  width="100%"
                  height={300}
                  controls
                  src={source}
                />
              )}
            </Grid>

            <Grid item xs={12} lg={6}>
              <label htmlFor="file-image">
                <Button variant="contained" component="span">
                  Chọn file image
                  <input
                    id="file-image"
                    label="image"
                    type="file"
                    {...register("image", {
                      required: "File picture is required",
                    })}
                    onChange={handleUploadClick}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </Button>
                <Typography variant="h6" ml={2} mt={0.5} color={"#f44336"}>
                  {errors.image?.message}
                </Typography>
              </label>

              {imageState.selectedFile ? (
                <Box sx={{ marginTop: "1rem" }}>
                  <img
                    width="150px"
                    height="200px"
                    src={imageState.selectedFile}
                  />
                </Box>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormMediaCreate;
