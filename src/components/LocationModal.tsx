import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import LocationSelection from "../pages/location";

interface LocationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LocationModal = ({ open, setOpen }: LocationModalProps) => {
  return (
    <Modal onClose={() => setOpen(false)} keepMounted open={open}>
      <ModalDialog size="lg">
        <ModalClose />
        <LocationSelection />
      </ModalDialog>
    </Modal>
  );
};

export default LocationModal;
