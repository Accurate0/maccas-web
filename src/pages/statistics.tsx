import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import useStatistics from "../hooks/useStatistics";
import { theme } from "../theme";

const Statistics = () => {
  const { totalAccounts, accounts } = useStatistics();

  return (
    <Grid
      paddingTop={8}
      paddingBottom={2}
      spacing={1}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Chip
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          label={`Total Accounts: ${totalAccounts?.toString()}`}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ background: theme.palette.primary.main }}>
              <TableRow>
                <TableCell>Account Name</TableCell>
                <TableCell align="right">Offer Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(accounts ?? {}).map(([accountName, count]) => (
                <TableRow
                  key={accountName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {accountName}
                  </TableCell>
                  <TableCell align="right">{count.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Statistics;
