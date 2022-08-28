import { useEffect, useState } from "react";
import { ApiException, OfferDatabase } from "./useApiClient/ApiClient.generated";
import useApiClient from "./useApiClient/useApiClient";
import useNotification from "./useNotification";
import useSetBackdrop from "./useSetBackdrop";

const useLockedDeals = () => {
  const [state, setState] = useState<OfferDatabase[] | undefined>();
  const apiClient = useApiClient();
  const setBackdrop = useSetBackdrop();
  const notification = useNotification();

  useEffect(() => {
    const get = async () => {
      try {
        setBackdrop(true);
        const response = await apiClient.get_locked_deals();
        const offers = await Promise.allSettled(response.result.map((o) => apiClient.get_deal(o)));

        const lockedOffers = offers
          .map((f) => {
            if (f.status === "fulfilled") {
              return f.value.result;
            }
            return null;
          })
          .filter((f) => f !== null) as OfferDatabase[];

        setState(lockedOffers);
      } catch (error) {
        notification({ msg: (error as ApiException).message, variant: "error" });
      } finally {
        setBackdrop(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unlockDeal = async (dealId: string) => {
    try {
      setBackdrop(true);
      await apiClient.unlock_deal(dealId);
      const index = state?.findIndex((o) => o.dealUuid === dealId);
      if (index && index > -1) {
        state?.splice(index, 1);
        setState(state);
      }
    } catch (error) {
      notification({ msg: (error as ApiException).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const lockDeal = async (dealId: string) => {
    try {
      setBackdrop(true);
      await apiClient.lock_deal(dealId);
    } catch (error) {
      notification({ msg: (error as ApiException).message, variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  return { lockedDeals: state, unlockDeal, lockDeal };
};

export default useLockedDeals;
