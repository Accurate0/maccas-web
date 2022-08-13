import Head from "next/head";

const OpenGraph: React.FC = () => {
  return (
    <Head>
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/og.jpg`} />
      <meta property="og:type" content="article" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default OpenGraph;
