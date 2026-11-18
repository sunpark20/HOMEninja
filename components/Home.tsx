import Link from "next/link";
import { apps } from "@/data/apps";
import { dictionaries, localePath, type Locale } from "@/i18n";
import AppList from "./AppList";
import SupportDrawer from "./SupportDrawer";
import { donations, formatKRW, sumKRW, supportLinks } from "@/data/support";

const ISSUE_FORM_URL = "https://github.com/sunpark20/errorreport/issues/new/choose";

export default function Home({ locale }: { locale: Locale }) {
  const dictionary = dictionaries[locale];
  const alternate = dictionary.alternateLocale;
  const listed = apps.filter((app) => app.status !== "retired");
  return (
    <>
      <header className="h-header">
        <div className="h-title">
          <div className="h-brand"><Link href={localePath(locale)}>{dictionary.brand.name}</Link></div>
          <p className="h-tagline">{dictionary.brand.tagline}</p>
        </div>
        <nav aria-label={dictionary.language.label} className="h-icons">
          <a href={ISSUE_FORM_URL} rel="noreferrer" target="_blank">{dictionary.footer.report}</a>
          <Link aria-label={dictionary.language.switchTo} hrefLang={alternate} href={localePath(alternate)} title={dictionary.language.switchTo}>
            <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></svg>
            <span className="h-lang"><b aria-current="true">{locale.toUpperCase()}</b> / {alternate.toUpperCase()}</span>
          </Link>
        </nav>
      </header>
      <div className="h-main">
        <AppList apps={listed} dictionary={dictionary} locale={locale} />
      </div>
      <SupportDrawer
        dictionary={dictionary}
        links={supportLinks}
        totalLabel={donations.length > 0 ? formatKRW(sumKRW(donations)) : null}
      />
    </>
  );
}
