import { DOMParser } from "@xmldom/xmldom";

async function getSearchSuggestions(query: string): Promise<[string, string[]]> {
  const url = `https://suggestqueries.google.com/complete/search?output=toolbar&gl=sv&hl=sv&q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const suggestionElements = doc.getElementsByTagName("suggestion");
  const suggestions = Array.from(suggestionElements)
    .map((el) => el.getAttribute("data"))
    .filter((data): data is string => data !== null);

  return [query, suggestions];
}

export async function GET(_request: Request) {
  const q = new URL(_request.url).searchParams.get("q");
  if (!q) return new Response("No query provided", { status: 400 });

  const data = await getSearchSuggestions(q);

  return new Response(JSON.stringify(data));
}
