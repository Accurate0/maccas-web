import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import usePoints from "../../hooks/usePoints";
import { theme } from "../../styles";
import { AccountPointMap } from "../../types/AccountPointMap";

export interface PointsProps {}

const Points: React.FC<PointsProps> = () => {
  const { points } = usePoints();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Maccas | Points</title>
      </Head>
      <Grid paddingTop={8} paddingBottom={2} spacing={1} container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ background: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell align="center">Points</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {points?.map((p: AccountPointMap) => (
                  <TableRow key={p.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {p.name}
                    </TableCell>
                    <TableCell align="center">{p.totalPoints.toString()}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="secondary" onClick={() => router.push(`/points/${p.name}`)}>
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Points;
