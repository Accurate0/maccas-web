import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import moment from "moment";

export interface DealDialogProps {
  onClose: () => void;
  open: boolean;
  title?: string;
  validFromUTC?: string;
  validToUTC?: string;
  name?: string;
  uuid?: string;
  creationDateUtc?: string;
}

const DealDialog: React.FC<DealDialogProps> = ({
  open,
  onClose,
  title,
  validFromUTC,
  validToUTC,
  name,
  creationDateUtc,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
            <DialogContentText>
              Valid From: {moment.utc(validFromUTC).local().add(2, "hours").format("LLL")}
            </DialogContentText>
            <DialogContentText>
              Valid To: {moment.utc(validToUTC).local().add(2, "hours").format("LLL")}
            </DialogContentText>
            <DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Added: {new Date(creationDateUtc ?? 0).toLocaleDateString()}
                </Grid>
              </Grid>
            </DialogContentText>
          </Grid>
          <Grid item>
            <DialogContentText>{name}</DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DealDialog;
