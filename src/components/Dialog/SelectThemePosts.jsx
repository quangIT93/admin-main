import React,{ useState, memo } from "react";
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
  let { districts } = props;

  const [isActive, setIsActive] = React.useState(false);

  console.log("Just loaded the Dropdown compo");

  console.log("districts props :>> ", districts);

  districts.forEach(item => {
    console.log("typeof item :>> ", typeof item);
    console.log("item :>> ", item);
  })

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className="dropdown__btn"
      >
        <span>Choose one</span>
        {isActive ? (
          <IoMdArrowDropup size={20} />
        ) : (
          <IoMdArrowDropdown size={20} />
        )}
      </button>
      {isActive && (
        <div className="dropdown__content">
          {districts
            ? districts.map((district) => (
                <divk className="dropdown-content__item">
                  {district.district}
                </divk>
              ))
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
    const getLocations = async () => {
      console.log("getLocaitons");
      const location = await fetchAllLocations();
      setLocation(location);
      let districtsLocalScope = [];
      location.forEach((location) => {
        districtsLocalScope.push(location.districts);
      });
      setDistricts(districtsLocalScope);
    };
    getLocations();
    // console.log("locaitons :>> ", location);
    // console.log("locaitons length :>> ", location.length);
    // console.log("districts :>> ", districts);
  }, []);

  console.log("SearchByLocation compo just loaded");

  return (
    <div className="search-by-location">
      <button>Tìm kiếm bằng địa điểm</button>
      <div className="location__dropdown">
        <h2>Dropdown</h2>
        <Dropdown districts={districts} />
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
