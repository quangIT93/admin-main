import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormMediaEdit from "./FormMediaEdit";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Stack, Button } from "@mui/material";

import { toast } from "react-toastify";
import mediaApi from "api/mediaApi";
import { routes } from "configs";
const CreateMedia = () => {
  const { id } = useParams();

  const theme = useTheme();
  const [isNotEdit, setIsNotEdit] = useState(true);
  const [medias, setMedias] = useState([]);
  const [onReset, setOnReset] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await mediaApi.getPostMediaById(id);

      if (data.status === 200) {
        setMedias(data.data);
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    const { postId, linkTiktok, linkYoutube, image, video } = data;

    try {
      const dataForm = new FormData();
      dataForm.append("postId", postId);
      dataForm.append("linkTiktok", linkTiktok);
      dataForm.append("linkYoutube", linkYoutube);
      if (image) {
        dataForm.append("image", image);
      }

      // if (image) {
      //   dataFotm.append("video", video);
      // }

      const data = await mediaApi.putPostMedia(id, dataForm);
      if (data) {
        navigate(routes.media);
        return toast.success("Create successful");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      const data = await mediaApi.deletePostMedia(id);
      if (data) {
        setIsNotEdit(true);
        navigate(routes.media);
        toast.success("Deleted successful");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const handleReset = () => {
    setIsNotEdit(false);
    setOnReset(true);
  };

  const handleClose = async (id, status) => {
    try {
      const data = await mediaApi.closePostMedia(id, { status });
      if (data.statusCode === 200 && status === 2) {
        setIsNotEdit(true);
        navigate(routes.media);
        toast.success("Closed successful");
      } else if (data.statusCode === 200 && status === 1) {
        setIsNotEdit(true);
        navigate(routes.media);
        toast.success("Open successful");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  console.log("media", medias);
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
        <Typography variant="h2" mb={2}>
          Edit Media
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
            color="primary"
            size="medium"
            onClick={() => {
              handleClose(id, medias.status === 1 ? 2 : 1);
            }}
          >
            {medias.status === 1 ? "Close" : "Open"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="medium"
            onClick={() => handleDeleteMedia(id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
      {medias.length !== 0 ? (
        <FormMediaEdit
          onSubmitProp={onSubmit}
          onReset={onReset}
          setOnReset={setOnReset}
          isNotEdit={isNotEdit}
          setIsNotEdit={setIsNotEdit}
          value={medias}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default CreateMedia;
