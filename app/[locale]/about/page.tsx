import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n";

const text = {
  title: "Appcanvas | Small everyday improvements with AI",
  description: "Appcanvas is Sunguk Park's independent studio building practical Mac and iPhone apps with AI tools.",
  eyebrow: "Independent app studio · Jeju, South Korea",
  headline: "Small everyday improvements.\nMade with AI.",
  intro: "I’m Sunguk Park, the founder of Appcanvas. I build and release practical Mac and iPhone apps, using AI tools to bring ideas to life and exploring how AI can make the apps themselves more useful.",
  results: "Results so far",
  downloads: "Downloads",
  reviews: "Reviews",
  asOf: "As of Oct 10, 2026",
  motto: "Every single user matters.",
  products: "Explore released products",
  visionTitle: "From everyday tools\nto harder problems.",
  visionBody: "Every app I release is a step toward tackling problems that once felt beyond the reach of an independent developer. I want to build software that uses AI to connect, interpret, and organize information that would be difficult to work through by hand—and turn it into something people can use.",
  visionGoal: "My goal is to grow Appcanvas into a sustainable independent business: creating products people find valuable enough to support, and using that foundation to keep improving them and take on more ambitious challenges.",
} as const;

const proofImages = [
  {
    className: "about-proof-note--app-store-sales",
    src: "/appcanvas/app-store-performance-2026-10-08.png",
    alt: "App Store Connect report showing 2.49K app units for the 365 days ending Oct 8, 2026",
  },
  {
    className: "about-proof-note--google-play",
    src: "/appcanvas/google-play-memory-palace-2026-10-10.png",
    alt: "Google Play listing for Memory Palace showing 215 reviews and 100K plus downloads",
  },
  {
    className: "about-proof-note--app-store-reviews",
    src: "/appcanvas/app-store-reviews-2026-10-10.png",
    alt: "App Store review dashboard showing 20 total reviews",
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return {
    title: text.title,
    description: text.description,
    alternates: { canonical: "/en/about" },
    openGraph: { title: text.title, description: text.description, type: "website", locale: "en_US" },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return (
    <main className="about-page" lang="en">
      <header className="about-header">
        <Link className="about-wordmark" href="/en/about">appcanvas</Link>
        <section aria-label="Business information" className="about-business">
          <p className="about-business-label">Business information</p>
          <p><strong>Appcanvas</strong><span>Sunguk Park · Founder</span></p>
          <p><span>Business registration no. 741-01-03949</span><span>Sinseo-ro, Seogwipo-si, Jeju, South Korea</span><a href="mailto:founder@ninjaturtle.win">founder@ninjaturtle.win</a></p>
        </section>
      </header>

      <div className="about-content">
        <section className="about-hero">
          <p className="about-eyebrow">{text.eyebrow}</p>
          <h1>{text.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="about-intro">{text.intro}</p>
          <Link className="about-button" href="/en">{text.products}<span aria-hidden="true">↗</span></Link>
          <div className="about-proof">
            <div className="about-proof-copy">
              <p className="about-proof-label">{text.results}</p>
              <dl className="about-proof-metrics">
                <div className="about-proof-metric">
                  <dt>{text.downloads}</dt>
                  <dd>102.5K+</dd>
                </div>
                <div className="about-proof-metric">
                  <dt>{text.reviews}</dt>
                  <dd>235</dd>
                </div>
              </dl>
              <p className="about-proof-source">{text.asOf}</p>
              <p className="about-proof-motto">{text.motto}</p>
            </div>
            <div aria-label="Supporting download and review reports" className="about-proof-collage" role="group">
              {proofImages.map((proof) => (
                <a
                  aria-label={`Open image: ${proof.alt}`}
                  className={`about-proof-note ${proof.className}`}
                  href={proof.src}
                  key={proof.src}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image alt={proof.alt} fill sizes="(max-width: 640px) 65vw, 280px" src={proof.src} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="about-vision" className="about-vision">
          <p className="about-eyebrow">The ambition</p>
          <h2 id="about-vision">{text.visionTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <div className="about-vision-copy"><p>{text.visionBody}</p><p>{text.visionGoal}</p></div>
        </section>

        <footer className="about-footer">
          <Link href="/en">Explore App Village <span aria-hidden="true">↗</span></Link>
          <span>© {new Date().getFullYear()} Appcanvas · Sunguk Park</span>
        </footer>
      </div>
    </main>
  );
}
