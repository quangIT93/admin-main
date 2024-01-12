import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TableCustom from "components/Table/TableCustom";
import { mediaListColumns } from "configs/table";
import mediaApi from "api/mediaApi";

const Media = () => {
  const [medias, setMedias] = useState([]);

  // const role = localStorage.getItem("role");

  const theme = useTheme();
  useEffect(() => {
    (async () => {
      const data = await mediaApi.getPostMedias();

      if (data) {
        setMedias(data.data.data);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: `calc(100vh - ${theme.height.navbar} - 6rem)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.color.main,
            paddingBottom: "1rem",
          }}
        >
          Danh sách video
        </Typography>
        {/* <Box>
          <Link to="/admin/posts/createMedia">
            <Button variant="outlined">Tạo video</Button>
          </Link>
        </Box> */}
      </Box>
      {/* <Table
        // totalPages={totalPages}
        checkAutoFocus={true}
        checkSearch={checkSearch}
        handleOnchangeLimit={handleOnchangeLimit}
        handleSearchFilterParent={handleSearchFilterParent}
        checkData={checkData}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        rows={
          checkSearch === true
            ? dataSearch?.length > 0
              ? dataSearch
              : []
            : posts
        }
        columns={mediaListColumns}
        showCheckbox={false}
      /> */}

      <Box sx={{ height: "80vh" }}>
        <TableCustom rows={medias} columns={mediaListColumns} />
      </Box>
    </Box>
  );
};

export default Media;
