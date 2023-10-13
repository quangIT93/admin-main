import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Avatar } from "@mui/material";

const InfoUserLog = ({ profile, totalPoint, typeUser }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0.5rem 0 1.5rem",
      }}
      color={theme.palette.color.main}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, marginRight: "0.5rem" }}
          />
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Id</Typography>
            <Typography>{profile.accountId}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Email</Typography>
            <Typography>{profile.email}s</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Name</Typography>
            <Typography>{profile.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Giới tính</Typography>
            <Typography>{profile.gender}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Loại</Typography>
            <Typography>
              {typeUser === 0 ? "Candidate" : "Recruiter"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1vw",
        }}
      >
        <Typography variant="h2" sx={{ marginRight: "1em" }}>
          Tổng Điểm
        </Typography>
        <Typography variant="h2">{totalPoint}</Typography>
      </Box>
    </Box>
  );
};

export default InfoUserLog;
