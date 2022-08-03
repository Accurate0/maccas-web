import Head from "next/head";
import useOpenApi from "../hooks/useOpenApi";
import { API } from "@stoplight/elements";
import "@stoplight/elements/styles.min.css";

const Swagger = () => {
  const spec = useOpenApi();

  return (
    <div style={{ paddingTop: "3vh" }}>
      <Head>
        <title>Maccas | Swagger</title>
      </Head>
      {spec && (
        <div style={{ height: "97vh" }}>
          {" "}
          <API apiDescriptionDocument={spec} router="hash" />{" "}
        </div>
      )}
    </div>
  );
};

export default Swagger;
