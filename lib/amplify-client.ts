/**
 * Lazy server-side Amplify Data client factory.
 *
 * Returns null if amplify_outputs.json is still a placeholder (sandbox not running yet).
 * In that case, all getters in lib/api.ts automatically fall back to static seed data.
 *
 * When the real sandbox/deploy runs, amplify_outputs.json gets a real AppSync URL
 * and this returns a fully configured client.
 */
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { type Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

type AmplifyServerClient = ReturnType<typeof generateServerClientUsingCookies<Schema>>;

let _client: AmplifyServerClient | null = null;
let _tried = false;

export function getServerClient(): AmplifyServerClient | null {
  if (_tried) return _client;
  _tried = true;

  // Bail out fast if the outputs are still placeholder values
  const url = (outputs as { data?: { url?: string } })?.data?.url;
  if (!url || url === "PLACEHOLDER") return null;

  try {
    _client = generateServerClientUsingCookies<Schema>({
      config: outputs,
      cookies,
      authMode: "apiKey",
    });
  } catch {
    _client = null;
  }

  return _client;
}
