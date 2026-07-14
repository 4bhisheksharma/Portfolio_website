export interface Certification {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: string;
  comingSoon?: boolean;
}

export const certifications: Certification[] = [
  {
    id: "aaa-scholarship",
    title: "AAA Scholarship",
    description:
      "AAA (Academic, Attitude, and Attendance) Scholarship award 2026 holder at by Itahari International College.",
    image: "/assets/images/AAA.jpg",
    imageAlt: "AAA Scholarship Certificate",
    link: "https://www.facebook.com/share/p/1WjZuBpawo/",
  },
  {
    id: "young-scientist-summit",
    title: "7th Young Scientist Summit",
    description:
      "Young Scientist Summit Winner (February 2023). Securing victory at the Young Scientist Summit was a significant milestone in my scientific journey.",
    image: "/assets/images/certification_of_YSS.jpg",
    imageAlt: "Young Scientist Summit Certificate",
    link: "https://www.facebook.com/100016129393562/videos/pcb.1320731315141169/1233925317226078",
  },
  {
    id: "apcys-2023",
    title: "Asia Pacific Conference of Young Scientists 2023",
    description:
      "In November 2023, I had the honor of presenting my research at the Asia Pacific Conference of Young Scientists (APCYS).",
    image: "/assets/images/certification_of_APCYS.jpg.png",
    imageAlt: "APCYS Certificate",
    link: "https://drive.google.com/file/d/1g1egQJaJ_5ilaCQbaEaMmPhcc2oxHf0M/view?usp=sharing",
  },
  {
    id: "aws-cloud-foundations",
    title: "AWS Academy Cloud Foundations 2024",
    description:
      "On November 10, 2024, I successfully completed AWS Academy Graduate - AWS Academy Cloud Foundations Amazon Web Services Training and Certification course.",
    image: "/assets/images/AWS Academy Cloud Foundations.png",
    imageAlt: "AWS Academy Cloud Foundations Certificate",
    link: "https://www.credly.com/badges/ac2fe2a7-1cba-478f-9eba-4953f79b6efb/public_url",
  },
  {
    id: "aws-data-engineering",
    title: "AWS Academy Data Engineering 2024",
    description:
      "On November 17, 2024, I successfully completed AWS Academy Graduate - AWS Academy Data Engineering Amazon Web Services Training and Certification course.",
    image: "/assets/images/AWS Academy Data Engineering.png",
    imageAlt: "AWS Academy Data Engineering Certificate",
    link: "https://www.credly.com/badges/81f2f572-8ba5-48f2-9931-c8e6dcb5847b/public_url",
  },
  {
    id: "aws-ml-nlp",
    title: "AWS Academy Machine Learning for Natural Language Processing 2024",
    description:
      "On November 26, 2024, I successfully completed AWS Academy Graduate - AWS Academy Machine Learning for Natural Language Processing Amazon Web Services Training and Certification course.",
    image: "/assets/images/AWS Academy Machine Learning for Natural Language Processing.png",
    imageAlt: "AWS Academy Machine Learning for NLP Certificate",
    link: "https://www.credly.com/badges/c88d6274-64f1-4d4f-9c6a-457d2c0946f9/public_url",
  },
  {
    id: "aws-ml-foundations",
    title: "AWS Academy Machine Learning Foundations 2024",
    description:
      "On November 13, 2024, I successfully completed AWS Academy Graduate -AWS Academy Machine Learning Foundations Amazon Web Services Training and Certification course.",
    image: "/assets/images/AWS Academy Machine Learning Foundations.png",
    imageAlt: "AWS Academy Machine Learning Foundations Certificate",
    link: "https://www.credly.com/badges/0bb0c55f-6c6d-44f8-b00e-2b61327dc2a9/public_url",
  },
  {
    id: "python-essential",
    title: "Python Essential Training Certificate 2024",
    description:
      "On August 13, 2024, I successfully completed the Python Essential Training course.",
    image: "/assets/images/Certification_of_Python.jpg",
    imageAlt: "Python Certificate",
    link: "https://drive.google.com/file/d/1fjk4ucSxnULn6nlhXzqUm0xVNOJxrwsN/view?usp=sharing",
  },
  {
    id: "java-11",
    title: "Learning Java 11 Certificate 2024",
    description:
      'On August 13, 2024, I successfully completed the "Learning Java 11" course.',
    image: "/assets/images/Certification_of_Java.jpg",
    imageAlt: "Java Certificate",
    link: "https://drive.google.com/file/d/1zhqsz99KvwdAuYPeHGXwGtpL-JlctZrX/view?usp=sharing",
  },
  {
    id: "javascript-essential",
    title: "JavaScript Essential Training Certificate 2024",
    description:
      'On August 15, 2024, I successfully completed the "JavaScript Essential Training" course.',
    image: "/assets/images/Certification_of_JavaScript.jpg",
    imageAlt: "JavaScript Certificate",
    link: "https://drive.google.com/file/d/11cc78A6T_U4t7aBBbbg424u_OyBh7TmP/view?usp=sharing",
  },
  {
    id: "html-essential",
    title: "HTML Essential Training Certificate 2024",
    description:
      'On August 20, 2024, I successfully completed the "HTML Essential Training" course.',
    image: "/assets/images/Certification_of_HTML.jpg",
    imageAlt: "HTML Certificate",
    link: "https://drive.google.com/file/d/1L-M-Kb-5U8E9WDyx2wA05x69onwJycSK/view?usp=sharing",
  },
  {
    id: "more-to-come",
    title: "More to come...",
    description: "I am working on it...",
    image: "",
    imageAlt: "",
    comingSoon: true,
  },
];
