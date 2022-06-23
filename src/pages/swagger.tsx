import { fetchAccessToken } from "../lib/AxiosInstance";
import "swagger-ui-react/swagger-ui.css";
import apiSchema from "../schema/api.json";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic<{
  spec: any;
}>(import("swagger-ui-react"), { ssr: false });

const Swagger = () => {
  return (
    <div style={{ paddingTop: 50 }}>
      <SwaggerUI
        spec={apiSchema}
        requestInterceptor={async (req) => {
          req.headers["Authorization"] = `Bearer ${await fetchAccessToken()}`;
          return req;
        }}
      />
    </div>
  );
};

export default Swagger;
