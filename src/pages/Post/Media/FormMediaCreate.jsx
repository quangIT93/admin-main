import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";

import { TextField } from "components";
import { Input, Label } from "@mui/icons-material";
import moment from "moment";

const FormMediaCreate = ({
  onSubmitProp,
  onReset = false,
  isNotEdit = false,
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
    postId: "",
    linkTiktok: "",
    linkYoutube: "",
    image: "",
    video: "",
  };

  const { handleSubmit, reset, setValue, register, formState, watch } = useForm(
    {
      defaultValues: defaultValues,
      mode: "onTouched",
    }
  );

  const { errors } = formState;

  const onSubmit = (data) => {
    try {
      onSubmitProp(data);
      // onReset && resetForm();
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
                label="postId"
                type="text"
                {...register("postId", {
                  required: {
                    value: true,
                    message: "postId is require",
                  },
                })}
                error={!!errors.postId}
                helperText={errors.postId?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="Link Tiktok"
                type="text"
                {...register("linkTiktok")}
                error={!!errors.linkTiktok}
                helperText={errors.linkTiktok?.message}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                label="Link Youtube"
                type="text"
                {...register("linkYoutube")}
                error={!!errors.linkYoutube}
                helperText={errors.linkYoutube?.message}
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
            </Grid>

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

              {imageUrl ? (
                <Box sx={{ marginTop: "1rem" }}>
                  <img
                    width="300px"
                    height="420px"
                    src={imageUrl}
                    alt="Selected Image"
                    style={{ objectFit: "contain", border: "1px solid #ccc" }}
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
