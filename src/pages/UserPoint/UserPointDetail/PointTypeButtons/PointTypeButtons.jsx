import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PointTypeButtons = ({ onTakePoint, userType }) => {
  const theme = useTheme();

  const [pointType, setPointType] = useState([]);
  const type = userType === 0 ? "Candidate" : "Recruiter";

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/v3/point-types",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMThhOGJiLWUyMWUtNDBhMC05ZjQxLTQ5ZDY3NmRiOWY0YSIsInJvbGUiOjEsImlhdCI6MTY5NzE2OTYwMSwiZXhwIjoxNzAwNzY5NjAxfQ.mLgJZq1BAbvInN1LF9VSuw_L7i53N1RWMxwga4WtuKw`,
            },
          }
        );

        const dataPointTypes = data.data.data.filter((item) => {
          if (item.userTypeData === type) {
            return item;
          }
        });

        setPointType(dataPointTypes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (pointType.length === 0) {
    return;
  }

  return (
    <>
      <Box color={theme.palette.color.main}>
        {pointType.map((item) => (
          <Button
            variant="outlined"
            key={item.id}
            sx={{ margin: "0.5rem" }}
            onClick={() => onTakePoint(item.point)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default PointTypeButtons;
