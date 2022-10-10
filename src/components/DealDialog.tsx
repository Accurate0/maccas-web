import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import moment from "moment";
import { TIME_OFFSET } from "../config/time";
import useNotification from "../hooks/useNotification";

export interface DealDialogProps {
  onClose: () => void;
  open: boolean;
  title?: string;
  validFromUTC?: string;
  validToUTC?: string;
  name?: string;
  uuid?: string;
}

const DealDialog: React.FC<DealDialogProps> = ({
  open,
  onClose,
  title,
  validFromUTC,
  validToUTC,
  name,
  uuid,
}) => {
  const notification = useNotification();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
            <DialogContentText>
              Valid From: {moment.utc(validFromUTC).local().add(TIME_OFFSET, "hours").format("LLL")}
            </DialogContentText>
            <DialogContentText>
              Valid To: {moment.utc(validToUTC).local().add(TIME_OFFSET, "hours").format("LLL")}
            </DialogContentText>
            <DialogContentText>
              <Grid container spacing={2}>
                <Grid item>UUID: {uuid}</Grid>
                <Grid item>
                  <IconButton
                    color="info"
                    size="small"
                    style={{ width: "5px", padding: 0 }}
                    onClick={() => {
                      navigator.clipboard.writeText(uuid ?? "");
                      notification({ variant: "info", msg: "Copied" });
                    }}
                  >
                    <FontAwesomeIcon icon={faClipboard} size="lg" />
                  </IconButton>
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
