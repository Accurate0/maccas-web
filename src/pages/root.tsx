import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Container } from "@mui/material";

const Root = () => {
  const navigate = useNavigate();
  const { state } = useAuthentication();

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  }, [state, navigate]);

  return (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
