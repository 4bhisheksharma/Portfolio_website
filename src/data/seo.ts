import { siteConfig } from "@/data/site";
import { galleryImages } from "@/data/gallery";

export const SEO = {
  siteUrl: "https://abhishek-sharma.com.np",
  siteName: "Abhishek Sharma Portfolio",
  locale: "en_US",
  twitter: "@btw_its_abhishek",
  geo: {
    region: "NP-P1",
    placename: "Itahari, Morang, Nepal",
    latitude: 26.665,
    longitude: 87.27,
  },
  default: {
    title: "Abhishek Sharma | Flutter Developer from Itahari, Nepal",
    description:
      "Abhishek Sharma is a Flutter developer from Itahari, Nepal building cross-platform mobile apps with Flutter & Dart. 15+ projects, AWS Certified, open to work.",
    keywords: [
      "Abhishek Sharma",
      "Abhishek Sharma Flutter developer",
      "Abhishek Sharma from Nepal",
      "Abhishek Sharma Itahari",
      "Flutter developer Nepal",
      "Flutter developer Itahari",
      "mobile app developer Nepal",
      "Dart developer",
      "cross-platform mobile apps",
      "Digital Khata",
      "Bhetghat",
      "Itahari International College",
      "AWS certified developer Nepal",
    ],
    ogImage: "/assets/images/og.png",
    ogImageAlt:
      "Abhishek Sharma — Flutter mobile app developer from Itahari, Nepal | Open to work",
  },
  gallery: {
    title: "Gallery | Abhishek Sharma — Flutter Developer from Nepal",
    description:
      "Photos and project screenshots from Abhishek Sharma, Flutter developer based in Itahari, Nepal — apps, certifications, hackathons, and portfolio work.",
    path: "/gallery",
  },
  person: {
    jobTitle: "Flutter Mobile App Developer",
    nationality: "Nepalese",
    birthPlace: "Itahari, Nepal",
    image: "/assets/images/profile1.png",
    ogImage: "/assets/images/og.png",
  },
} as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SEO.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Primary images for Google Image Search and structured data. */
export const seoImages = [
  {
    url: "/assets/images/profile1.png",
    name: "Abhishek Sharma profile photo",
    caption: "Abhishek Sharma, Flutter developer from Itahari, Nepal",
    category: "Profile",
  },
  {
    url: "/assets/images/profile2.png",
    name: "Abhishek Sharma portrait",
    caption: "Abhishek Sharma — mobile app developer from Nepal",
    category: "Profile",
  },
  {
    url: "/assets/images/og.png",
    name: "Abhishek Sharma portfolio preview",
    caption: "Abhishek Sharma | Flutter Developer from Itahari, Nepal",
    category: "Profile",
  },
  ...galleryImages.slice(0, 24).map((img) => ({
    url: img.src,
    name: img.alt,
    caption: img.caption ?? img.alt,
    category: img.category,
  })),
] as const;

export function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${SEO.siteUrl}/#person`,
    name: siteConfig.name,
    alternateName: ["Abhishek Sharma Flutter Developer", "Abhishek Sharma Nepal"],
    jobTitle: SEO.person.jobTitle,
    description: SEO.default.description,
    url: SEO.siteUrl,
    image: [
      absoluteUrl(SEO.person.image),
      absoluteUrl(SEO.person.ogImage),
      ...seoImages
        .filter((img) => img.category === "Profile")
        .map((img) => absoluteUrl(img.url)),
    ],
    email: siteConfig.email,
    nationality: SEO.person.nationality,
    birthPlace: {
      "@type": "Place",
      name: SEO.person.birthPlace,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Itahari",
        addressRegion: "Morang",
        addressCountry: "NP",
      },
    },
    homeLocation: {
      "@type": "Place",
      name: siteConfig.location,
      geo: {
        "@type": "GeoCoordinates",
        latitude: SEO.geo.latitude,
        longitude: SEO.geo.longitude,
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Digital Pathshala",
      url: siteConfig.about.digitalPathshalaUrl,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.about.college,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Itahari",
        addressRegion: "Morang",
        addressCountry: "Nepal",
      },
    },
    sameAs: [
      "https://www.linkedin.com/in/4bhisheksharma/",
      "https://github.com/4bhisheksharma",
      "https://www.instagram.com/btw.its_abhishek/",
      "https://www.facebook.com/4bhisheksharma",
      "https://pub.dev/publishers/abhishek-sharma.com.np/packages",
      "https://blog.abhishek-sharma.com.np/",
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Mobile App Development",
      "Cross-platform Development",
      "Firebase",
      "AWS",
      "Nepal software development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itahari, Morang",
      addressCountry: "Nepal",
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SEO.siteUrl}/#website`,
    url: SEO.siteUrl,
    name: SEO.siteName,
    description: SEO.default.description,
    publisher: { "@id": `${SEO.siteUrl}/#person` },
    inLanguage: "en-US",
  };
}

export function getImageGallerySchema() {
  return {
    "@type": "ImageGallery",
    "@id": `${SEO.siteUrl}/gallery#gallery`,
    name: "Abhishek Sharma Portfolio Gallery",
    description: SEO.gallery.description,
    url: absoluteUrl(SEO.gallery.path),
    author: { "@id": `${SEO.siteUrl}/#person` },
    image: seoImages.slice(0, 20).map((img) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(img.url),
      name: img.name,
      caption: img.caption,
      author: { "@id": `${SEO.siteUrl}/#person` },
    })),
  };
}
