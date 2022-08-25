import Head from "next/head";

const OpenGraph: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />

      <title>Maccas</title>
      <meta name="description" content="what maccas should have created" />

      <meta property="og:url" content="https://maccas.anurag.sh" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Maccas" />
      <meta property="og:description" content="what maccas should have created" />
      <meta property="og:image" content="https://maccas.anurag.sh/og.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="maccas.anurag.sh" />
      <meta property="twitter:url" content="https://maccas.anurag.sh" />
      <meta name="twitter:title" content="Maccas" />
      <meta name="twitter:description" content="what maccas should have created" />
      <meta name="twitter:image" content="https://maccas.anurag.sh/og.jpg" />

      <meta name="theme-color" content="#DA291C" />
      <link rel="manifest" href="manifest.json" />
      <link rel="shortcut icon" href="favicon.ico" />
    </Head>
  );
};

export default OpenGraph;
