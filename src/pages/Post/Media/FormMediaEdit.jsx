import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";

import { TextField } from "components";
import { Input, Label } from "@mui/icons-material";
import moment from "moment";

const FormMediaCreate = ({
  onSubmitProp,
  onReset,
  setOnReset,
  isNotEdit = false,
  setIsNotEdit,
  value,
}) => {
  const [videoUrl, setVideoUrl] = useState(value?.video);
  const [imageUrl, setImageUrl] = useState(value?.imageThumb);
  const theme = useTheme();
  // const [source, setSource] = useState();
  // const [imageState, setImageState] = useState({
  //   mainState: "initial", // initial
  //   imageUploaded: 0,
  //   selectedFile: "",
  // });

  const defaultValues = {
    companyId: value.companyId,
    postId: value.postId,
    companyName: value.company.name,
    title: value.post.title,
    linkTiktok: value.linkTiktok,
    linkYoutube: value.linkYoutube,
    createdAt: moment(value.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    updatedAt: moment(value.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
    image: "",
    video: "",
  };

  const { handleSubmit, reset, setValue, register, formState } = useForm({
    defaultValues: defaultValues,
    mode: "onTouched",
  });

  const { errors } = formState;

  useEffect(() => {
    if (value) {
      // setValue("companyId", value.companyId);
      // setValue("postId", value.postId);
      // setValue("companyName", value.company.name);
      // setValue("title", value.post.title);
      // setValue("linkTiktok", value.linkTiktok);
      // setValue("linkYoutube", value.linkYoutube);
      setValue(
        "createdAt",
        moment(value.createdAt).format("DD/MM/YYYY HH:mm:ss")
      );
      setValue(
        "updatedAt",
        moment(value.updatedAt).format("DD/MM/YYYY HH:mm:ss")
      );
      setValue("image", "");
      setValue("video", "");
    }
  }, [value]);

  useEffect(() => {
    if (onReset) {
      reset({
        linkTiktok: "",
        linkYoutube: "",
      });

      setOnReset(false);
    }
  }, [onReset]);

  const onSubmit = (data) => {
    try {
      onSubmitProp(data);
    } catch (error) {
      throw error;
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file instanceof File) {
      // setValue("video", file);

      try {
        const videoUrl = URL.createObjectURL(file);
        setValue("video", file);
        setVideoUrl(videoUrl);
      } catch (error) {
        console.error("Error creating video URL:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file instanceof File) {
      try {
        const imageUrl = URL.createObjectURL(file);

        setValue("image", file);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error creating image URL:", error);
      }
    }
  };

  console.log("imageUrl", imageUrl);

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
                label="company id"
                type="text"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                {...register("companyId", {
                  required: {
                    value: true,
                    message: "companyId is require",
                  },
                })}
                error={!!errors.companyId}
                helperText={errors.companyId?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="postId"
                type="text"
                InputProps={{
                  readOnly: true,
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
                  readOnly: true,
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
                  readOnly: true,
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
                // value={moment(213213213123).format("DD/MM/YYYY HH:mm:ss") || ""}
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
                InputProps={{
                  readOnly: true,
                }}
                {...register("updatedAt", {
                  required: {
                    value: true,
                    message: "Updated at is require",
                  },
                })}
                fullWidth
                error={!!errors.updatedAt}
                helperText={errors.updatedAt?.message}
              />
            </Grid>

            {/* <Grid item xs={12} lg={12}>
              <label htmlFor="file-video">
                <Button variant="contained" component="span">
                  Chọn file video (mp4)
                  <input
                    id="file-video"
                    label="Video"
                    type="file"
                    {...register("video")}
                    // onChange={handleVideoChange}
                    accept="video/*"
                    style={{ display: "none" }}
                    disabled
                  />
                </Button>
                <Typography variant="h6" ml={2} mt={0.5} color={"#f44336"}>
                  {errors.video?.message}
                </Typography>
              </label>
              {videoUrl && (
                <video
                  className="VideoInput_video"
                  width="100%"
                  height={400}
                  controls
                  src={videoUrl}
                />
              )}
            </Grid> */}

            {!isNotEdit ? (
              <Grid item xs={12} lg={6}>
                <label htmlFor="file-image">
                  <Button variant="contained" component="span">
                    Chọn file image
                    <input
                      id="file-image"
                      label="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </Button>
                  {imageUrl ? (
                    <Typography variant="h6" ml={2} my={1} color={"#f44336"}>
                      {errors.image?.message}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </label>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          {imageUrl ? (
            <Box sx={{ marginTop: "1rem" }}>
              <img
                width="300px"
                height="420px"
                src={imageUrl}
                alt="Selected Image"
                style={{ objectFit: "cover", border: "1px solid #ccc" }}
              />
            </Box>
          ) : (
            <></>
          )}

          {!isNotEdit ? (
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Submit
            </Button>
          ) : (
            <></>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default FormMediaCreate;
