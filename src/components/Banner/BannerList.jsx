import { useState, memo } from "react";
import {
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton,
    useMediaQuery,
    Button,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { EditBannerDialog } from "components";
import { CloseIcon, EditIcon } from "components/Icons";

const CssImageListItem = styled(ImageListItem)(({ theme }) => ({
    "&:hover > .MuiBox-root": {
        height: "100%",
        opacity: 1,
    },
    "&:hover > .MuiButton-outlined": {
        bottom: "50%",
        transform: "translate(-50%, 50%)",
        opacity: 1,
    },
    "& .MuiImageListItem-img": {
        height: "inherit",
    },
}));

const CssDetailButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    left: "50%",
    bottom: "0",
    transform: "translate(-50%, 0)",
    zIndex: 999,
    opacity: 0,
    transition: "all ease-in-out 0.24s",
}));

const Overlay = styled(Box)({
    position: "absolute",
    width: "100%",
    height: "0",
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    transition: "all ease-in-out 0.24s",
});

const BannerList = ({ banners, setBanners }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [bannerSelected, setBannerSelected] = useState();

    // HANDLE OPEN BANNER DETAIL DIALOG
    const handleOpenEditBannerDialog = (banner) => {
        setBannerSelected(banner);
        setOpenDetailDialog(true);
    };

    // HANDLE ON CLICK CLOSE BUTTON
    const handleOnClickCloseButton = (banner) => {
        setBanners((prevState) => {
            const newState = [...prevState];
            const index = newState.findIndex((item) => item.id === banner.id);
            newState[index].status = newState[index].status === 1 ? 0 : 1;
            return newState;
        });
    };

    return (
        <>
            <Box>
                <ImageList
                    sx={{
                        width: "100%",
                        height: 460,
                    }}
                    cols={isMobile ? 1 : 2}
                    rowHeight={200}
                    gap={16}
                >
                    {banners.map((banner) => (
                        <CssImageListItem key={banner.id}>
                            {/* DETAIL BUTTON */}
                            <CssDetailButton
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                    handleOpenEditBannerDialog(banner)
                                }
                            >
                                <EditIcon />
                            </CssDetailButton>

                            {/* OVERLAY */}
                            <Overlay />

                            {/* IMAGE */}
                            <img
                                width="100%"
                                height={200}
                                src={banner.image}
                                alt=""
                                loading="lazy"
                            />

                            {/* BAR */}
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
                                        onClick={() =>
                                            handleOnClickCloseButton(banner)
                                        }
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                                actionPosition="right"
                            />
                        </CssImageListItem>
                    ))}
                </ImageList>
            </Box>

            {/* BANNER DETAIL DIALOG */}
            {bannerSelected && (
                <EditBannerDialog
                    open={openDetailDialog}
                    setOpen={setOpenDetailDialog}
                    bannerSelected={bannerSelected}
                    setBannerSelected={setBannerSelected}
                    setBanners={setBanners}
                />
            )}
        </>
    );
};

export default memo(BannerList);
