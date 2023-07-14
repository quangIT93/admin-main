import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/system";
import { Button, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Table } from "components";
import { workerColumns } from "configs/table";
import { axios } from "configs";
import { usePermission } from "hooks";

const WorkerManager = () => {
  usePermission();
  const theme = useTheme();
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkData, setCheckData] = useState(false);


  const fetchWorkers = async () => {
    const res = await axios.get(`/v1/accounts?role=2&page=${currentPage}&limit=20`);
    // console.log("res:", res.data);
    setWorkers(res.data);
    setCheckData(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, [currentPage]);


  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      {isLoading ? (
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : (
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
              Danh sách nhân viên đăng bài
            </Typography>

            <Box>
              <Link to="/admin/posts/create">
                <Button variant="outlined">Tạo bài đăng</Button>
              </Link>
            </Box>
          </Box>

          <Table 
            rows={workers} 
            checkData={checkData}
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            columns={workerColumns} 
            showCheckbox={false} 
          />
        </Box>
      )}
    </>
  );
};

export default WorkerManager;
