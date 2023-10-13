import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TablePointLog from "components/Table/TablePointLog";
import pointLogListColumns from "configs/table/pointLogListColumn";
import InfoUserLog from "./InfoUserLog/InfoUserLog";
import PointTypeButtons from "./PointTypeButtons";

const UserPointDetail = () => {
  const { id } = useParams();
  const theme = useTheme();

  const [pointLogs, setPointLogs] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const dataPointLog = await axios.get(
          `http://localhost:8000/api/v3/user-points/by-admin/${id}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTY5NzE2OTYwMSwiZXhwIjoxNzAwNzY5NjAxfQ.mLgJZq1BAbvInN1LF9VSuw_L7i53N1RWMxwga4WtuKw`,
            },
          }
        );
        setPointLogs(dataPointLog.data);
        console.log(pointLogs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, checked]);

  const handleTakePoint = async (point) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v3/user-points/by-admin/${id}`,
        { point },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTY5NzE2OTYwMSwiZXhwIjoxNzAwNzY5NjAxfQ.mLgJZq1BAbvInN1LF9VSuw_L7i53N1RWMxwga4WtuKw`,
          },
        }
      );
      setChecked(!checked);
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(pointLogs).length === 0) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          height: "100%",
        }}
        color={theme.palette.color.main}
      >
        <InfoUserLog
          profile={pointLogs.user.profile}
          totalPoint={pointLogs.totalPoint}
          typeUser={pointLogs.user.type}
        />
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ width: "30%" }}>
            <PointTypeButtons
              onTakePoint={handleTakePoint}
              userType={pointLogs.user.type}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: `calc(100vh - ${theme.height.navbar} - 13rem)`,
            }}
          >
            <TablePointLog
              rows={pointLogs.user.userLogs}
              columns={pointLogListColumns}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserPointDetail;
