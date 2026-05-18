const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_READ_ONLY_TOKEN = process.env.HYGRAPH_READ_ONLY_TOKEN;

interface HygraphFetchParams {
  query: string;
  variables?: Record<string, any>;
  revalidate?: number; // Next.js ISR revalidation in seconds
}

export async function hygraphFetch<T>({
  query,
  variables = {},
  revalidate = 3600, // Default cache revalidation: 1 hour
}: HygraphFetchParams): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT environment variable is not defined");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (HYGRAPH_READ_ONLY_TOKEN) {
    headers["Authorization"] = `Bearer ${HYGRAPH_READ_ONLY_TOKEN}`;
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate,
    },
  });

  const json = await response.json();

  if (json.errors) {
    console.warn("Hygraph GraphQL Info:", json.errors);
    throw new Error(
      `GraphQL error: ${json.errors.map((e: any) => e.message).join(", ")}`
    );
  }

  return json.data as T;
}
