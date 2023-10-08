import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import LocationSelection from "./LocationSelection";

interface LocationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LocationModal = ({ open, setOpen }: LocationModalProps) => {
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <ModalDialog size="sm">
        <ModalClose />
        <LocationSelection onDone={() => setOpen(false)} />
      </ModalDialog>
    </Modal>
  );
};

export default LocationModal;
