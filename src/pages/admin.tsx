import Head from "next/head";
import "@stoplight/elements/styles.min.css";
import useLockedDeals from "../hooks/useLockedDeals";
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import { theme } from "../theme";
import { useState } from "react";

const Admin = () => {
  const [uuidToLock, setUuidToLock] = useState<string>("");
  const { lockedDeals, unlockDeal, lockDeal } = useLockedDeals();

  return (
    <div style={{ paddingTop: "3vh" }}>
      <Head>
        <title>Maccas | Admin</title>
      </Head>
      <Grid
        paddingTop={8}
        paddingBottom={2}
        spacing={1}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>UUID to lock: </Grid>
            <Grid item>
              <TextField value={uuidToLock} onChange={(e) => setUuidToLock(e.target.value)} />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => lockDeal(uuidToLock)}>
                Lock
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ background: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell>Deal</TableCell>
                  <TableCell align="center">UUID</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lockedDeals?.map((o) => (
                  <TableRow
                    key={o.shortName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {o.name}
                    </TableCell>
                    <TableCell align="center">{o.dealUuid}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => unlockDeal(o.dealUuid)}
                      >
                        Unlock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
