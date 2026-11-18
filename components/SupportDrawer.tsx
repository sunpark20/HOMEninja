"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeDictionary } from "@/i18n";
import { SupportStatus } from "./SupportSection";

export default function SupportDrawer({
  dictionary,
  totalLabel,
  links,
}: {
  dictionary: HomeDictionary;
  totalLabel: string | null;
  links: { fairy: string | null; coffee: string | null };
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = dictionary.drawer;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tab = open ? 0 : -1;
  return (
    <>
      <button aria-expanded={open} className="h-tab" onClick={() => setOpen(true)} type="button">
        ‹ {t.open}
      </button>
      {open && <div aria-hidden="true" className="h-overlay" onClick={() => setOpen(false)} />}
      <aside aria-hidden={!open} aria-label={t.title} aria-modal={open} className="h-drawer" data-open={open} role="dialog">
        <div className="h-drawer-head">
          <strong>{t.title}</strong>
          <button aria-label={t.close} className="h-close" onClick={() => setOpen(false)} ref={closeRef} tabIndex={tab} type="button">×</button>
        </div>
        {totalLabel && (
          <div>
            <p className="h-drawer-label">{dictionary.support.total}</p>
            <p className="h-drawer-total">{totalLabel}</p>
          </div>
        )}
        {links.fairy && (
          <a className="h-cta h-cta-primary" href={links.fairy} rel="noreferrer" tabIndex={tab} target="_blank">
            <span>{t.domestic}</span><strong>Fairy →</strong>
          </a>
        )}
        {links.coffee && (
          <a className="h-cta" href={links.coffee} rel="noreferrer" tabIndex={tab} target="_blank">
            <span>{t.abroad}</span><strong>Buy me a coffee →</strong>
          </a>
        )}
        {!links.fairy && !links.coffee && <p className="h-drawer-label">{t.unavailable}</p>}
        <SupportStatus dictionary={dictionary} />
      </aside>
    </>
  );
}
