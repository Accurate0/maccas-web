import { FormEvent, useState } from "react";
import { useUnauthenticatedApiClient } from "../hooks/useApiClient/useApiClient";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router";
import useSetBackdrop from "../hooks/useSetBackdrop";
import useNotification from "../hooks/useNotification";
import { Box, Button, FormControl, FormLabel, Input, Sheet, Stack, Typography } from "@mui/joy";
import { ApiException } from "../hooks/useApiClient/ApiClient.generated";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const apiClient = useUnauthenticatedApiClient();
  const { setState } = useAuthentication();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const queryClient = useQueryClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (username === "") {
      setEmailError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }

    if (password !== "" && password.length < 6) {
      setPasswordError(true);
      notification({ msg: "Password must be at least 6 characters", variant: "error" });
      return;
    }

    if (username && password) {
      if (!token) {
        notification({ msg: "Invalid registration", variant: "error" });
        return;
      }

      try {
        setBackdrop(true);
        const response = await apiClient.register({ username, password, token });
        setState(response.result);
        queryClient.invalidateQueries({ queryKey: ["user-config"] });
        navigate("/");
      } catch (error) {
        notification({ msg: (error as ApiException).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Sheet sx={{ padding: "40px" }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography level="h3">Register</Typography>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={username}
                error={emailError}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                sx={{ mb: 3 }}
                value={password}
                error={passwordError}
                fullWidth
              />
            </FormControl>
            <Button color="primary" type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Box>
  );
};

export default Register;
