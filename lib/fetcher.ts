const fetcher = async (url: string) => {
    console.log("fetching:", url);
    const res = await fetch(url);
    console.log("response status:", res.status);
    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("fetch error:", errorMessage);
      throw new Error(errorMessage || "Network error");
    }
    const data = await res.json();
    console.log("fetched data:", data);
    return data;
  };
  
  export default fetcher;
  