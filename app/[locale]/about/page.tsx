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
  results: "Past year’s results",
  proof: "App Store Connect · Oct 9, 2025–Oct 8, 2026 · UTC",
  proofDetail: "Reported app units: 2.49K, rounded to 2.5K. Includes free apps.",
  proofAlt: "App Store Connect sales report for Oct 9, 2025 to Oct 8, 2026, showing 2.49K app units",
  imageLink: "View original report",
  products: "Explore released products",
  visionTitle: "From everyday tools\nto harder problems.",
  visionBody: "Every app I release is a step toward tackling problems that once felt beyond the reach of an independent developer. I want to build software that uses AI to connect, interpret, and organize information that would be difficult to work through by hand—and turn it into something people can use.",
  visionGoal: "My goal is to grow Appcanvas into a sustainable independent business: creating products people find valuable enough to support, and using that foundation to keep improving them and take on more ambitious challenges.",
} as const;

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
              <p className="about-proof-value">2.5K</p>
              <p className="about-proof-source">{text.proof}<br />{text.proofDetail}</p>
              <a href="/appcanvas/app-store-performance-2026-10-08.png" target="_blank" rel="noreferrer">{text.imageLink}<span aria-hidden="true">↗</span></a>
            </div>
            <a className="about-proof-image" href="/appcanvas/app-store-performance-2026-10-08.png" target="_blank" rel="noreferrer" aria-label={text.imageLink}>
              <Image src="/appcanvas/app-store-performance-2026-10-08.png" alt={text.proofAlt} fill sizes="(max-width: 640px) calc(100vw - 32px), 400px" priority />
            </a>
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
