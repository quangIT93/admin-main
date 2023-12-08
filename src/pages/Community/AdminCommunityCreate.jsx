import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import { axios } from "configs";
import { ConfirmDialog, CreatePostImages } from "components";
import { validatePostImages } from "validations";
import { usePermission } from "hooks";
import CreateCommunityInformations from "components/Community/Create/information";
import createCommunityValidation from "validations/Community/create";
// import { TextField } from "components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#0a1929",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
};

const initCommunity = {
  title: "",
  content: "",
};

const AdminCommunityCreatePage = () => {
  usePermission();

  const navigate = useNavigate();
  const theme = useTheme();

  const [community, setCommunity] = useState(initCommunity);

  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);
  const [images, setImages] = useState([]);

  // add description image
  const [arrDescriptions, setArrDescriptions] = useState([]);
  const [description, setDescription] = useState();
  const [indexImage, setIndexImage] = useState();
  const [openModelDescription, setOpenModelDescription] = useState(false);

  // Handle on change images
  const handleOnChangeImages = async (e) => {
    const imagesUpload = Array.from(e.target.files);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 840,
    };

    const imagesToCheck =
      images.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - images.length)
        : imagesUpload;

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck);
      if (validateImagesReply.isError) {
        console.log("::: Invalid images");
        return toast.warn("Ảnh không đúng định dạng");
      } else {
        try {
          const compressedImages = [];
          await Promise.all(
            imagesToCheck.map(async (image) => {
              const compressedImage = await imageCompression(image, options);
              compressedImages.push(
                new File([compressedImage], compressedImage.name, {
                  type: compressedImage.type,
                })
              );
            })
          );

          setImages((prevState) => [
            ...prevState,
            ...compressedImages.map((image) => ({
              image,
              preview: window.URL.createObjectURL(image),
            })),
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  console.log(arrDescriptions);
  // Handle remove image
  const handleRemoveImage = (image) => {
    handleIndexImage(images.indexOf(image));
    setImages((prevState) =>
      prevState.filter((prevImage) => prevImage.preview !== image.preview)
    );
  };

  const OnShowModelImage = (_, index) => {
    setOpenModelDescription(!openModelDescription);
    const findDescription = arrDescriptions.find(
      (item) => item.indexImage === index
    );
    if (findDescription) {
      setDescription(findDescription.description);
    } else {
      setDescription(null);
    }
    index && setIndexImage(null);
    // setDescription(description.description)
    if (!isNaN(index)) {
      setIndexImage(index);
    }
  };
  // Handle add description
  const handleAddDescription = () => {
    const objDescription = {
      indexImage,
      description,
    };
    setArrDescriptions([...arrDescriptions, objDescription]);
    setOpenModelDescription(!openModelDescription);
  };

  const handleIndexImage = (indexImage) => {
    const deleteDescription = arrDescriptions.filter(
      (item) => item.indexImage !== indexImage
    );
    const newArrDescription = deleteDescription.map((item) => {
      if (item.indexImage > indexImage) {
        return { ...item, indexImage: item.indexImage - 1 };
      }
      return item;
    });
    setArrDescriptions(newArrDescription);
  };

  // Handle submit create post
  const handleOnCreateCommunity = async () => {
    setIsShowConfirmDialog(false);

    const createCommunityValidationReply = createCommunityValidation(community);
    if (createCommunityValidationReply.isError) {
      return toast.warn(createCommunityValidationReply.message);
    }
    console.log(community);
    const communitySubmit = new FormData();
    communitySubmit.append("title", community.title.trim());
    communitySubmit.append("content", community.content);

    images.forEach((image) => communitySubmit.append("images", image.image));

    // add description image
    const descriptions = images.map((_, index) => {
      const i = arrDescriptions.findIndex((item) => item.indexImage === index);
      if (i !== -1) {
        return arrDescriptions[i].description;
      }
      return null;
    });
    console.log(descriptions);
    let toastId = toast.loading("Please wait...");

    // Fetch api
    try {
      // await axios.post("/v3/communications/by-admin", communitySubmit, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      setCommunity(initCommunity);
      images.forEach((image) => window.URL.revokeObjectURL(image));
      setImages([]);

      setDescription(null);
      setIndexImage(null);
      setArrDescriptions([]);

      return toast.update(toastId, {
        render: "Tạo bài đăng thành công",
        type: toast.TYPE.SUCCESS,
        closeButton: true,
        closeOnClick: true,
        autoClose: 4000,
        isLoading: false,
      });
    } catch (error) {
      console.log("Create post error ::: ", error);
      if (error.response && error.response.status === 401) {
        return navigate("/admin/auth");
      }
      return toast.update(toastId, {
        render: "Tạo bài đăng thất bại",
        type: toast.TYPE.ERROR,
        closeButton: true,
        closeOnClick: true,
        autoClose: 4000,
        isLoading: false,
      });
    }
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2" color={theme.palette.color.main}>
          Tạo bài đăng
        </Typography>
        {/* <Link to="/admin/worker-manager/detail?own=true">
          <Button variant="outlined">Bài đã đăng</Button>
        </Link> */}
      </Box>

      <Box>
        {/* BASIC INFORMATION */}
        <Box sx={{ flexGrow: 1, padding: "2rem 0" }}>
          <CreateCommunityInformations
            community={community}
            setCommunity={setCommunity}
          />
        </Box>

        {/* Images */}
        <Box p="2rem 0">
          <Typography mb="1rem" variant="h3" color={theme.palette.color.main}>
            Hình ảnh
          </Typography>
          <Typography variant="p" color={theme.palette.color.main}>
            Có thể tải tối đa 5 ảnh, mỗi ảnh không quá 10MB. (Định dạng cho
            phép: jpeg, jpg, png)
          </Typography>
          <Box mt="2rem">
            <Button
              variant="outlined"
              component="label"
              disabled={images.length === 5}
            >
              Tải ảnh
              <input
                type="file"
                name="images"
                hidden
                accept="image/*"
                onChange={(e) => handleOnChangeImages(e)}
                multiple
              />
            </Button>
          </Box>
          {/* Modal Image */}
          <Box>
            <Modal
              open={openModelDescription}
              onClose={OnShowModelImage}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} style={{ textAlign: "center" }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Mô tả ảnh"
                  fullWidth
                  multiline
                  maxRows={3}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description ? description : ""}
                />
                <Button
                  variant="outlined"
                  component="label"
                  style={{ marginTop: 20, textAlign: "center" }}
                  onClick={handleAddDescription}
                >
                  Thêm mô tả
                </Button>
              </Box>
            </Modal>
          </Box>
          ;
          <Box>
            <CreatePostImages
              images={images}
              handleRemoveImage={handleRemoveImage}
              onClickImage={OnShowModelImage}
            />
          </Box>
        </Box>

        {/* SUBMIT BUTTON */}
        <Button
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          onClick={() => setIsShowConfirmDialog(true)}
        >
          Tạo
        </Button>

        {/* DIALOG */}
        <ConfirmDialog
          isOpen={isShowConfirmDialog}
          onClose={() => setIsShowConfirmDialog(false)}
          onClickConfirm={handleOnCreateCommunity}
          title="Tạo bài đăng"
          text="Hãy kiểm tra thật kỹ thông tin trước khi nhấn nút Đồng ý"
        />
      </Box>
    </Box>
  );
};

export default AdminCommunityCreatePage;
