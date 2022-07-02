import { fetchAccessToken } from "../lib/AxiosInstance";
import "swagger-ui-react/swagger-ui.css";
import apiSchema from "../schema/api.json";
import dynamic from "next/dynamic";
import Head from "next/head";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

const Swagger = () => {
  return (
    <div style={{ paddingTop: 50 }}>
      <Head>
        <title>Maccas | Swagger</title>
      </Head>
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
