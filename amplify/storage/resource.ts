import { defineStorage } from "@aws-amplify/backend";

/**
 * S3 bucket for portfolio media assets (certification logos, project images, etc.)
 *
 * Access rules:
 *  - Public: anyone can READ files under the "public/" prefix (logo URLs served to visitors)
 *  - Authenticated (owner): can upload/update/delete under "public/" (you, via Amplify Console)
 *
 * How to upload a logo:
 *   1. Run `npx ampx sandbox` to provision the bucket.
 *   2. In the Amplify Console → Storage → browse to your bucket.
 *   3. Upload the logo image under "public/logos/<filename>.png"
 *   4. Copy the public URL and paste it into the Certification record's `logo_url` field.
 */
export const storage = defineStorage({
  name: "portfolioMedia",
  access: (allow) => ({
    "public/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
