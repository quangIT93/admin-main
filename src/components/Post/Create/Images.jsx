import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  ImageList,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { CloseIcon } from "components/Icons";

const CreatePostImages = ({ images, handleRemoveImage, onClickImage }) => {
  const theme = useTheme();
  const ixsobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ImageList
      variant="masonry"
      sx={{ width: "100%", height: 240, mt: "2rem" }}
      cols={ixsobile ? 2 : 4}
      rowHeight={200}
      gap={16}
    >
      {images.map((image, index) => (
        <ImageListItem key={image.preview}>
          <img
            src={image.preview}
            alt=""
            loading="lazy"
            onClick={() => onClickImage(image, index)}
          />
          <ImageListItemBar
            sx={{ background: "transparent" }}
            position="top"
            actionIcon={
              <IconButton
                sx={{
                  color: "#eeeeee",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.4) 100%)",
                  margin: "8px 8px 0 0 ",
                }}
                onClick={() => handleRemoveImage(image)}
              >
                <CloseIcon />
              </IconButton>
            }
            actionPosition="right"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default CreatePostImages;
