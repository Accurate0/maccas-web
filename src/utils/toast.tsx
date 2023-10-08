import WarningIcon from "@mui/icons-material/Warning";
import { toast } from "sonner";

const enhancedToast = toast as typeof toast & { warn: (typeof toast)["message"] };
enhancedToast.warn = (message, data) =>
  toast(message, {
    ...data,
    className: "sonner-toast-warn",
    icon: <WarningIcon />,
  });

export { enhancedToast as toast };
