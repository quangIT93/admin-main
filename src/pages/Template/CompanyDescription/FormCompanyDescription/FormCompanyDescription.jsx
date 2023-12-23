import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "components";
import { useTheme } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { axios } from "configs";

const defaultValues = {
  title: "",
  content: "",
  parentCategoryId: 0,
};

const FormCompanyDescription = ({
  value,
  onSubmitProp,
  onReset = false,
  isNotEdit = false,
}) => {
  const theme = useTheme();

  const [parentCategory, setParentCategory] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const { handleSubmit, reset, setValue, register, formState } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const { errors } = formState;

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("v3/parent");
        setParentCategory(data.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    if (value) {
      setValue("title", value?.title);
      setValue("content", value?.content);
      setValue("parentCategoryId", value?.parentCategoryId);

      setSelectedValue(value?.parentCategoryId);
    }
  }, [value]);

  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = (data) => {
    try {
      onSubmitProp(data);

      onReset && resetForm();
    } catch (error) {
      throw error;
    }
  };

  const resetForm = () => {
    reset();
    setSelectedValue("");
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
          {parentCategory.length > 0 && (
            <TextField
              select
              fullWidth
              label="Parent category"
              value={selectedValue}
              onChange={handleChangeSelect}
              inputProps={register("parentCategoryId", {
                required: {
                  value: true,
                  message: "Parent category is require",
                },
              })}
              InputProps={{
                readOnly: !isNotEdit ? false : true,
              }}
              error={errors.parentCategoryId}
              helperText={errors.parentCategoryId?.message}
              SelectProps={{
                MenuProps: {
                  sx: { maxHeight: "50%" },
                },
              }}
            >
              {parentCategory.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Title"
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

          <TextField
            label="Content"
            type="text"
            InputProps={{
              readOnly: !isNotEdit ? false : true,
            }}
            multiline
            rows={18}
            {...register("content", {
              required: {
                value: true,
                message: "Content is require",
              },
            })}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          {!isNotEdit ? (
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Submit
            </Button>
          ) : null}
        </Stack>
      </form>
    </Box>
  );
};

export default FormCompanyDescription;
