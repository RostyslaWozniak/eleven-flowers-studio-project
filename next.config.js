import "./src/env.js";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "njmm8e6312.ufs.sh",
        pathname: `/f/*`,
      },
    ],
  },
};

export default withNextIntl(config);
