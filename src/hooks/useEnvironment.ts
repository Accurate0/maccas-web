const useEnvironment = () => {
  return { isDevelopment: process.env.NODE_ENV === "development", isProduction: process.env.NODE_ENV === "production" };
};

export default useEnvironment;
