/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "njmm8e6312.ufs.sh",
        // pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      },
    ],
  },
};

export default withNextIntl(config);
