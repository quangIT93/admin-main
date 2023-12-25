import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "components";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { useForm } from "react-hook-form";
import { axios } from "configs";

const defaultValues = {
  title: "",
  content: "",
  childCategoryId: 0,
};

const FormJobDescription = ({
  value,
  onSubmitProp,
  onReset = false,
  isNotEdit = false,
}) => {
  const theme = useTheme();

  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const { handleSubmit, reset, setValue, register, formState } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const { errors } = formState;

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("v1/categories");
        setCategories(data.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    if (value) {
      setValue("title", value.title);
      setValue("content", value.content);
      setValue("childCategoryId", value.childCategoryId);

      setSelectedValue(value.childCategoryId);
    }
  }, [value]);

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

  const handleChangeSelect = (event) => {
    if (event.target.value !== undefined) {
      setSelectedValue(event.target.value);
    }
  };

  const renderSelectGroup = (product) => {
    const items = product.childs.map((p) => {
      return (
        <MenuItem key={p.id} value={p.id}>
          {p.name}
        </MenuItem>
      );
    });
    return [<ListSubheader>{product.parent_category}</ListSubheader>, items];
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
          {categories.length > 0 ? (
            <TextField
              select
              fullWidth
              label="Child category"
              value={selectedValue}
              onChange={handleChangeSelect}
              inputProps={register("childCategoryId", {
                required: {
                  value: true,
                  message: "Child category is require",
                },
              })}
              InputProps={{
                readOnly: !isNotEdit ? false : true,
              }}
              error={errors.childCategoryId}
              helperText={errors.childCategoryId?.message}
              SelectProps={{
                MenuProps: {
                  sx: {
                    maxHeight: "50%",
                  },
                },
              }}
            >
              {categories.map((category) => renderSelectGroup(category))}
            </TextField>
          ) : (
            <Skeleton variant="rounded" width="100%" height={60} />
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

export default FormJobDescription;
