import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import TablePoint from "components/Table/TablePoint";
import pointListColumns from "configs/table/pointListColumns";
import { useEffect, useState } from "react";
const UserPoint = () => {
  const theme = useTheme();

  const [userPoints, setUserPoint] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        "http://localhost:8000/api/v3/user-points/by-admin",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTY5NzE2OTYwMSwiZXhwIjoxNzAwNzY5NjAxfQ.mLgJZq1BAbvInN1LF9VSuw_L7i53N1RWMxwga4WtuKw`,
          },
        }
      );
      setUserPoint(data.data.data);
    })();
  }, []);
  if (userPoints.length === 0) {
    return;
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: `calc(100vh - ${theme.height.navbar} - 6rem)`,
        }}
      >
        <Typography
          variant="h2"
          sx={{ paddingBottom: "1rem" }}
          color={theme.palette.color.main}
        >
          Danh sách điểm
        </Typography>

        <TablePoint rows={userPoints} columns={pointListColumns} />
      </Box>
    </>
  );
};

export default UserPoint;
