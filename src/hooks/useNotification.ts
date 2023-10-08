import { useEffect, useState } from "react";
import { toast } from "../utils/toast";

export type VariantType = "default" | "error" | "success" | "warning" | "info";

interface NotificationConf {
  msg?: string;
  variant?: VariantType;
}

const useNotification = () => {
  const [conf, setConf] = useState<NotificationConf>({});

  useEffect(() => {
    if (conf?.msg) {
      switch (conf?.variant) {
        case "info":
        case "default":
          toast.message(conf.msg);
          break;
        case "error":
          toast.error(conf.msg);
          break;
        case "success":
          toast.success(conf.msg);
          break;
        case "warning":
          toast.warn(conf.msg);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conf]);
  return setConf;
};

export default useNotification;
