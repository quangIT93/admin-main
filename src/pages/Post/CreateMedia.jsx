import React, { useState } from "react";
import FormMediaCreate from "./FormMediaCreate";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Stack, Button } from "@mui/material";

import { toast } from "react-toastify";
const CreateMedia = () => {
  const theme = useTheme();
  const [isNotEdit, setIsNotEdit] = useState(true);
  const onSubmit = async (data) => {
    try {
      console.log("dataa", data);
      return toast.success("Create successful");
    } catch (error) {
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
            // onClick={() => setShowConfirmModal(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <FormMediaCreate onSubmitProp={onSubmit} onReset isNotEdit={isNotEdit} />
    </Box>
  );
};

export default CreateMedia;
