export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  location: string
  year: string
  productType: string
  description: string
  brandColor: string
  logo: string
  gallery: string[]
  caseStudyBlurb: string
  caseStudyStats: ProjectStat[]
  caseStudySlug: string
}

export const projects: Project[] = [
  {
    id: "gliquid",
    title: "Gliquid",
    location: "FOUNDER",
    year: "2025",
    productType: "Decentralized Exchange",
    description: "Gliquid is a next-generation decentralized exchange built for seamless token swaps and liquidity provision. The platform combines cutting-edge AMM technology with an intuitive user interface, enabling users to trade with minimal slippage and maximum efficiency across multiple blockchain networks.",
    brandColor: "#5EEAD4",
    logo: "/images/logo.png",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1Dise%C3%B1o%20sin%20t%C3%ADtulo-ce9gECUYlQGmnKr2aDB0btXs2Twp3c.mp4",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2Dise%C3%B1o%20sin%20t%C3%ADtulo%20%281%29-kWJeJR9G23KCdkst3Q5gb8Mj071KBC.mp4",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3Dise%C3%B1o%20sin%20t%C3%ADtulo%20%285%29-AJV5B4D3xzkOA27BdZTCYeGaPEbWAK.mp4"
    ],
    caseStudyBlurb: "In a highly technical market, we realized that users will always pay a premium for convenience. Gliquid was built entirely on speed and user experience. By automating the most frustrating parts of trading into a seamless interface, we proved that prioritizing frictionless, intuitive design is the ultimate revenue driver.",
    caseStudyStats: [
      { value: "$375M+", label: "Transaction Volume" },
      { value: "$600k+", label: "Fees Generated" },
      { value: "5,000+", label: "Unique Wallets" },
    ],
    caseStudySlug: "gliquid",
  },
  {
    id: "tierra-labs",
    title: "Tierra Labs",
    location: "FOUNDER",
    year: "2024",
    productType: "Social DeFi App",
    description: "Tierra Labs revolutionizes decentralized finance by combining social features with DeFi primitives. Users can follow top traders, share strategies, and participate in community-driven investment DAOs, all while maintaining full custody of their assets through smart contract integration.",
    brandColor: "#818CF8",
    logo: "/images/logo1.jpeg",
    gallery: [
      "/images/tierra-mobile-1.png",
      "/images/tierra-mobile-2.png",
      "/images/tierra-mobile-3.png",
      "/images/tierra-mobile-4.png",
      "/images/tierra-laptop-1.png",
      "/images/tierra-laptop-2.png",
      "/images/tierra-laptop-3.png"
    ],
    caseStudyBlurb: "What started as a consumer social app faced a hard reality: the model simply wasn't sustainable. Listening to the market, we executed a complete pivot from a high-friction B2C app into a B2B AI infrastructure. By building an automated support system for niche blockchain communities, we turned a struggling platform into a grant-winning AI protocol.",
    caseStudyStats: [
      { value: "$150k+", label: "AI Grant (Berachain)" },
      { value: "2,000+", label: "Community Members" },
      { value: "$50k+", label: "Brand Sales" },
    ],
    caseStudySlug: "tierra-labs",
  },
  {
    id: "baile-das-piranhas",
    title: "Baile Das Piranhas",
    location: "PRODUCER",
    year: "2024",
    productType: "Music Album",
    description: "A vibrant fusion of Brazilian funk and global sounds, Baile Das Piranhas captures the energy and spirit of street parties with infectious rhythms and bold production. Featuring collaborations with artists across multiple continents, this album pushes the boundaries of contemporary Latin music.",
    brandColor: "#E63946",
    logo: "/images/baile-05-logo.png",
    gallery: [
      "/images/baile-das-piranhas-main.jpg",
      "/images/baile-das-piranhas-back.jpg"
    ],
    caseStudyBlurb: "A flagship music project bridging the gap between Atlanta Plugg, Northern California rap, and Brazilian culture. Beyond sound design, this album was a masterclass in managing creative chaos. We navigated intense studio sessions with industry heavyweights to capture pure, authentic energy and build a completely unique sound experience.",
    caseStudyStats: [
      { value: "60,000+", label: "Organic Streams" },
      { value: "12", label: "Collaborating Artists" },
      { value: "2", label: "Live Shows" },
    ],
    caseStudySlug: "baile-das-piranhas",
  },
  {
    id: "equilibre-finance",
    title: "Equilibre",
    location: "FOUNDER",
    year: "2022",
    productType: "Decentralized Exchange",
    description: "Equilibre Finance is a ve(3,3) decentralized exchange designed to provide deep liquidity and sustainable yields. The protocol incentivizes long-term liquidity provision through its innovative tokenomics model, creating a balanced ecosystem for traders and liquidity providers alike.",
    brandColor: "#D946EF",
    logo: "/images/equilibrelogo.jpg",
    gallery: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cursorful-video-1769447478333%20%28online-video-cutter.com%29-sVkQU6qlpNrvLNKLcgoFjrD6ee7PAx.mp4"
    ],
    caseStudyBlurb: "Born from the ashes of a ecosystem hack, we built an exchange designed to solve the industry's biggest flaw: mercenary capital. By securing powerful B2B partnerships before we even launched the app, we entirely bypassed the notorious cold start problem and built a highly sustainable, dominant liquidity engine.",
    caseStudyStats: [
      { value: "$50M+", label: "TVL Secured" },
      { value: "$330k", label: "Annual Revenue (2023)" },
      { value: "$200k+", label: "KAVA Grant" },
    ],
    caseStudySlug: "equilibre-finance",
  },
  {
    id: "hermes-defi",
    title: "Hermes Defi",
    location: "FOUNDER",
    year: "2021",
    productType: "DeFi Suite",
    description: "Hermes Defi offers a comprehensive suite of decentralized financial tools including swapping, staking, and yield farming. Built on Harmony blockchain, Hermes provides users with fast, low-cost transactions while maintaining the security and transparency of decentralized infrastructure.",
    brandColor: "#FBBF24",
    logo: "/images/hermeslogo.jpg",
    gallery: [
      "/images/hermes-3.jpeg",
      "/images/hermes-1.jpeg"
    ],
    caseStudyBlurb: "What started as a solo attempt to outsmart the market during the COVID lockdowns evolved into a premier financial hub. Driven by conviction, we built the architecture from scratch, scaled a global team, and secured heavy institutional backing to launch a massive decentralized exchange.",
    caseStudyStats: [
      { value: "$550K", label: "Private Round" },
      { value: "17", label: "Person Global Team" },
      { value: "$200k", label: "Project Revenue" },
    ],
    caseStudySlug: "hermes-defi",
  }
]
