import { fetchAccessToken } from "../lib/AxiosInstance";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import useOpenApi from "../hooks/useOpenApi";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

const Swagger = () => {
  const spec = useOpenApi();

  return (
    <div style={{ paddingTop: 50 }}>
      <Head>
        <title>Maccas | Swagger</title>
      </Head>
      {spec && (
        <SwaggerUI
          spec={spec}
          requestInterceptor={async (req) => {
            req.headers["Authorization"] = `Bearer ${await fetchAccessToken()}`;
            return req;
          }}
        />
      )}
    </div>
  );
};

export default Swagger;
