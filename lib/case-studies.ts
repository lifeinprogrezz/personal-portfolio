export type CaseStudySection =
  | { type: "heading"; content: string }
  | { type: "text"; content: string }
  | { type: "image"; content: string; maxWidth?: string }
  | { type: "labeled-text"; label: string; content: string }
  | { type: "image-mosaic"; layout: "1-top-2-bottom" | "2-top-1-bottom" | "4-row" | "2x2-grid"; images: string[]; compact?: boolean }
  | { type: "spotify"; content: string }
  | { type: "break" }

export interface CaseStudy {
  slug: string
  dataSources?: { label: string; url: string }[]
  captions?: Record<string, string>
  sections: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "gliquid",
    dataSources: [{ label: "DefiLlama", url: "https://defillama.com/protocol/gliquid" }],
    captions: {
      "/images/gliquid-metric-cumulative.png": "Cumulative DEX Volume",
      "/images/gliquid-metric-tvl-volume.png": "TVL & Volume",
      "/images/gliquid-lp-card.jpeg": "LP Position Card",
      "/images/gliquid-dashboard.jpeg": "Dashboard Overview",
      "/images/gliquid-add-liquidity.jpeg": "Add Liquidity Flow",
      "/images/gliquid-copy-paste.jpeg": "Copy & Paste Positions",
    },
    sections: [
      // Section 01
      { type: "heading", content: "01 The Mobilization" },
      { type: "text", content: "By mid-2025, the crypto market had matured. The middle class of DeFi, the true power users, had migrated to HyperEVM, attracted by an ecosystem that was seeing exploding revenue and user incentives. Yet, the infrastructure was thin. Only two decentralized exchanges existed to serve this growing sector. I realized I held a strategic asset sitting idle: a V4 DEX license purchased from Algebra in 2023. The opportunity was undeniable." },
      { type: "text", content: "I didn\u2019t write a whitepaper. I mobilized my CTO, lead dev, and the Algebra team to deploy in days. We adopted a strategy of direct community engagement: building in public and shipping one feature every single day based on specific user requests. This created a dynamic, ever-evolving experience that kept users hooked. Key Opinion Leaders (KOLs) began to take notice, validating that we were early and we were right. Within 72 hours, we attracted $500,000 in TVL." },
      { type: "image", content: "/images/gliquid-metric-cumulative.png" },
      { type: "image", content: "/images/gliquid-metric-tvl-volume.png" },
      { type: "image", content: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3Dise%C3%B1o%20sin%20t%C3%ADtulo%20%285%29-AJV5B4D3xzkOA27BdZTCYeGaPEbWAK.mp4" },
      // Section 02
      { type: "heading", content: "02 Designing Revenue" },
      { type: "text", content: "As we scaled to $1M in daily volume, we analyzed user behavior to solve the revenue puzzle. Using PostHog, we tracked user sessions (averaging 30+ mins/week) and discovered a specific pricing sensitivity: users hated paying fees on performance, but they were willing to pay for convenience." },
      { type: "text", content: "We slashed standard trading fees to become a highly competitive execution venue, but introduced specific fees on automated actions like one-click position unwinding. The result was immediate. Users effectively paid us to save them clicks. This strategy allowed us to generate 30\u201340% of our project cash flow from UX convenience alone, proving that monetization is a design challenge, not just a financial one." },
      { type: "image", content: "/images/gliquid-lp-card.jpeg" },
      { type: "image", content: "/images/gliquid-dashboard.jpeg" },
      { type: "image", content: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2Dise%C3%B1o%20sin%20t%C3%ADtulo%20%281%29-kWJeJR9G23KCdkst3Q5gb8Mj071KBC.mp4" },
      // Section 03
      { type: "heading", content: "03 Masking Complexity" },
      { type: "text", content: "By day 50, the platform was managing $7M in daily volume and had onboarded 5,000+ unique wallets." },
      { type: "text", content: "The core technical challenge was Concentrated Liquidity. Users needed to add liquidity within specific price ranges, a complex process that typically introduces significant friction. While our backend, provided by Algebra, was rigid to ensure maximum security and robustness, our frontend needed to be the opposite." },
      { type: "text", content: "We architected a UX that eliminated these frictions, giving users the feeling of interacting with a completely fluid and customizable product. We didn\u2019t just build a DEX; we built a layer that translated raw protocol constraints into a seamless trader and liquidity provider experience." },
      { type: "image", content: "/images/gliquid-add-liquidity.jpeg" },
      { type: "image", content: "/images/gliquid-copy-paste.jpeg" },
      { type: "image", content: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1Dise%C3%B1o%20sin%20t%C3%ADtulo-ce9gECUYlQGmnKr2aDB0btXs2Twp3c.mp4" },
    ],
  },
  {
    slug: "tierra-labs",
    captions: {
      "/images/tierra-mobile-1.png": "Home Feed",
      "/images/tierra-mobile-2.png": "User Profile",
      "/images/tierra-mobile-3.png": "Dashboard",
      "/images/tierra-mobile-4.png": "Token Explorer",
      "/images/tierra-nft.jpeg": "Collectible NFT",
      "/images/tierra-socialfi-flow.jpeg": "SocialFi App Architecture",
      "/images/tierra-waitlist.jpeg": "Waitlist CTA",
      "/images/tierra-laptop-1.png": "Funds Marketplace",
      "/images/tierra-laptop-2.png": "Fund Homepage",
      "/images/tierra-laptop-3.png": "Fund Contribution Homepage",
      "/images/tierra-metrics.jpeg": "X Metrics 15 Dec / 15 Jan",
    },
    sections: [
      // Section 01
      { type: "heading", content: "01 The Lean Pivot" },
      { type: "text", content: "Leaving ETH CC Brussels in the summer of 2024, we were hungry for a fresh challenge. After three years of building DEXs, we were burnt out on pure finance. Spotting Berachain's massive testnet traction, we pivoted and initially bet on the emerging Social Finance trend." },
      { type: "text", content: "We launched a mobile app abstracting Web3 for social investing, aggressively engineering a waitlist of 1,200+ users through influencers and gamification. But the data didn\u2019t lie. Despite the hype, the LTV/CAC ratio was upside down. Development costs were immense, and unit economics were unsustainable." },
      { type: "text", content: "Instead of burning cash, we applied Lean Startup principles. We killed the feature but preserved the asset: The Community. We leveraged our visual culture to launch a Fund Tokenization testnet product, a trending, rapidly deployable model. To finance the next phase, we sold a collectible NFT collection to our power users, generating $50,000 in seed capital to expand the team." },
      { type: "image-mosaic", layout: "4-row", images: ["/images/tierra-mobile-1.png", "/images/tierra-mobile-2.png", "/images/tierra-mobile-3.png", "/images/tierra-mobile-4.png"] },
      { type: "image-mosaic", layout: "1-top-2-bottom", images: ["/images/tierra-nft.jpeg", "/images/tierra-socialfi-flow.jpeg", "/images/tierra-waitlist.jpeg"] },
      // Section 02
      { type: "heading", content: "02 The RAG Architecture" },
      { type: "text", content: "With the team expanded and the runway secured, we identified a critical gap while we continued to polish our new product. The AI Gold Rush was in full swing, yet niche blockchain projects suffered from poor customer support. Generic LLMs hallucinated when queried about specific protocol documentation." },
      { type: "text", content: "We engineered a Retrieval-Augmented Generation (RAG) system designed specifically for technical documentation, creating a pipeline where the system scraped and structured complex protocol docs into reliable truth sources. We then packaged this infrastructure as a White-Glove SDK, allowing projects to plug our AI agent into their documentation effortlessly with full brand customization." },
      // Section 03
      { type: "heading", content: "03 The Ecosystem Fit" },
      { type: "text", content: "The shift from B2C Social to B2B Infrastructure changed everything. We moved from chasing low-value users to solving high-value pain points for protocols." },
      { type: "text", content: "The market validated the pivot immediately. We were featured on the [Dabit3 AI podcast on X](https://x.com/dabit3/status/1878622136203653332?s=20), the industry\u2019s leading show at the time, but the ultimate confirmation came from the chain itself. [Berachain awarded us a $150,000 Innovation Grant](https://blog.berachain.com/blog/request-for-broposal-update-applications), recognizing both our RAG infrastructure and our community strength. We closed the loop by taking the fund tokenization product to a Mainnet launch, capturing the attention of the entire ecosystem." },
      { type: "image-mosaic", layout: "2-top-1-bottom", images: ["/images/tierra-laptop-2.png", "/images/tierra-laptop-3.png", "/images/tierra-laptop-1.png"] },
      { type: "image", content: "/images/tierra-metrics.jpeg" },
    ],
  },
  {
    slug: "baile-das-piranhas",
    captions: {
      "/images/baile-das-piranhas-main.jpg": "Album Artwork",
      "/images/baile-das-piranhas-back.jpg": "Back Cover Art",
      "/images/baile-kites-kit.jpeg": "Kite Building Kit",
      "/images/baile-flying-kites.jpeg": "Flying Kites for Artwork",
      "/images/baile-clip.jpeg": "Music Video Shoot",
      "/images/baile-me-adro.jpeg": "Studio Session with Adro",
      "/images/baile-me-studio.jpeg": "Guest at Producer Work-Shop in Madrid",
      "/images/baile-vendicion.jpeg": "Vendicion Studio, Salobrena",
      "/images/baile-beginnings.jpeg": "The First Setup",
      "/images/baile-master.jpeg": "Mastering in FL Studio",
      "/images/baile-me-yellow.jpeg": "DJ Set at Madrid Club",
    },
    sections: [
      // Spotify embed before section 01
      { type: "spotify", content: "https://open.spotify.com/album/22qs93954ZccdqK1iieKWP" },
      // Section 01
      { type: "heading", content: "01 The Cultural Context" },
      { type: "text", content: "After more than three years of producing tracks together under my alias [05shawty](https://open.spotify.com/intl-es/artist/5e7Q6fx3lSMwG1wdwEc65d), moving from Vigo to Madrid and occasionally to Salobreña after [Brabo Dinovo](https://open.spotify.com/intl-es/artist/0s0vEPYb6t0sZ1D6CE4Mi0) signed with Vendicion gave us the resources to evolve. We realized we needed to build a cohesive universe with a very specific sonic and visual identity rather than just dropping isolated mixtapes." },
      { type: "text", content: "I produced the instrumentals to blend two distinct styles. We took the raw, dark drum patterns of Sacramento/North California rap (influences like Young Slo-Be) and layered them with the sweet, bright, and highly harmonic melodies of the Plugg subgenre (MexikoDro, Pierre Bourne). This created a complex backdrop for Brabo's ironic, innocent brazilian portuguese vocal delivery." },
      { type: "text", content: "We needed a symbol to tie the California aesthetic (palm trees, low-riders) to Brazil. We chose the kite. In Brazilian favelas, children use kites not for play, but to warn local factions that authorities are approaching. It is a symbol of lost innocence. I built and flew these kites for the album artwork, mapping the gritty reality of favela survival onto the American rap aesthetic." },
      { type: "image-mosaic", layout: "2-top-1-bottom", images: ["/images/baile-kites-kit.jpeg", "/images/baile-flying-kites.jpeg", "/images/baile-clip.jpeg"], compact: true },
      { type: "image", content: "/images/baile-das-piranhas-main.jpg" },
      // Section 02
      { type: "heading", content: "02 Session Psychology" },
      { type: "text", content: "Because our sound was distinct, it attracted attention. Through our stylist and connector, [Wetty Boop](https://www.instagram.com/wettyboop), we secured sessions with top-tier national artists like Kaydy Kain, MDA, and West Dubai, alongside elite producers like Bexnil and Pochi. As an emerging producer in the room with million-stream artists, I had to treat the studio like a high-performance engine." },
      { type: "text", content: "Applying the 80/20 rule means understanding that a studio session is a race against time and focus. If the momentum stops, the drop in energy shows up immediately in the vocal performance. Instead of building from scratch, I used curated song samples to set the vibe instantly, programming drums in real-time so the artist could start writing right away." },
      { type: "text", content: "Maintaining that flow means being part producer, part psychologist. You have to push the artist to finish the verse on the spot, if they leave the studio without a finished song, it usually dies. To protect that energy, I never wasted time on tiny details while the artist waited. I made hype mixes on the fly with aggressive filters and compression so the demo hit hard in their car on the way home, making them think, \u201CI have to drop this\u201D." },
      { type: "image-mosaic", layout: "2-top-1-bottom", images: ["/images/baile-me-adro.jpeg", "/images/baile-me-studio.jpeg", "/images/baile-vendicion.jpeg"], compact: true },
      // Section 03
      { type: "heading", content: "03 The Engineering & Execution" },
      { type: "text", content: "Creating the raw tracks was collaborative chaos, but finishing the album was an exercise in systematic isolation. Post-production took almost half a year as I spent months in the headphones, pushing the raw studio energy to its absolute technical limits. This was followed by a rigorous two-month mastering process in collaboration with [Wabii](https://www.instagram.com/wabiiwannadie) to lock in the final sound." },
      { type: "text", content: "Once the masters were delivered, we didn't just drop the files. I coordinated directly with [Honey Money](https://www.instagram.com/honey_money_records) management to execute a 2.5-month rollout strategy. This involved mapping out a strict grid of vertical and horizontal content, scheduling social media drops, and managing the logistical friction of a complex, multi-artist release pipeline." },
      { type: "text", content: "The ultimate lesson of Baile Das Piranhas was knowing when to let go. When you handle the beat, the recording, the mix, and the master, it will never sound perfect to your own ears. I learned to trust the initial instinct, preserve the raw human energy we captured in the room, and ship the product." },
      { type: "image-mosaic", layout: "2-top-1-bottom", images: ["/images/baile-master.jpeg", "/images/baile-me-yellow.jpeg", "/images/baile-beginnings.jpeg"], compact: true },
      { type: "image", content: "/images/baile-das-piranhas-back.jpg" },
    ],
  },
  {
    slug: "equilibre-finance",
    dataSources: [{ label: "DefiLlama", url: "https://defillama.com/protocol/equilibre" }],
    captions: {
      "/images/equilibre-ve33-explanation.png": "ve(3,3) Circular Model",
      "/images/equilibre-ve33-part2.png": "How veTOKEN Works",
      "/images/equilibre-messari-data.png": "DEX Trilemma: Traditional vs ve(3,3)",
      "/images/equilibre-maikol-home.jpeg": "Friend, roommate, and CTO. 12 hours per day",
      "/images/equilibre-lock.jpeg": "Aligning incentives: Lock Page",
      "/images/equilibre-vote.jpeg": "Aligning incentives: Vote Page",
      "/images/equilibre-unstake.jpeg": "Improved UX: Unstake LP Mobile",
      "/images/equilibre-unstake-2.jpeg": "Improved UX: LP Position Reminders",
      "/images/equilibre-youtube-traction.jpeg": "YouTube Traction in Testnet",
      "/images/equilibre-cumulative-revenue.png": "Cumulative Revenue",
      "/images/equilibre-cumulative-volume.png": "Cumulative DEX Volume",
      "/images/equilibre-tvl-volume.png": "TVL & Volume",
    },
    sections: [
      // Section 01
      { type: "heading", content: "01 The ve(3,3) Thesis" },
      { type: "text", content: "Losing our previous project to the [$100 million Harmony chain](https://www.merklescience.com/blog/hack-track-analysis-of-harmonys-horizon-bridge-exploit) hack forced a hard reset. While the market was collapsing under the Luna and FTX scandals, I realized the prevailing DEX model was structurally broken. Platforms were issuing hyper-inflated tokens to attract Liquidity Providers (LPs), who would instantly dump the tokens to cover impermanent loss. This mercenary capital created a death spiral of zero liquidity, zero volume, and zero fees." },
      { type: "text", content: "The paradigm shift was ve(3,3), a circular economic model that democratized token issuances and distributed 100% of trading fees to users who locked their tokens for up to four years. It perfectly aligned the incentives of LPs, DEX token, and traders." },
      { type: "text", content: "Building this was incredibly difficult because there was almost zero documentation on how to execute it, so we spent months in the trenches. While operating with a lean squad of five, led technically by my CTO [Miguel Acu\u00f1a](https://www.linkedin.com/in/miguelangelacunareboreda/), I lived in spreadsheets reverse-engineering smart contracts, modeling emission schedules, and mapping user flows based on early prototypes." },
      { type: "image", content: "/images/equilibre-ve33-explanation.png" },
      { type: "image", content: "/images/equilibre-messari-data.png" },
      { type: "break" },
      { type: "image", content: "/images/equilibre-maikol-home.jpeg" },
      // Section 02
      { type: "heading", content: "02 Solving the Cold Start" },
      { type: "text", content: "Code is useless without capital. The fatal flaw of any new DEX is the cold start problem, because without volume there are no fees, and without fees LPs won\u2019t deposit liquidity." },
      { type: "text", content: "While the engineering team built the infrastructure, we turned the operation into a B2B sales war room. To bypass the cold start entirely, we aggressively pitched global DeFi protocols, proving how our ve(3,3) mechanics offered superior capital efficiency compared to traditional models. By launch day, we had secured 15 heavy-hitting partners with hard capital committed to the platform. We didn't just build a DEX—we built a B2B liquidity marketplace." },
      { type: "text", content: "We then took our 15 committed partners and approached the KAVA Chain with a simple proposition, telling them we had the narrative, the partners, and the money on the table, and asking if they were going to amplify us. KAVA backed us entirely, providing over $200,000 in bootstrapping incentives." },
      { type: "image", content: "/images/equilibre-lock.jpeg" },
      { type: "image", content: "/images/equilibre-vote.jpeg" },
      { type: "break" },
      { type: "image", content: "/images/equilibre-unstake-2.jpeg" },
      { type: "image", content: "/images/equilibre-unstake.jpeg" },
      { type: "break" },
      { type: "image", content: "/images/equilibre-youtube-traction.jpeg", maxWidth: "55%" },
      // Section 03
      { type: "heading", content: "03 Execution & The Black Swan Again" },
      { type: "text", content: "The protocol exploded. We hit $50M+ TVL in one week, driving over $100M in total value to the KAVA ecosystem and generating over $330,000 in ARR in 2023. To sustain this momentum and reach beyond the hardcore DeFi niche, we aggressively overhauled the complex ve(3,3) UX by simplifying interaction loops, standardizing protocol documentation, and hosting weekly educational spaces." },
      { type: "text", content: "But just as the product reached maturity, we were hit by a systemic failure outside of our smart contracts again. In July 2023, the Multichain Bridge, which was KAVA\u2019s primary cross-chain bridge, suffered a [catastrophic exploit resulting in over $125 million in stolen assets](https://www.forbes.com/sites/digital-assets/2023/07/07/multichain-missing-120-million-of-cryptocurrencies-and-its-ceo-pulls-the-plug/). Because KAVA\u2019s ecosystem relied heavily on this provider, millions in value plummeted, and trust in the network evaporated overnight." },
      { type: "text", content: "Having already lost Hermes to a bridge exploit, watching Equilibre fall to another massive cross-chain hack was a definitive wake-up call. We had proven our ability to execute at the application layer, but this second systemic failure confirmed that the underlying infrastructure of DeFi carried an unmanageable level of counterparty risk." },
      { type: "image", content: "/images/equilibre-tvl-volume.png" },
      { type: "image", content: "/images/equilibre-cumulative-volume.png" },
      { type: "image", content: "/images/equilibre-cumulative-revenue.png" },
      { type: "image", content: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cursorful-video-1769447478333%20%28online-video-cutter.com%29-sVkQU6qlpNrvLNKLcgoFjrD6ee7PAx.mp4" },
    ],
  },
  {
    slug: "hermes-defi",
    captions: {
      "/images/hermes-banner.jpg": "Hermes Defi Initial Banner",
      "/images/hermes-iris-roadmap.png": "First Version Roadmap",
      "/images/hermes-start.jpeg": "Start of the journey",
      "/images/hermes-apollo-system.png": "Apollo's Vault System",
      "/images/hermes-validator.png": "Hermes Validator Node on Harmony",
      "/images/hermes-iris-users.png": "Active Users Growth Jan 2022",
      "/images/hermes-plutus-tvl.png": "TVL Stats Jan 2022",
      "/images/hermes-traction-x.png": "Twitter Analytics Jan 2022",
      "/images/hermes-1.jpeg": "Swap Page",
      "/images/hermes-landing.jpeg": "Landing Page",
      "/images/hermes-analytics.jpeg": "Analytics Page",
      "/images/hermes-roadmap.jpeg": "Hermes Defi 2022 Roadmap",
    },
    sections: [
      // Section 01
      { type: "heading", content: "01 The Shift from Player to Builder" },
      { type: "text", content: "I graduated with a business degree during the peak of the COVID pandemic and took a job as a web designer in Galicia. I spent my free hours trying to trade crypto with my modest salary, hoping to make life-changing money. Like most retail traders, my psychological discipline was lacking, and after losing my entire paycheck to a developer who drained a protocol, my perspective completely flipped. I realized I needed to stop being the liquidity and start being the architect." },
      { type: "text", content: "Using my next salary, I hired freelance developers and started sketching UI designs entirely by hand. My 15-year-old brother helped me digest the technical code while I focused on the whitepaper, branding, and community building. We observed the market, reverse-engineered successful mechanics, and added our own user experience layer to capture the hype. We launched a simple $55,000 pre-sale to test the waters, and it sold out in under 12 hours. Overnight, we went from zero to managing real capital." },
      { type: "image-mosaic", layout: "1-top-2-bottom", images: ["/images/hermes-banner.jpg", "/images/hermes-iris-roadmap.png", "/images/hermes-start.jpeg"] },
      { type: "break" },
      { type: "image", content: "https://www.youtube.com/watch?v=mdPcflj4Spw" },
      // Section 02
      { type: "heading", content: "02 Scaling the Operation" },
      { type: "text", content: "From there, it was a race to scale the protocol. We started on Polygon, but I quickly realized the strategic advantage of being a dominant player in a smaller ecosystem, which led us to pivot to the Harmony network. This move coincided with aggressively expanding our core team to include my long-time CTO Miguel, a Brazilian senior lead dev, an American COO, and a dedicated all around squad from Argentina. We maintained a strictly horizontal structure, focusing heavily on recruiting only top-tier developers and keeping them motivated with high compensation and flexible hours." },
      { type: "text", content: "We didn\u2019t just ship code, we built a highly engaged community. We created public goods like investment tracking spreadsheets, hosted weekly gaming sessions, and shipped merchandise to our most active users. Our impact even extended into the physical world when we [used protocol funds to back a local bakery in Michigan](https://x.com/hermesdefi/status/1491571632887975943?s=20), financing them to distribute food to families facing hardship. On the B2B side, we hit the ground running at ETH Denver, directly lobbying the Harmony [foundation for grants](https://talk.harmony.one/t/hermes-defi-the-hermes-protocol/10339) and securing [validator nodes](https://staking.harmony.one/validators/mainnet/one1ac8yehqexdnam9yza4q4y3zwrkyhrf4hqcpqy5) to build deep trust within the network. As our treasury grew, we hired a former JP Morgan analyst to deploy delta-neutral strategies, optimizing our internal yield multipliers and safely managing our rising Assets Under Management." },
      { type: "image-mosaic", layout: "2x2-grid", images: ["/images/hermes-validator.png", "/images/hermes-iris-users.png", "/images/hermes-plutus-tvl.png", "/images/hermes-traction-x.png"] },
      // Section 03
      { type: "heading", content: "03 The Peak and The Reset" },
      { type: "text", content: "Our growth metrics and deep community integration attracted serious venture capital attention. We pitched our most ambitious vision yet, which was a one-stop-shop decentralized exchange designed to monopolize liquidity on Harmony. We successfully closed a $550,000 funding round backed by [M6](https://medium.com/hermes-defi/hermes-defi-receives-a-175-000-investment-for-their-trader-focused-dex-launching-on-harmony-9f25dd99b6f7) and [Harmony](https://talk.harmony.one/t/hermes-defi-investment/12405), allowing us to scale into a global operation with 17 full-time employees across multiple time zones. To handle the immense pressure of running a massive protocol at 23 years old, I isolated myself in the Basque Country, working 14-hour days to ensure a flawless product launch." },
      { type: "text", content: "We shipped the highly anticipated DEX. But just weeks later, the entire ecosystem collapsed. In June 2022, [hackers compromised the Harmony Horizon bridge, stealing over $100 million](https://www.merklescience.com/blog/hack-track-analysis-of-harmonys-horizon-bridge-exploit) and completely draining the collateral that backed the network\u2019s assets. The exploit rendered the blockchain a ghost town practically overnight, destroying the economic viability of our protocol. With our revenue model shattered by an external macro failure, I was forced to scale down and close Hermes Defi, walking away with a brutal but foundational masterclass in scaling, leadership, and systemic risk." },
      { type: "image-mosaic", layout: "2x2-grid", images: ["/images/hermes-roadmap.jpeg", "/images/hermes-landing.jpeg", "/images/hermes-analytics.jpeg", "/images/hermes-1.jpeg"], compact: true },
    ],
  },
]
