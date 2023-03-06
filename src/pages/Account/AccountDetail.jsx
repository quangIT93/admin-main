import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { UserDetail } from "components";
import { usePermission } from "hooks";

const AccountDetailPage = () => {
  usePermission();

  const theme = useTheme();

  // GET ACCOUNT ID AND ROLE
  const { id } = useParams();

  return (
    <>
      <Typography variant="h2" p="2rem 0" color={theme.palette.color.main}>
        Chi tiết tài khoản
      </Typography>
      <>
        <UserDetail accountId={id} />
      </>
    </>
  );
};

export default AccountDetailPage;
