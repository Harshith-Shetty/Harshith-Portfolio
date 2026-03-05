/**
 * Amplify client-side configuration.
 * 
 * `amplify_outputs.json` is generated automatically when you run:
 *   npx ampx sandbox        (local dev)
 *   npx ampx pipeline-deploy (CI/CD)
 * 
 * It is .gitignored — each environment gets its own version.
 */
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

export default outputs;
