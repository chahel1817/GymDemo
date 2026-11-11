import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brand.name,
    short_name: siteConfig.brand.wordmarkPrimary,
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.theme.bgPrimary,
    theme_color: siteConfig.theme.bgPrimary,
    icons: [
      {
        src: "/icons/forge-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

