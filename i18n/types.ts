export type Locale = "ko" | "en";

export type HomeDictionary = {
  locale: Locale;
  alternateLocale: Locale;
  metadata: {
    title: string;
    description: string;
    openGraphLocale: string;
  };
  language: {
    label: string;
    korean: string;
    english: string;
    switchTo: string;
  };
  brand: { name: string; tagline: string };
  appCopies: Record<string, string>;
  apps: {
    comingSoon: string;
  };
  support: {
    title: string;
    total: string;
    empty: string;
    countLine: string;
  };
  spend: {
    title: string;
    balance: string;
    empty: string;
  };
  drawer: {
    open: string;
    close: string;
    title: string;
    domestic: string;
    abroad: string;
    viewLedger: string;
    unavailable: string;
  };
  footer: {
    report: string;
  };
};
