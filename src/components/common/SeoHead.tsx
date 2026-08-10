import { useEffect } from "react";
import { SEO, absoluteUrl, getImageGallerySchema, getPersonSchema, getWebsiteSchema } from "@/data/seo";

type SeoRoute = "home" | "gallery";

interface SeoHeadProps {
  route?: SeoRoute;
}

function upsertMeta(
  selector: string,
  attrs: Record<string, string>,
  createTag: "meta" | "link" = "meta"
) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(createTag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

function upsertJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function SeoHead({ route = "home" }: SeoHeadProps) {
  useEffect(() => {
    const isGallery = route === "gallery";
    const title = isGallery ? SEO.gallery.title : SEO.default.title;
    const description = isGallery ? SEO.gallery.description : SEO.default.description;
    const canonical = isGallery ? absoluteUrl(SEO.gallery.path) : SEO.siteUrl;
    const ogImage = absoluteUrl(SEO.default.ogImage);

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: SEO.default.keywords.join(", "),
    });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonical }, "link");

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });

    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    const graph: object[] = [
      getWebsiteSchema(),
      {
        "@type": "ProfilePage",
        "@id": `${SEO.siteUrl}/#profilepage`,
        url: isGallery ? absoluteUrl(SEO.gallery.path) : SEO.siteUrl,
        name: title,
        description,
        mainEntity: { "@id": `${SEO.siteUrl}/#person` },
        inLanguage: "en-US",
      },
      getPersonSchema(),
    ];

    if (isGallery) {
      graph.push(getImageGallerySchema());
    }

    upsertJsonLd("seo-jsonld-runtime", {
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [route]);

  return null;
}
