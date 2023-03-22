import React, { useState, memo } from "react";
import { styled } from "@mui/material/styles";
import { axios } from "configs";
import {
  Grid,
  Box,
  MenuItem,
  TextField,
  FormControlLabel,
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
import { useSubmit } from "react-router-dom";

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

  // function Dropdown(props) {
  //   const { locations, wards, districts, setWards, setDistricts } = props;

  //   const handleOnChangeProvince = (e) => {
  //     const selectedProvinceName = e.target.value;
  //     const province = locations.find(
  //       (location) => location.province_name === selectedProvinceName
  //     );
  //     if (province) {
  //       // Reset the districts and wards based on the selected province
  //       setDistricts(province.districts);
  //       setWards(province.districts[0].wards);
  //     }
  //   };

  //   const handleOnChangeDistrict = (e) => {
  //     const selectedDistrict = e.target.value;
  //     const newDistrict = districts.find(
  //       (district) => district.district === selectedDistrict
  //     );
  //     const wards = newDistrict.wards;
  //     setWards(wards);
  //   };

  //   const handleOnChangeWard = (e) => {};

  //   React.useEffect(() => {
  //     setDistricts(locations[0].districts);
  //     setWards(locations[0].districts[0].wards);
  //   }, []);

  //   return (
  //     <div className="dropdown">
  //       <div className="dropdown__item">
  //         <div>Tỉnh/Thành phố</div>
  //         <select onChange={handleOnChangeProvince}>
  //           {locations
  //             ? locations.map((province) => (
  //                 <option key={province.province_id}>
  //                   {province.province_name}
  //                 </option>
  //               ))
  //             : undefined}
  //         </select>
  //         <div className="dropdown__item">
  //           <div>Quận/Huyện</div>
  //           <select onChange={handleOnChangeDistrict}>
  //             {districts
  //               ? districts.map((district) => (
  //                   <option key={district.district_id}>
  //                     {district.district}
  //                   </option>
  //                 ))
  //               : undefined}
  //           </select>
  //         </div>
  //         <div className="dropdown__item">
  //           <div>Phường/Xã</div>
  //           <select onChange={handleOnChangeWard}>
  //             {wards
  //               ? wards.map((ward) => (
  //                   <option key={ward.id}>{ward.full_name}</option>
  //                 ))
  //               : undefined}
  //           </select>
  //         </div>
  //       </div>
  //       <div className="dropdown__item">
  //         <div>Phường/Xã</div>
  //         <input type="text" />
  //       </div>
  //     </div>
  //   );
  // }

  function Dropdown(props) {
    const { locations, wards, districts, setWards, setDistricts } = props;
    const [provinceId, setProvinceId] = React.useState(-1);
    const [districtId, setDistrictId] = React.useState(-1);
    const [wardId, setWardId] = React.useState(-1);

    console.log("locations :>> ", locations);

    const handleOnChangeProvince = (e) => {
      setProvinceId((prev) => prev + 1);
      console.log("handleOnChangeProvince");
      const selectedProvinceId = e.target.value;
      console.log("selectedProvinceId :>> ", e.target.value);
      const province = locations.find(
        (location) => location.province_id === selectedProvinceId
      );

      if (province) {
        // Reset the districts and wards based on the selected province
        setDistricts(province.districts);
        setWards(province.districts[0].wards);
      }

      console.log("Province selected :>> ", province);
    };

    const handleOnChangeDistrict = (e) => {
      console.log("handleOnChangeDistrict");
      const selectedDistrictId = e.target.value;
      const newDistrict = districts.find(
        (district) => district.district_id === selectedDistrictId
      );
      const wards = newDistrict.wards;
      setWards(wards);
    };

    const handleOnChangeWard = (e) => {
      console.log("handleOnChangeWard");
      const selectedWardId = e.target.value;
      console.log("selectedWardId :>> ", selectedWardId);
      setWardId(selectedWardId);
    };

    React.useEffect(() => {
      setDistricts(locations[0].districts);
      setWards(locations[0].districts[0].wards);
    }, []);

    console.log("Dropdown just rendered");

    return (
      <Grid container xs={12} spacing={4}>
        <Grid item lg={4}>
          <TextField
            label="Tỉnh/Thành phố"
            variant="outlined"
            // onChange={() => console.log("On change text field")}
            // value={provinceId || ""}
            onChange={handleOnChangeProvince}
            fullWidth
            select
          >
            {locations.map((location) => (
              <MenuItem key={location.province_id} value={location.province_id}>
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
              // value={
              //   post.districtId ||
              //   (districts.length > 0 ? districts[0].district_id : "")
              // }
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
            // value="hello"
            // onChange={() => console.log("On change text field")}
            // value={post.provinceId || ""}
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
    );
  }

  function SearchByLocation() {
    const [isActive, setIsActive] = React.useState(false);
    const [locations, setLocation] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const getLocation = async () => {
      const location = await fetchAllLocations();
      setLocation(location);
      setDistricts([]);
      setWards([]);
    };

    console.log("Just rendered the SearchByLocation");

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
          <div style={{ width: "100%" }} className="location__dropdown">
            <Dropdown
              locations={locations}
              wards={wards}
              districts={districts}
              setWards={setWards}
              setDistricts={setDistricts}
            />
          </div>
        )}
      </div>
    );
  }

  // function SearchByLocation() {
  //   const [isActive, setIsActive] = React.useState(false);
  //   const [locations, setLocation] = React.useState([]);
  //   const [districts, setDistricts] = React.useState([]);
  //   const [wards, setWards] = React.useState([]);
  //   const getLocation = async () => {
  //     const location = await fetchAllLocations();
  //     setLocation(location);
  //     setDistricts([]);
  //     setWards([]);
  //   };

  //   React.useEffect(() => {
  //     getLocation();
  //   }, []);

  //   return (
  //     <div className="search-bylocation">
  //       <button
  //         className="location__button"
  //         onClick={() => setIsActive((prev) => !prev)}
  //       >
  //         Tìm kiếm bằng địa điểm
  //       </button>
  //       {isActive && (
  //         <div className="location__dropdown">
  //           <Dropdown
  //             locations={locations}
  //             wards={wards}
  //             districts={districts}
  //             setWards={setWards}
  //             setDistricts={setDistricts}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }
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
