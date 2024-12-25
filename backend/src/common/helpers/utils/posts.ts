export function formatForSEO(text) {
  return String(text)
    .toLowerCase() // Convert to lower case
    .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric character with a hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
export function replaceBlobUrls(content, urlMap) {
  console.log("REPLACE THIS", content, urlMap);

  Object.keys(urlMap).forEach((blobUuid) => {
    // Regex to match the entire blob URL
    const blobUrlRegex = new RegExp(
      `blob:http:\/\/localhost:3000\/${blobUuid}`,
      "g"
    );
    content = content.replace(blobUrlRegex, urlMap[blobUuid]);
  });

  return content;
}

export const orderedPosts = (arr: any[]) => {
  return arr.sort((a: any, b: any) => {
    const timestampA = Date.parse(a.createdAt);
    const timestampB = Date.parse(b.createdAt);
    return timestampB - timestampA;
  });
};
