import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useLocationSearch from "../hooks/useLocationSearch";
import { useUpdateUserConfig } from "../hooks/useUserConfig";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import useNotification from "../hooks/useNotification";
import useLocations from "../hooks/useLocations";
import { RestaurantInformation } from "../hooks/useApiClient/ApiClient.generated";

const options: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const LocationSelection = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<RestaurantInformation[]>([]);
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<boolean>();
  const { search } = useLocationSearch();
  const updateConfig = useUpdateUserConfig();
  const notification = useNotification();
  const { search: searchByPosition } = useLocations();

  const searchAndUpdate = async (text: string | undefined) => {
    const trimmedText = text?.trim();
    if (trimmedText) {
      const resp = await search(trimmedText);
      if (resp) {
        if (resp?.length) {
          setRestaurants(resp);
          setDialogOpen(true);
        } else {
          notification({ msg: "No locations found nearby", variant: "error" });
        }
      }
      setError(false);
    } else {
      setError(true);
    }
  };

  const searchByLocation = async () => {
    if (navigator.geolocation) {
      const result = await navigator.permissions.query({ name: "geolocation" });
      switch (result.state) {
        case "granted":
        case "prompt":
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const response = await searchByPosition(
                position.coords.latitude,
                position.coords.longitude
              );
              if (response?.length) {
                setRestaurants(response);
                setDialogOpen(true);
              } else {
                notification({ msg: "No locations found nearby", variant: "error" });
              }
            },
            (err) => notification({ msg: err.message, variant: "error" }),
            options
          );
          break;
        case "denied":
          notification({ msg: "Location access denied", variant: "error" });
          break;
      }
    } else {
      notification({ msg: "Location not available", variant: "error" });
    }
  };

  const handleClose = () => setDialogOpen(false);
  const handleListItemClick = (value: RestaurantInformation) => {
    updateConfig({ storeId: value.storeNumber.toString(), storeName: value.name });
    handleClose();
  };

  return (
    <>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Nearby Locations</DialogTitle>
        <List sx={{ pt: 0 }}>
          {restaurants.map((restaurant) => (
            <ListItem
              button
              onClick={() => handleListItemClick(restaurant)}
              key={restaurant.storeNumber.toString()}
            >
              <ListItemText primary={restaurant.name} secondary={restaurant.address.addressLine} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3} paddingBottom={2} container justifyContent="center" alignItems="center">
          <Grid item>
            <TextField
              label="Location"
              value={value}
              helperText={error ? "Enter location" : undefined}
              error={error}
              type="text"
              style={{ backgroundColor: "white" }}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton size="large" onClick={searchByLocation}>
                    <MyLocationIcon />
                  </IconButton>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(e);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  searchAndUpdate((e.target as any).value ?? undefined);
                  e.preventDefault();
                }
              }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              searchAndUpdate(value);
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationSelection;
