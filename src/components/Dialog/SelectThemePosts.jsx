import React, { useState, memo, Suspense } from "react";
import { axios } from "configs";
import {
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

  function Dropdown() {
    let autoSelectedProvince = "";
    let districtsGlobal = [];
    let wardsGlobal = [];
    const [isActive, setIsActive] = React.useState(false);
    const [provinces, setProvinces] = React.useState([]);
    const [selectedProvince, setSelectedProvince] = React.useState("");
    const [selectedDistrict, setSelectedDistrict] = React.useState("");
    const [selectedWard, setSelectedWard] = React.useState("");

    const handleOnChangeProvince = (e) => {
      setSelectedProvince(e.target.value);
    };

    const handleOnChangeDistrict = (e) => {
      setSelectedDistrict(e.target.value);
    };

    const handleOnChangeWard = (e) => {
      setSelectedWard(e.target.value);
    };

    const getLocation = async () => {
      const location = await fetchAllLocations();
      autoSelectedProvince = location[0].province_name;
      setProvinces(location);
      setSelectedProvince(autoSelectedProvince);
    };

    const getWardBasedOnFirstDistrict = (province) => {
      if (province) {
        const districts = province.districts;
        districtsGlobal = districts;

        // Get the wards based on the specific district
        const wards = districts[0].wards;
        wardsGlobal = wards;
      }
    };

    const getDistrictByProvinceName = () => {
      console.log("getDistrictByProvinceName");
      if (provinces) {
        const province = provinces.find(
          ({ province_name }) => province_name === selectedProvince
        );

        getWardBasedOnFirstDistrict(province);
      }
    };

    getDistrictByProvinceName();

    React.useEffect(() => {
      getLocation();
    }, []);

    return (
      <div className="dropdown">
        <div className="dropdown__item">
          <div>Tỉnh/Thành phố</div>
          <select
            className="select-container"
            value={selectedProvince}
            onChange={handleOnChangeProvince}
          >
            {provinces
              ? provinces.map((province) => (
                  <option
                    className="select-container__item"
                    key={province.province_id}
                  >
                    {province.province_name}
                  </option>
                ))
              : undefined}
          </select>
        </div>
        <div className="dropdown__item">
          <div>Quận/Huyện</div>
          <select value={selectedDistrict} onChange={handleOnChangeDistrict}>
            {districtsGlobal
              ? districtsGlobal.map((district) => (
                  <option>{district.district}</option>
                ))
              : undefined}
          </select>
        </div>
        <div className="dropdown__item">
          <div>Phường/Xã</div>
          <select value={selectedWard} onChange={handleOnChangeWard}>
            {wardsGlobal
              ? wardsGlobal.map((ward) => <option>{ward.full_name}</option>)
              : undefined}
          </select>
        </div>
        <div>
          <div>Phường/Xã</div>
          <input type="text" />
        </div>
      </div>
    );
  }

  function SearchByLocation() {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className="search-by-location">
        <button onClick={() => setIsActive((prev) => !prev)}>
          Tìm kiếm bằng địa điểm
        </button>
        <div className="location__dropdown">{isActive && <Dropdown />}</div>
      </div>
    );
  }

  React.useEffect(() => {
    setPostIdsSelection(postsOfTheme.map((post) => post.id));
  }, [postsOfTheme]);

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <div className="select-post">
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
