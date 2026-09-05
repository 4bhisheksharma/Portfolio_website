import { useEffect } from "react";
import {
  SEO,
  absoluteUrl,
  getImageGallerySchema,
  getPersonSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getFaqSchema,
  getSoftwareApplicationsSchema,
} from "@/data/seo";

export type SeoRoute = "home" | "gallery" | "404";

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
    const is404 = route === "404";

    let title: string = SEO.default.title;
    let description: string = SEO.default.description;
    let canonical: string = SEO.siteUrl;

    if (isGallery) {
      title = SEO.gallery.title;
      description = SEO.gallery.description;
      canonical = absoluteUrl(SEO.gallery.path);
    } else if (is404) {
      title = SEO.notFound.title;
      description = SEO.notFound.description;
      canonical = absoluteUrl("/404");
    }

    const ogImage = absoluteUrl(SEO.default.ogImage);

    document.title = title;

    // Robots directive — prevent indexing of 404 while retaining link equity
    if (is404) {
      upsertMeta('meta[name="robots"]', {
        name: "robots",
        content: "noindex, follow",
      });
      upsertMeta('meta[name="googlebot"]', {
        name: "googlebot",
        content: "noindex, follow",
      });
    } else {
      upsertMeta('meta[name="robots"]', {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      });
      upsertMeta('meta[name="googlebot"]', {
        name: "googlebot",
        content: "index, follow, max-image-preview:large",
      });
    }

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

    // Build structured data graph
    const graph: object[] = [
      getWebsiteSchema(),
      getBreadcrumbSchema(route),
    ];

    if (!is404) {
      graph.push(
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
        getFaqSchema(),
        ...getSoftwareApplicationsSchema()
      );

      if (isGallery) {
        graph.push(getImageGallerySchema());
      }
    }

    // Upsert into single canonical JSON-LD script (reusing initial #seo-jsonld from index.html)
    upsertJsonLd("seo-jsonld", {
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [route]);

  return null;
}
