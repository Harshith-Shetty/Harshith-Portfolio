import "dotenv/config";

const amplifyApiUrl = (() => {
  const value = process.env.AMPLIFY_DATA_API_URL;
  if (!value) {
    throw new Error("AMPLIFY_DATA_API_URL must be configured for Amplify Data access.");
  }
  return value;
})();

const amplifyApiKey = process.env.AMPLIFY_DATA_API_KEY;
const amplifyAccessToken = process.env.AMPLIFY_DATA_ACCESS_TOKEN;

if (!amplifyApiKey && !amplifyAccessToken) {
  throw new Error(
    "Provide AMPLIFY_DATA_API_KEY or AMPLIFY_DATA_ACCESS_TOKEN to authenticate with Amplify Data.",
  );
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message?: string }[];
}

export async function amplifyGraphQLRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (amplifyApiKey) {
    headers["x-api-key"] = amplifyApiKey;
  }

  if (amplifyAccessToken) {
    headers["Authorization"] = amplifyAccessToken;
  }

  const response = await fetch(amplifyApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const body = (await response.json().catch(() => ({}))) as GraphQLResponse<T>;

  if (!response.ok) {
    const errorMessage =
      body.errors?.[0]?.message ?? response.statusText ?? "Amplify request failed";
    throw new Error(errorMessage);
  }

  if (body.errors?.length) {
    throw new Error(body.errors[0]?.message ?? "Amplify responded with an error");
  }

  if (!body.data) {
    throw new Error("Amplify response did not include data.");
  }

  return body.data;
}
