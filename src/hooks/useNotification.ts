import { useEffect, useState } from "react";
import { toast } from "../utils/toast";
import { ExternalToast } from "sonner";

export type VariantType = "default" | "error" | "success" | "warning" | "info";

interface NotificationConf {
  msg?: string;
  variant?: VariantType;
  config?: ExternalToast;
}

const useNotification = () => {
  const [conf, setConf] = useState<NotificationConf>({});

  useEffect(() => {
    if (conf?.msg) {
      switch (conf?.variant) {
        default:
        case "info":
        case "default":
          toast.message(conf.msg, { ...conf.config });
          break;
        case "error":
          toast.error(conf.msg, { ...conf.config });
          break;
        case "success":
          toast.success(conf.msg, { ...conf.config });
          break;
        case "warning":
          toast.warn(conf.msg, { ...conf.config });
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conf]);
  return setConf;
};

export default useNotification;
