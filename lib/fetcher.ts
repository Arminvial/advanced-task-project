const fetcher = async (url: string) => {
  console.log("fetching:", url);
  let res: Response;

  try {
    res = await fetch(url);
  } catch (networkError) {
    console.error("Network error:", networkError);
    throw new Error("Network error occurred");
  }

  console.log("response status:", res.status);

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error("fetch error:", errorMessage);
    throw new Error(errorMessage || "Unknown fetch error");
  }

  try {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      console.log("fetched data:", data);
      return data;
    } else {
      console.warn("Unexpected content type:", contentType);
      return null;
    }
  } catch (jsonError) {
    console.error("JSON parsing error:", jsonError);
    throw new Error("Failed to parse response");
  }
};

export default fetcher;
