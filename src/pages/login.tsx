import { TextField, Button, Paper, Box } from "@mui/material";
import { FormEvent, useState } from "react";
import { useUnauthenticatedApiClient } from "../hooks/useApiClient/useApiClient";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router";
import useSetBackdrop from "../hooks/useSetBackdrop";
import useNotification from "../hooks/useNotification";
import { AxiosError } from "axios";

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

    if (username == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (username && password) {
      try {
        setBackdrop(true);
        const response = await apiClient.login({ username, password });
        setState(response.result);
        navigate("/");
      } catch (error) {
        notification({ msg: (error as AxiosError).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ padding: 2 }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <TextField
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={username}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
