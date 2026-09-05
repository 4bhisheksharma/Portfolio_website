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
      "Invisible VPN",
      "DHRMS Nepal",
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
  notFound: {
    title: "404: Page Not Found | Abhishek Sharma",
    description:
      "The page you are looking for does not exist. Explore Abhishek Sharma's portfolio, mobile applications, and projects.",
    robots: "noindex, follow",
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
    alternateName: [
      "Abhishek Sharma Flutter Developer",
      "Abhishek Sharma Nepal",
      "Abhishek Sharma Itahari",
    ],
    jobTitle: SEO.person.jobTitle,
    gender: "Male",
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Flutter Mobile App Developer",
        occupationLocation: {
          "@type": "City",
          name: "Itahari, Nepal",
        },
        skills: "Flutter, Dart, Mobile App Development, iOS, Android, Firebase, AWS",
      },
    ],
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
      "https://play.google.com/store/apps/details?id=com.digitalpathshala.invisiblevpn",
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Mobile App Development",
      "Cross-platform Development",
      "Android Development",
      "iOS Development",
      "BLoC Architecture",
      "State Management",
      "Firebase",
      "AWS Cloud",
      "Supabase",
      "REST APIs",
      "Nepal Software Development",
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

export function getBreadcrumbSchema(route: "home" | "gallery" | "404") {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SEO.siteUrl}/`,
    },
  ];

  if (route === "gallery") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: `${SEO.siteUrl}/gallery`,
    });
  } else if (route === "404") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: "Page Not Found",
      item: `${SEO.siteUrl}/404`,
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${SEO.siteUrl}/#breadcrumb-${route}`,
    itemListElement,
  };
}

export function getFaqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SEO.siteUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Abhishek Sharma?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abhishek Sharma is a Flutter mobile app developer based in Itahari, Nepal with 15+ cross-platform mobile projects, AWS certification, and experience at Digital Pathshala.",
        },
      },
      {
        "@type": "Question",
        name: "What mobile apps has Abhishek Sharma developed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "He has built production mobile apps including Invisible VPN (Google Play Store), Hisab Khata (business ledger & accounting), DHRMS (Digital Health Record Management System for Nepal), Belbari Municipality smart city app, Urban Homes, and Bhetghat.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Abhishek Sharma specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abhishek specializes in Flutter, Dart, Android, iOS, Firebase, Supabase, AWS Cloud Computing, BLoC state management, REST APIs, and Clean Architecture.",
        },
      },
      {
        "@type": "Question",
        name: "Is Abhishek Sharma available for hire or freelance work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Abhishek Sharma is open to work for full-time Flutter developer roles, freelance mobile application contracts, and collaborative software engineering projects.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Abhishek Sharma located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abhishek Sharma is located in Itahari, Morang, Koshi Province, Nepal.",
        },
      },
    ],
  };
}

export function getSoftwareApplicationsSchema() {
  return [
    {
      "@type": "SoftwareApplication",
      "@id": `${SEO.siteUrl}/#app-invisible-vpn`,
      name: "Invisible VPN",
      operatingSystem: "Android, ChromeOS",
      applicationCategory: "UtilitiesApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: "Invisible VPN - Secure and private online browsing app built with Flutter and Node.js.",
      url: "https://play.google.com/store/apps/details?id=com.digitalpathshala.invisiblevpn",
      author: { "@id": `${SEO.siteUrl}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SEO.siteUrl}/#app-hisab-khata`,
      name: "Hisab Khata",
      operatingSystem: "Android, iOS",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: "Modern digital credit and ledger management system designed for businesses in Nepal.",
      url: "https://btwitsabhishek.me/",
      author: { "@id": `${SEO.siteUrl}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SEO.siteUrl}/#app-dhrms`,
      name: "DHRMS",
      operatingSystem: "Android, iOS",
      applicationCategory: "MedicalApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: "Digital Health Record Management System for patient and healthcare tracking in Nepal.",
      url: "https://play.google.com/store/apps/details?id=com.dhrms.axile",
      author: { "@id": `${SEO.siteUrl}/#person` },
    },
  ];
}
