import { Dialog, DialogTitle, DialogContent, Grid, DialogContentText, DialogActions, Button } from "@mui/material";
import moment from "moment";

export interface DealDialogProps {
  onClose: () => void;
  open: boolean;
  title?: string;
  validFromUTC?: string;
  validToUTC?: string;
  name?: string;
}

const DealDialog: React.FC<DealDialogProps> = ({ open, onClose, title, validFromUTC, validToUTC, name }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
            <DialogContentText>Valid From: {moment.utc(validFromUTC).local().format("LLL")}</DialogContentText>
            <DialogContentText>Valid To: {moment.utc(validToUTC).local().format("LLL")}</DialogContentText>
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
