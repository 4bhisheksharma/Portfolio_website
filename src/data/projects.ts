export type ProjectCategory = "mobile" | "web" | "iot" | "games";

export interface ProjectLink {
  label: string;
  href: string;
  type: "github" | "live" | "store" | "other";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  categoryLabel: string;
  technologies: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web", label: "Web Apps" },
  { id: "iot", label: "IoT Projects" },
  { id: "games", label: "Games" },
];

export const projects: Project[] = [
  {
    id: "invisible-vpn",
    title: "Invisible VPN",
    description: "Invisible VPN - Secure way to surf online",
    image: "/assets/images/invisible-vpn.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Node.js", "Supabase", "Cloudinary", "BLoC"],
    featured: true,
    links: [
      { label: "Web", href: "https://invisiblevpn.net/", type: "live" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.digitalpathshala.invisiblevpn",
        type: "store",
      },
      {
        label: "Chrome Extension",
        href: "https://chromewebstore.google.com/detail/invisible-vpn-secure-way/iifoamnnpnmiknnknoanmeghomfencjg",
        type: "other",
      },
    ],
  },
  {
    id: "hisab-khata",
    title: "Hisab Khata",
    description:
      "A modern digital credit and transaction management system designed for small businesses in Nepal.",
    image: "/assets/images/hisab-khata.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Django", "MySQL", "Firebase", "Dart"],
    featured: true,
    links: [
      { label: "Code", href: "https://github.com/4bhisheksharma/abhishek-sharma-hisabkhata", type: "github" },
      { label: "Live", href: "https://btwitsabhishek.me/", type: "live" },
      {
        label: "APK",
        href: "https://github.com/4bhisheksharma/abhishek-sharma-hisabkhata/releases/tag/hisab-khata-v2",
        type: "other",
      },
    ],
  },
  {
    id: "dhrms",
    title: "DHRMS",
    description:
      "DHRMS - Digital Health Record Management System for Nepal",
    image: "/assets/images/dhrms.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Node.js", "Supabase", "DigitalOcean"],
    featured: true,
    links: [
      { label: "Web", href: "https://dhrmsfrontend-puyrr.ondigitalocean.app/", type: "live" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.dhrms.axile",
        type: "store",
      },
    ],
  },
  {
    id: "urban-homes",
    title: "Urban Homes",
    description:
      "Urban Homes - admin-managed customer portal for project files and properties.",
    image: "/assets/images/urban-homes.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Next.js", "Supabase", "DigitalOcean"],
    featured: true,
    links: [
      { label: "Web", href: "https://urbanhomes.com.np/", type: "live" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.digitalpathshala.urbanhomes",
        type: "store",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/urban-homes-np/id6796251918",
        type: "store",
      },
    ],
  },
  {
    id: "sanskar-vastu-compass",
    title: "Sanskar Vastu Compass",
    description:
      "Sanskar Compass is a professional direction and planning companion designed for architects, Vastu consultants, students, and anyone who works with orientation, alignment, and site layout in real-world conditions.",
    image: "/assets/images/sanskar-vastu-compass.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Dart"],
    featured: true,
    links: [
      { label: "Web", href: "https://sanskaracademy.net/", type: "live" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.bobthedeveloper.mobileApp",
        type: "store",
      },
    ],
  },
  {
    id: "digital-khata",
    title: "Digital Khata",
    description:
      "Flutter-powered mobile application for shop owners in Nepal to manage customer dues and purchase histories.",
    image: "/assets/images/digital_khata.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Dart"],
    featured: true,
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/digital-khata", type: "github" },
    ],
  },
  {
    id: "clean-arch",
    title: "clean_arch",
    description:
      "A command-line tool that scaffolds Flutter projects following Clean Architecture - generates the full core layer and feature modules with boilerplate files in one command.",
    image: "/assets/images/clean_arch.png",
    category: "mobile",
    categoryLabel: "Mobile App Package",
    technologies: ["Flutter", "Dart"],
    featured: true,
    links: [
      { label: "Pub.dev Package", href: "https://pub.dev/packages/clean_arch", type: "other" },
    ],
  },
  {
    id: "flutter-app-vitals",
    title: "flutter_app_vitals",
    description:
      "Real-time Flutter performance monitoring overlay - startup time, FPS, memory, CPU, network latency, and widget rebuild tracking displayed directly inside your running application.",
    image: "/assets/images/flutter_app_vitals.png",
    category: "mobile",
    categoryLabel: "Mobile App Package",
    technologies: ["Flutter", "Dart"],
    featured: true,
    links: [
      {
        label: "Pub.dev Package",
        href: "https://pub.dev/packages/flutter_app_vitals",
        type: "other",
      },
    ],
  },
  {
    id: "bhetghat",
    title: "Bhetghat",
    description:
      "Minimal Social Media App built with Flutter and Firebase for seamless social interactions.",
    image: "/assets/images/bhetghat.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Firebase"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/bhetghat-app", type: "github" },
    ],
  },
  {
    id: "arya",
    title: "A.R.Y.A",
    description: "A.R.Y.A - Adaptive Real-time Yielding Assistant | Flutter AI Voice Assistant App",
    image: "/assets/images/arya.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "chatGPT API"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/A.R.Y.A", type: "github" },
    ],
  },
  {
    id: "pulse",
    title: "P.U.L.S.E",
    description:
      "P.U.L.S.E - (Personal Unseen Locker for Special Experience) is your personal digital time capsule, a safe locker where you record short voice messages for your future self.",
    image: "/assets/images/pulse.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Hive"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/P.U.L.S.E", type: "github" },
    ],
  },
  {
    id: "chess",
    title: "Chess Game",
    description:
      "A simple 2-player Chess game developed with Flutter for strategic gameplay on mobile devices.",
    image: "/assets/images/chess.png",
    category: "games",
    categoryLabel: "Mobile Game",
    technologies: ["Flutter", "Dart"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/flutter-chess", type: "github" },
    ],
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description: "A classic Minesweeper game developed with Flutter for mobile devices.",
    image: "/assets/images/minesweeper.png",
    category: "games",
    categoryLabel: "Mobile Game",
    technologies: ["Flutter", "Dart"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/Minesweeper-game", type: "github" },
    ],
  },
  {
    id: "khutruke",
    title: "Khutruke",
    description:
      "An Expense Tracker App built with Flutter/Dart, Firebase and BLoC for efficient money management.",
    image: "/assets/images/khutruke.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "BLoC", "Firebase"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/khutruke-app", type: "github" },
    ],
  },
  {
    id: "weather",
    title: "Weather App",
    description:
      "A minimal weather application providing real-time weather updates with clean UI design.",
    image: "/assets/images/weather.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "API"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/4bhisheksharma/flutter-weather-app",
        type: "github",
      },
    ],
  },
  {
    id: "book-swap",
    title: "Book Swap",
    description:
      "A book-swapping app where users can send and receive swap requests to exchange books with others.",
    image: "/assets/images/More_books.png",
    category: "mobile",
    categoryLabel: "Mobile App",
    technologies: ["Flutter", "Firebase"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/book_swap3", type: "github" },
    ],
  },
  {
    id: "hamro-basti",
    title: "Hamro-Basti",
    description:
      "A community issue reporting web application where citizens can report issues and authorities can track and resolve them.",
    image: "/assets/images/Hamro-Basti_project.png",
    category: "web",
    categoryLabel: "Web App",
    technologies: ["Java", "JSP", "MySQL"],
    links: [
      { label: "View Code", href: "https://github.com/4bhisheksharma/HamroBasti", type: "github" },
    ],
  },
  {
    id: "leave-a-notes",
    title: "Leave-a-notes*",
    description:
      "Realtime notes sharing website while staying anonymous. Built to test AI capabilities.",
    image: "/assets/images/leave-a-notes.png",
    category: "web",
    categoryLabel: "Web App",
    technologies: ["React", "Node.js"],
    links: [
      { label: "Live Demo", href: "https://leave-a-notes.vercel.app/", type: "live" },
    ],
  },
  {
    id: "chithi-patra",
    title: "Chithi-Patra*",
    description:
      "Realtime chatting website while staying anonymous. Built to explore real-time communication.",
    image: "/assets/images/chithi-patra.png",
    category: "web",
    categoryLabel: "Web App",
    technologies: ["React", "Socket.io"],
    links: [
      { label: "Live Demo", href: "https://real-times-chat.vercel.app/", type: "live" },
    ],
  },
  {
    id: "prevent-accidental-quit",
    title: "Prevent Accidental Quit",
    description:
      "Chrome extension that provides a warning prompt when users attempt to close the browser, preventing accidental quitting.",
    image: "/assets/images/Chrome Extension.png",
    category: "web",
    categoryLabel: "Browser Extension",
    technologies: ["JavaScript", "Chrome API"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/4bhisheksharma/Prevent_Accidental_Close_Extension",
        type: "github",
      },
    ],
  },
  {
    id: "wireless-charging-drone",
    title: "Wireless Charging Drone",
    description:
      "Collaborated with a team to create a wireless charging drone using induction-based charging technology.",
    image: "/assets/images/Wireless_charging_drone.jpg",
    category: "iot",
    categoryLabel: "IoT Project",
    technologies: ["Arduino", "Wireless Charging"],
    links: [
      {
        label: "View Details",
        href: "https://drive.google.com/file/d/1yrcpW9rmvFbDrAbAlU-gZMDlEjf7aLzW/view?usp=sharing",
        type: "other",
      },
    ],
  },
  {
    id: "beam-smart",
    title: "Beam Smart",
    description:
      "Adaptive Vehicle Headlight Control system that autonomously adjusts headlights for safer night driving.",
    image: "/assets/images/Beam Smart.jpg",
    category: "iot",
    categoryLabel: "IoT Project",
    technologies: ["Arduino", "Sensors"],
    links: [
      {
        label: "View Details",
        href: "https://drive.google.com/drive/folders/1yE1Qp5snZ6C2qLPd0nqt1y2i_1qptqpS?usp=sharing",
        type: "other",
      },
    ],
  },
  {
    id: "snake-game",
    title: "Simple Snake Game",
    description:
      "Created a simple snake game using Python/Pygame which is easy and fun to play with classic gameplay.",
    image: "/assets/images/Snake game.png",
    category: "games",
    categoryLabel: "Game",
    technologies: ["Python", "Pygame"],
    links: [
      {
        label: "View Code",
        href: "https://github.com/4bhisheksharma/Simple_snake_game",
        type: "github",
      },
    ],
  },
];

export const INITIAL_PROJECT_COUNT = 6;
