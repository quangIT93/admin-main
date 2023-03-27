import React, { useState, memo } from "react";
import { styled } from "@mui/material/styles";
import { axios } from "configs";
import {
  Grid,
  Box,
  MenuItem,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Table, Dialog } from "components";
import { postListColumns } from "configs/table";
import { fetchAllLocations } from "#api";
import "./SelectThemePosts.scss";

const Item = styled(Box)(({ theme }) => ({
  textarea: {
    fontSize: "1rem",
  },
}));

const SelectThemePostsDialog = ({
  themeId,
  open,
  setOpen,
  allPosts,
  postsOfTheme,
  setPostsOfTheme,
}) => {
  const theme = useTheme();

  // POST SELECTION
  const [postIdsSelections, setPostIdsSelection] = useState([]);

  const handleOnSubmit = async () => {
    setOpen(false);

    const data = {
      themeId,
      postIds: postIdsSelections,
    };

    if (postIdsSelections.length > 0) {
      try {
        await axios.post("/themes/add-posts", data);
        setPostsOfTheme(
          allPosts.filter((post) => postIdsSelections.includes(post.id))
        );
        return toast.success("Add/Remove posts of theme successfully");
      } catch (error) {
        return toast.error("Add/Remove posts of theme failure");
      }
    }
  };

  function Dropdown(props) {
    const { locations } = props;
    console.log("locations :>> ", locations);
    const [selectedProvinceId, setSelectedProvinceId] = React.useState(-1);
    const [selectedDistrictId, setSelectedDistrictId] = React.useState();
    const [selectedWardId, setSelectedWardId] = React.useState(-1);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const handleOnChangeProvince = (e) => {
      const selectedProvinceId = e.target.value;
      setSelectedProvinceId(selectedProvinceId);
      const province = locations.find(
        (location) => location.province_id === selectedProvinceId
      );

      setDistricts(province.districts);
    };

    const handleOnChangeDistrict = (e) => {
      const selectedDistrictId = e.target.value;
      setSelectedDistrictId(selectedDistrictId);
      const district = districts.find(
        (district) => district.district_id === selectedDistrictId
      );

      if (district) {
        setWards(district.wards);
      }
    };

    const handleOnChangeWard = (e) => {
      const selectedWardId = e.target.value;
      setSelectedWardId(selectedWardId);
    };

    const handleClickSubmitFormSearchPost = (e) => {
      e.preventDefault();

      console.log("handleClickSubmitFormSearchPost ");
      console.log("selected province id :>> ", selectedProvinceId);
      console.log("selected district id :>> ", selectedDistrictId);
      console.log("selected ward id :>> ", selectedWardId);

      // API waiting for Hao finished the api
    };

    return (
      <Box>
        <Grid container xs={12} spacing={4}>
          <Grid item lg={4}>
            <TextField
              label="Tỉnh/Thành phố"
              variant="outlined"
              value={selectedProvinceId !== "" ? selectedProvinceId : ""}
              onChange={handleOnChangeProvince}
              fullWidth
              select
            >
              {locations.map((location) => (
                <MenuItem
                  key={location.province_id}
                  value={location.province_id}
                >
                  {location.province_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* District */}
          <Grid item lg={4}>
            <Item>
              <TextField
                label="Quận/Huyện"
                variant="outlined"
                value={selectedDistrictId !== "" ? selectedDistrictId : ""}
                onChange={handleOnChangeDistrict}
                fullWidth
                select
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district}
                  </MenuItem>
                ))}
              </TextField>
            </Item>
          </Grid>

          {/* Ward */}
          <Grid item lg={4}>
            <TextField
              label="Phường/Xã"
              variant="outlined"
              onChange={handleOnChangeWard}
              fullWidth
              select
            >
              {wards.map((ward) => (
                <MenuItem key={ward.id} value={ward.id}>
                  {ward.full_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          onClick={handleClickSubmitFormSearchPost}
          variant="contained"
          sx={{ marginTop: "12px" }}
        >
          Submit
        </Button>
      </Box>
    );
  }

  function SearchByLocation() {
    const [isActive, setIsActive] = React.useState(false);
    const [locations, setLocation] = React.useState([]);

    const getLocation = async () => {
      console.log("getLocaiton just be called");
      const location = await fetchAllLocations();
      setLocation(location);
    };

    React.useEffect(() => {
      getLocation();
    }, []);

    return (
      <div className="search-bylocation">
        <button
          className="location__button"
          onClick={() => setIsActive((prev) => !prev)}
        >
          Tìm kiếm bằng địa điểm
        </button>
        {isActive && (
          <div className="location__dropdown">
            <Dropdown locations={locations} />
          </div>
        )}
      </div>
    );
  }

  React.useEffect(() => {
    setPostIdsSelection(postsOfTheme.map((post) => post.id));
  }, [postsOfTheme]);

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: "1rem" }} className="">
          <DialogTitle variant="h4" sx={{ padding: "20px 24px" }}>
            Select posts
          </DialogTitle>
          <SearchByLocation />
        </div>

        <DialogContent
          sx={{
            padding: "0 !important",
            borderTop: theme.palette.border,
            borderBottom: theme.palette.border,
            height: `calc(100vh - ${theme.height.navbar} - 8rem)`,
            width: "100%",
          }}
        >
          <Table
            rows={allPosts}
            columns={postListColumns}
            showCheckbox={true}
            selectionModel={postIdsSelections}
            onSelectionModelChange={(newPostIdsSelections) => {
              setPostIdsSelection(newPostIdsSelections);
            }}
          />
        </DialogContent>

        <DialogActions sx={{ padding: "20px 24px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" size="small" onClick={handleOnSubmit}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(SelectThemePostsDialog);
