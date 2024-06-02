import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../utils/apis";
import {
  Avatar,
  Box,
  Card,
  Container,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";

const ProfileContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: "600px",
  boxShadow: theme.shadows[5],
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  backgroundColor: deepPurple[500],
}));
export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi(),
  });
  return (
    <ProfileContainer maxWidth="md">
      <ProfileCard>
        {isLoading ? (
          <Skeleton variant="circular" width={120} height={120} />
        ) : (
          <ProfileAvatar alt="Profile Picture">
            <AccountBox />
          </ProfileAvatar>
        )}
        <ProfileDetails>
          <Typography variant="h4">{data?.data.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {data?.data.email}
          </Typography>
        </ProfileDetails>
      </ProfileCard>
    </ProfileContainer>
  );
}
