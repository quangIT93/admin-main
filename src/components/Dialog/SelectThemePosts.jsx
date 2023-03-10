import React, { useState, memo } from "react";
import { axios } from "configs";
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Table, Dialog } from "components";
import { postListColumns } from "configs/table";
import { fetchAllLocations } from "#api";
import "./SelectThemePosts";

// const obj = {
//   name: "James",
//   country: "Chile",
// };

// console.log(typeof Object.keys(obj));
// console.log(Object.keys(obj));

// Object.keys(obj).forEach((key) => {
//   console.log("key :>> ", key);
//   console.log("object[key] :>> ", obj[key]);
// });

// ⛔️ TypeError: object.forEach is not a function
// obj.forEach((element) => {
//   console.log(element);
// });

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

  const InitProvince = {
    province_id: "",
    province_Fullname: "",
    province_name: "",
  };

  function Dropdown(props) {
    let { districts, location } = props;
    const [isActive, setIsActive] = React.useState(false);
    const [provinces, setProvinces] = React.useState();

    const getProvinces = () => {
      console.log("getProvinces");
      let provinces = [];
      // Object to arrays of keys
      Object.keys(location).forEach((key) => {
        // console.log("key :>> ", key);
        // console.log("Provinces name :>> ", location[key].province_name);
        const provinceInfo = {
          province_id: location[key].province_id,
          province_Fullname: location[key].province_Fullname,
          province_name: location[key].province_name,
        };
        console.log("province info :>> ", provinceInfo);
        provinces.push(provinceInfo);
        // setProvinces(provinces);
      });

      return provinces;
    };

    getProvinces();

    // React.useEffect(() => {
    //   getProvinces();
    // setProvinces(getProvinces);
    // console.log("provicne data :>> ", provinces);
    // }, []);

    console.log("Just laod the dropdown compo");

    return (
      <div className="dropdown">
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className="dropdown__btn"
        >
          <span>Tinh/Thanh Pho</span>
          {isActive ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <IoMdArrowDropdown size={20} />
          )}
        </button>
        {isActive && (
          <div className="dropdown__content">
            {provinces
              ? provinces.map((province) => <h1>Hello</h1>)
              : undefined}
          </div>
        )}
      </div>
    );
  }

  function SearchByLocation() {
    const [districts, setDistricts] = React.useState([{}]);
    const [location, setLocation] = React.useState([]);

    React.useEffect(() => {
      const getLocation = async () => {
        console.log("getLocaiton");
        const location = await fetchAllLocations();
        // setProvinces(location);
        setLocation(location);
        let districtsLocalScope = [];
        location.forEach((location) => {
          districtsLocalScope.push(location.districts);
        });
        setDistricts(districtsLocalScope);
      };

      getLocation();
    }, []);

    // console.log("provinces :>> ", provinces);
    // console.log("location :>> ", location);
    console.log("SearchByLocation compo just loaded");

    return (
      <div className="search-by-location">
        <button>Tìm kiếm bằng địa điểm</button>
        <div className="location__dropdown">
          <h2>Dropdown</h2>
          <Dropdown location={location} districts={districts} />
          {/* District */}
        </div>
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
