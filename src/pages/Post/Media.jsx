import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";

import { mediaListColumns } from "configs/table";

import { Table, ThemePosts, PendingPosts } from "components";
import { ArrowLeft } from "components/Icons";
const Media = () => {
  const [checkData, setCheckData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSearch, setDataSearch] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 11111,
      status: 0,
      account_id: "35c7e791-8170-4570-9bea-446586eab8bc",
      title: "test update post",
      company_name: "1 mình",
      created_at: 1704352828000,
      update_at: 1704352828000,
      link_tiktok:
        "https://developers.tiktok.com/doc/content-posting-api-get-started/",
      link_youtube:
        "https://developers.tiktok.com/doc/content-posting-api-get-started/",
    },
    {
      id: 22222,
      status: 1,
      account_id: "35c7e791-8170-4570-9bea-446586eab8bc",
      title: "test update post",
      company_name: "1 mình",
      created_at: 1704352828000,
      update_at: 1704352828000,
      link_tiktok:
        "https://developers.tiktok.com/doc/content-posting-api-get-started/",
      link_youtube:
        "https://developers.tiktok.com/doc/content-posting-api-get-started/",
    },
  ]);
  const role = localStorage.getItem("role");
  const theme = useTheme();

  const handleOnchangeLimit = (limit) => {
    console.log("limit", limit);
  };
  const handleSearchFilterParent = async (search) => {
    console.log("search", search);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
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
        <Box>
          <Link to="/admin/posts/create">
            <Button variant="outlined">Tạo video</Button>
          </Link>
        </Box>
      </Box>
      <Table
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
      />
    </Box>
  );
};

export default Media;
