import LocationSelection from "./LocationSelection";
import { DialogContent, Dialog } from "@mui/material";

interface LocationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LocationModal = ({ open, setOpen }: LocationModalProps) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent>
        <LocationSelection onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
