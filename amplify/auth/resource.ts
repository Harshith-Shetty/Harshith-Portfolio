import { defineAuth } from "@aws-amplify/backend";

/**
 * Cognito User Pool — only used for admin write access via Amplify Console.
 * The portfolio frontend reads data publicly via API key (no sign-in required).
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
