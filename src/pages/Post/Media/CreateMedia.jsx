import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import FormMediaCreate from "./FormMediaCreate";
import { Box, Typography, Stack, Button } from "@mui/material";
import { toast } from "react-toastify";
import mediaApi from "api/mediaApi";
const CreateMedia = () => {
  const [isNotEdit, setIsNotEdit] = useState(true);
  const theme = useTheme();
  const onSubmit = async (data) => {
    const { postId, linkTiktok, linkYoutube, image, video, status } = data;
    console.log("status", status);
    try {
      const dataForm = new FormData();
      dataForm.append("postId", postId);
      dataForm.append("linkTiktok", linkTiktok);
      dataForm.append("linkYoutube", linkYoutube);
      if (image) {
      }
      const data = await mediaApi.postPostMedias(dataForm);
      if (data) {
        return toast.success("Create successful");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
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
          Create Media
        </Typography>
      </Stack>
      <FormMediaCreate onSubmitProp={onSubmit} onReset isNotEdit={isNotEdit} />
    </Box>
  );
};

export default CreateMedia;
