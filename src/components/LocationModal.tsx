import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import LocationSelection from "../pages/location";

interface LocationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LocationModal = ({ open, setOpen }: LocationModalProps) => {
  return (
    <Modal onClose={() => setOpen(false)} keepMounted open={open}>
      <ModalDialog size="sm">
        <ModalClose />
        <LocationSelection onDone={() => setOpen(false)} />
      </ModalDialog>
    </Modal>
  );
};

export default LocationModal;
