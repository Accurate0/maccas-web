import { AccountPointMap } from "../../hooks/useApiClient/ApiClient.generated";
import useNotification from "../../hooks/useNotification";
import usePoints from "../../hooks/usePoints";
import { useGetUserConfig } from "../../hooks/useUserConfig";
import { useNavigate } from "react-router";
import { Button, Grid, Sheet, Table, Typography } from "@mui/joy";

export interface PointsProps {}

const Points: React.FC<PointsProps> = () => {
  const { points } = usePoints();
  const navigate = useNavigate();
  const notification = useNotification();
  const userConfig = useGetUserConfig();

  return (
    <>
      <Grid
        paddingTop={8}
        paddingBottom={2}
        spacing={1}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Sheet>
            <Table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <Typography level="h4">Points</Typography>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {points?.map((p: AccountPointMap) => (
                  <tr key={p.name}>
                    <td align="center">{p.totalPoints.toString()}</td>
                    <td align="center">
                      <Button
                        onClick={() => {
                          if (userConfig) {
                            navigate(`/points/${p.name}`);
                          } else {
                            notification({ variant: "error", msg: "A store must be selected." });
                            navigate("/location");
                          }
                        }}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Grid>
      </Grid>
    </>
  );
};

export default Points;
