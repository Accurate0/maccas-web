import { FormEvent, useState } from "react";
import { useUnauthenticatedApiClient } from "../hooks/useApiClient/useApiClient";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router";
import useSetBackdrop from "../hooks/useSetBackdrop";
import useNotification from "../hooks/useNotification";
import { Box, Button, FormControl, FormLabel, Input, Sheet, Stack, Typography } from "@mui/joy";
import { ApiException } from "../hooks/useApiClient/ApiClient.generated";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const apiClient = useUnauthenticatedApiClient();
  const { setState } = useAuthentication();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

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

    if (username && password) {
      try {
        setBackdrop(true);
        const response = await apiClient.login({ username, password });
        setState(response.result);
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
            <Typography level="h3">Login</Typography>
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
                value={password}
                error={passwordError}
                fullWidth
                sx={{ mb: 3 }}
              />
            </FormControl>
            <Button color="primary" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Box>
  );
};

export default Login;
