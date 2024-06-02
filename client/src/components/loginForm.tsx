import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { LoginSchema, LoginSchemaType } from "../validations/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginApi } from "../utils/apis";
import { DevTool } from "@hookform/devtools";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
export default function LoginForm() {
  const { login, isLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const accessToken = data.data.accessToken;
      login(accessToken);
    }
  });
  const onSubmit: SubmitHandler<LoginSchemaType> = async (formData) => {
    await mutateAsync(formData).catch((err) => {
      setError("root", { message: err.response?.data?.message || err.message });
    });
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {errors.root && <p>{errors.root.message}</p>}
      </Container>
      <DevTool control={control} />
    </>
  );
}
