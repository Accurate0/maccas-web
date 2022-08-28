module.exports = {
  rewrites() {
    return [
      {
        source: "/index.html",
        destination: "/",
      },
    ];
  },
  images: {
    domains: ["i.maccas.anurag.sh"],
  },
};
