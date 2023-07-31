import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button, Skeleton, Typography, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { axios } from "configs";
import { usePermission } from "hooks";
import categoryChildColumns from "configs/table/categoryChildColumns";
import TableCategory from "../../components/Table/TableCategory"


const AllChildCategoryPage = () => {
  usePermission();

  const navigate = useNavigate();
  const params = useParams();

  const idParent = +params.id;
  const theme = useTheme();
  const [modifyLimit, setModifyLimit] = useState(10)
  const [checkData, setCheckData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [checkSearch, setCheckSearch] = useState(false);

  const fetchCategories = async () => {
    let res;

    res = await axios.get(`/v3/children/by-parent/${idParent}`);
 
    setCategories(res.data);

    if (res?.data?.length > 0){
      setCheckData(true);
    }
    setIsLoadingCategories(false);
  };


  useEffect(() => {
    fetchCategories();
  }, [checkSearch]);


  const handleRefreshDelete = () => {
    setCheckSearch(!checkSearch)
  }

  return (
    <>
      {isLoadingCategories ? (
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
              Tất cả danh mục con
              </Typography>

          </Box>  
          <TableCategory 
            handleRefreshDelete={handleRefreshDelete}
            rows={categories} 
            columns={categoryChildColumns} 
            showCheckbox={false} 
          />
        </Box>
      )}
    </>
  );
};

export default AllChildCategoryPage;
