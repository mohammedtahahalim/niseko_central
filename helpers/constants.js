export const sanitizeURL = (url) => {
  if (!url || typeof url !== "string") return undefined;
  const sanitizedURL = encodeURIComponent(
    url
      .toLowerCase()
      .split(/\s+/)
      .filter((elem) => elem !== "-")
      .join("-")
  );
  return sanitizedURL;
};
