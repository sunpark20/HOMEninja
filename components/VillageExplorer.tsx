"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { apps, type AppRegistryEntry } from "@/data/apps";
import { tmt, type AppContent } from "@/data/tmt";
import { localePath, localizedAppName, localizedAppTagline, type Locale, type VillageDictionary } from "@/i18n";
import {
  residentAnimals,
  v5AppLayouts,
  villageAppVisuals,
  type ResidentAnimal,
  type VillageTree,
} from "@/data/village-visuals";
import VillageAdminEditModal from "./VillageAdminEditModal";
import VillageIcon from "./VillageIcon";

type Device = "mac" | "iphone" | "both";

type Resident = {
  name: string;
  animal: ResidentAnimal;
  device: Device;
};

type FallState = {
  phase: "falling" | "fallen";
  dx: number;
  dy: number;
  rotation: number;
};

type V5Style = CSSProperties & Record<`--${string}`, string | number>;

const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 900;
const SITE_ORIGIN = "https://homeninja.vercel.app";

const treeAppIds: Record<VillageTree, string[]> = {
  mac: ["centuryiris", "gnomon", "quick-quit", "breaklock-timer", "yt-bulk-downloader"],
  iphone: ["spamcall070", "callninja", "snapcart", "ytdi", "memory-palace", "eatwater", "earth"],
};

const mascotSpecs: Record<ResidentAnimal, {
  bubble: [number, number];
  image: [number, number];
  height: number;
  animation?: string;
}> = {
  owl: { bubble: [452, 716], image: [558, 782], height: 104, animation: "v5-bob 4.2s ease-in-out infinite" },
  hedgehog: { bubble: [452, 716], image: [556, 780], height: 106 },
  leopard: { bubble: [452, 716], image: [556, 792], height: 96 },
  rabbit: { bubble: [452, 716], image: [568, 794], height: 92, animation: "v5-hop 1.9s ease-in-out infinite" },
  sloth: { bubble: [420, 414], image: [446, 486], height: 78, animation: "v5-hang 5.4s ease-in-out infinite" },
  monkey: { bubble: [150, 144], image: [238, 202], height: 60, animation: "v5-bob 3.2s ease-in-out infinite" },
  eagle: { bubble: [469, 238], image: [540, 302], height: 94, animation: "v5-fly 9s ease-in-out infinite" },
  dove: { bubble: [474, 352], image: [556, 420], height: 72, animation: "v5-fly 11s ease-in-out infinite" },
};

function SceneAsset({ alt, className, src, style }: { alt: string; className?: string; src: string; style?: CSSProperties }) {
  return <img alt={alt} className={className} src={src} style={style} />;
}

function getApp(id: string) {
  return apps.find((app) => app.id === id) ?? null;
}

function appForTree(tree: VillageTree) {
  return treeAppIds[tree].map(getApp).filter((app): app is AppRegistryEntry => Boolean(app));
}

function leafStyle(appId: string, fall: FallState | undefined): V5Style {
  const layout = v5AppLayouts[appId];
  const visual = villageAppVisuals[appId];
  const style: V5Style = {
    left: layout.x,
    top: layout.y,
    "--leaf-tilt": `${visual?.tilt ?? 0}deg`,
    "--sway-duration": layout.swayDuration,
    "--sway-delay": layout.swayDelay,
  };
  if (fall) {
    style["--fall-dx"] = `${fall.dx}px`;
    style["--fall-dy"] = `${fall.dy}px`;
    style["--fall-r"] = `${fall.rotation}deg`;
  }
  return style;
}

function siteLink(url: string | null, locale: Locale) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.origin !== SITE_ORIGIN) return url;
    return `${localePath(locale, parsed.pathname)}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

function isInternalSiteLink(url: string | null) {
  if (!url) return false;
  try {
    return new URL(url).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

function interpolate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function LanguageSwitcher({ dictionary }: { dictionary: VillageDictionary }) {
  const options = [
    { locale: "ko" as const, label: dictionary.language.korean, lang: "ko" as const },
    { locale: "en" as const, label: dictionary.language.english, lang: "en" as const },
  ];
  return (
    <div aria-label={dictionary.language.label} className="v5-language-switcher" role="group">
      {options.map(({ label, lang, locale: targetLocale }, index) => {
        const isCurrent = targetLocale === dictionary.locale;
        return (
          <span key={targetLocale}>
            {index > 0 && <span aria-hidden="true">/</span>}
            <Link aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "is-current" : ""} href={localePath(targetLocale)} lang={lang}>{label}</Link>
          </span>
        );
      })}
    </div>
  );
}

function V5Leaf({
  app,
  dictionary,
  fall,
  locale,
  onOpen,
}: {
  app: AppRegistryEntry;
  dictionary: VillageDictionary;
  fall?: FallState;
  locale: Locale;
  onOpen: (app: AppRegistryEntry) => void;
}) {
  const layout = v5AppLayouts[app.id];
  const visual = villageAppVisuals[app.id];
  if (!layout || !visual) return null;
  const appName = localizedAppName(app, locale);

  return (
    <div className={`v5-leaf ${fall ? `is-${fall.phase}` : ""}`} data-leaf={app.id} style={leafStyle(app.id, fall)}>
      <div className="v5-leaf-sway">
        <div aria-hidden="true" className={`v5-leaf-card leaf-tone-${visual.tone} ${app.status === "unreleased" ? "is-soon" : ""}`}>
          <span className="v5-leaf-icon">{visual.label}</span>
          <span className="v5-leaf-name">{appName}</span>
          <span className="v5-leaf-copy">{dictionary.appCopies[app.id] ?? localizedAppTagline(app, locale)}</span>
        </div>
      </div>
      <button aria-label={interpolate(dictionary.detail.ariaLabel, { appName })} className="v5-leaf-hit" onClick={() => onOpen(app)} type="button" />
    </div>
  );
}

function V5Tree({
  appsForTree,
  dictionary,
  falls,
  locale,
  onOpen,
  onShake,
  platformRibbon,
  shaking,
  tree,
}: {
  appsForTree: AppRegistryEntry[];
  dictionary: VillageDictionary;
  falls: Record<string, FallState>;
  locale: Locale;
  onOpen: (app: AppRegistryEntry) => void;
  onShake: () => void;
  platformRibbon?: string;
  shaking: boolean;
  tree: VillageTree;
}) {
  return (
    <div className={`v5-tree v5-tree-${tree} ${shaking ? "is-shaking" : ""}`}>
      <SceneAsset alt={dictionary.scene.treeAlt[tree]} className="v5-tree-image" src="/village/deciduous-tree.svg" />
      <div className="v5-tree-leaves">
        {appsForTree.map((app) => <V5Leaf app={app} dictionary={dictionary} fall={falls[app.id]} key={app.id} locale={locale} onOpen={onOpen} />)}
      </div>
      <V5PlatformSign dictionary={dictionary} ribbon={platformRibbon} type={tree} />
      <button aria-label={dictionary.scene.shakeTree[tree]} className={`v5-trunk-hit v5-trunk-hit-${tree}`} onClick={onShake} type="button">
        {tree === "mac" && <span className="v5-shake-hint"><VillageIcon name="wind" size={15} /><span>{dictionary.scene.shakeTree.mac}</span></span>}
      </button>
    </div>
  );
}

function V5PlatformSign({ dictionary, ribbon, type }: { dictionary: VillageDictionary; ribbon?: string; type: "mac" | "iphone" }) {
  return (
    <div className={`v5-platform-sign v5-platform-sign-${type}`}>
      {ribbon && <div className="v5-ribbon">{ribbon}</div>}
      <span className="v5-sign-stem" />
      <div className="v5-sign-plaque">
        <VillageIcon name={type === "mac" ? "monitor" : "phone"} size={15} />
        <span>{dictionary.scene.platform[type]}</span>
      </div>
    </div>
  );
}

function V5House({ dictionary, resident }: { dictionary: VillageDictionary; resident: Resident | null }) {
  return (
    <div className="v5-house" aria-label={resident ? interpolate(dictionary.scene.houseOf, { name: resident.name }) : dictionary.scene.houseEmpty}>
      <div className="v5-house-body" />
      <div className="v5-house-roof" />
      <div className="v5-house-door" />
      <div className="v5-house-window" />
      {resident && <div className="v5-house-sign">{interpolate(dictionary.scene.houseOf, { name: resident.name })}</div>}
    </div>
  );
}

function V5Mailbox({
  dictionary,
  locale,
  mailOpen,
  mailRead,
  onToggle,
  resident,
}: {
  dictionary: VillageDictionary;
  locale: Locale;
  mailOpen: boolean;
  mailRead: boolean;
  onToggle: () => void;
  resident: Resident | null;
}) {
  const upcoming = apps.filter((app) => app.status === "unreleased");
  return (
    <div className="v5-mailbox-wrap">
      {mailOpen && (
        <div className="v5-mail-panel" onClick={(event) => event.stopPropagation()}>
          <div className="v5-mail-title"><VillageIcon name="mail" size={16} />{resident ? interpolate(dictionary.scene.mailboxOf, { name: resident.name }) : dictionary.scene.mailbox}</div>
          {resident ? (
            <div className="v5-mail-notes">
              {upcoming.map((app) => <div key={app.id}><span className="v5-mail-dot" />{interpolate(dictionary.scene.upcomingNotice, { appName: localizedAppName(app, locale) })}</div>)}
            </div>
          ) : <p>{dictionary.scene.emptyMailbox} {dictionary.scene.emptyMailboxHint}</p>}
        </div>
      )}
      <button aria-expanded={mailOpen} aria-label={dictionary.scene.mailboxOpen} className="v5-mailbox-button" onClick={onToggle} type="button">
        <SceneAsset alt={dictionary.scene.mailbox} src={resident && !mailRead ? "/village/closed-mailbox-with-raised-flag.svg" : "/village/open-mailbox-with-lowered-flag.svg"} />
      </button>
    </div>
  );
}

function V5Mascot({ animal, bubble, dictionary }: { animal: ResidentAnimal; bubble: string; dictionary: VillageDictionary }) {
  const spec = mascotSpecs[animal];
  const animalAsset = residentAnimals.find((item) => item.id === animal)?.asset ?? "/village/owl.svg";
  return (
    <div className="v5-mascot-layer">
      <div className="v5-mascot-bubble" style={{ left: spec.bubble[0], top: spec.bubble[1] }}>{bubble}</div>
      <SceneAsset alt={dictionary.scene.mascotAlt[animal]} className="v5-mascot" src={animalAsset} style={{ left: spec.image[0], top: spec.image[1], height: spec.height, animation: spec.animation }} />
    </div>
  );
}

function V5Detail({ app, dictionary, locale, onClose }: { app: AppRegistryEntry | null; dictionary: VillageDictionary; locale: Locale; onClose: () => void }) {
  if (!app) return null;
  const visual = villageAppVisuals[app.id];
  const layout = v5AppLayouts[app.id];
  const appName = localizedAppName(app, locale);
  const privacyHref = siteLink(app.web.privacy, locale);
  const supportHref = siteLink(app.web.support, locale);
  return (
    <div className="v5-overlay v5-detail-overlay" onClick={onClose} role="presentation">
      <section aria-label={interpolate(dictionary.detail.ariaLabel, { appName })} aria-modal="true" className="v5-detail-modal" onClick={(event) => event.stopPropagation()} role="dialog">
        <div className="v5-detail-heading">
          <div className={`v5-detail-mark leaf-tone-${visual?.tone ?? "sage"}`}>{visual?.label ?? "APP"}</div>
          <button aria-label={dictionary.detail.close} className="v5-close-button" onClick={onClose} type="button"><VillageIcon name="close" size={20} /></button>
        </div>
        <div className="v5-detail-title"><h2>{appName}</h2><p>{localizedAppName(app, dictionary.alternateLocale)}</p></div>
        <p className="v5-detail-copy">{dictionary.appCopies[app.id] ?? localizedAppTagline(app, locale)}</p>
        <div className="v5-detail-facts"><span>{app.minOS}</span><span>v{app.version}</span><span>{app.platforms.join(" · ")}</span></div>
        <div className="v5-detail-shot">{dictionary.detail.screenshotPlaceholder}</div>
        <div className="v5-detail-actions">
          {app.downloads.filter((download) => download.url).map((download) => <a className="v5-detail-cta" href={download.url ?? undefined} key={`${app.id}-${download.platform}`} rel="noreferrer" target="_blank"><VillageIcon name="download" size={17} />{dictionary.detail.downloadLabels[download.platform] ?? download.label}</a>)}
          {app.status === "unreleased" && <span className="v5-detail-cta is-soon">{dictionary.detail.comingSoon}</span>}
          <a className="v5-detail-report" href={app.reporting.url} rel="noreferrer" target="_blank">{dictionary.detail.report}</a>
        </div>
        <div className="v5-detail-links">
          {privacyHref && <a href={privacyHref} rel={isInternalSiteLink(app.web.privacy) ? undefined : "noreferrer"} target={isInternalSiteLink(app.web.privacy) ? undefined : "_blank"}>{dictionary.detail.privacy}</a>}
          {supportHref && <a href={supportHref} rel={isInternalSiteLink(app.web.support) ? undefined : "noreferrer"} target={isInternalSiteLink(app.web.support) ? undefined : "_blank"}>{dictionary.detail.support}</a>}
        </div>
        <button className="v5-detail-back" onClick={onClose} type="button">{dictionary.detail.dismiss}</button>
      </section>
    </div>
  );
}

function V5ResidentForm({
  animal,
  device,
  dictionary,
  done,
  name,
  onAnimal,
  onDevice,
  onName,
  onClose,
  onSubmit,
  resident,
}: {
  animal: ResidentAnimal;
  device: Device;
  dictionary: VillageDictionary;
  done: boolean;
  name: string;
  onAnimal: (animal: ResidentAnimal) => void;
  onDevice: (device: Device) => void;
  onName: (name: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  resident: Resident | null;
}) {
  if (done) {
    return (
      <div className="v5-form-success">
        <div className="v5-stamp">{dictionary.resident.successStamp.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</div>
        <div className="v5-success-title">{interpolate(dictionary.resident.welcome, { name: name || resident?.name || dictionary.resident.defaultName })}</div>
        <p>{dictionary.resident.successCopy}</p>
        <button className="v5-form-close" onClick={onClose} type="button">{dictionary.resident.continue}</button>
      </div>
    );
  }

  return (
    <form className="v5-resident-form" onSubmit={onSubmit}>
      <div className="v5-form-header"><div>{dictionary.resident.formTitle}</div><span>{dictionary.resident.formHint}</span></div>
      <div className="v5-form-body">
        <label>{dictionary.resident.name}<input maxLength={24} onChange={(event) => onName(event.target.value)} placeholder={dictionary.resident.namePlaceholder} value={name} /></label>
        <div className="v5-form-field"><div className="v5-form-label">{dictionary.resident.appearance} <span>· {dictionary.resident.appearanceHint}</span></div><div className="v5-animal-grid">
          {residentAnimals.map((item) => <button aria-pressed={animal === item.id} className={`v5-animal-choice ${animal === item.id ? "is-selected" : ""}`} key={item.id} onClick={() => onAnimal(item.id)} type="button"><span className="v5-animal-image"><SceneAsset alt="" src={item.asset} /></span><strong>{dictionary.resident.animals[item.id].label}</strong><small>{dictionary.resident.animals[item.id].hint}</small></button>)}
        </div></div>
        <div className="v5-form-field"><div className="v5-form-label">{dictionary.resident.device}</div><div className="v5-device-row">{(["mac", "iphone", "both"] as const).map((item) => <button aria-pressed={device === item} className={`v5-device-choice ${device === item ? "is-selected" : ""}`} key={item} onClick={() => onDevice(item)} type="button">{dictionary.resident.devices[item]}</button>)}</div></div>
        <div className="v5-form-actions"><button className="v5-form-submit" type="submit">{dictionary.resident.submit}</button><button className="v5-form-skip" onClick={onClose} type="button">{dictionary.resident.skip}</button></div>
        <p className="v5-privacy-note">{dictionary.resident.privacyNote}</p>
      </div>
    </form>
  );
}

function StoryBoard({ dictionary, locale, onEdit, overrides }: { dictionary: VillageDictionary; locale: Locale; onEdit: (app: AppRegistryEntry) => void; overrides: Record<string, AppContent> }) {
  const stories = useMemo(() => apps.filter((app) => tmt[app.id]?.entries?.length), []);
  return (
    <section className="story-board" id="tmt-board">
      <div className="board-heading"><div><p className="eyebrow">{dictionary.board.eyebrow}</p><h2>{dictionary.board.title}</h2></div><VillageIcon name="board" size={27} /></div>
      <p className="board-intro">{dictionary.board.intro}</p>
      <div className="story-list">{stories.map((app) => { const content = overrides[app.id] ?? tmt[app.id]; return <details className="story-entry" key={app.id}><summary><span className="story-dot" />{localizedAppName(app, locale)}</summary><div className="story-body">{content.entries.map((entry, index) => <p key={`${app.id}-${index}`}>{entry}</p>)}<button className="admin-edit-link" onClick={() => onEdit(app)} type="button">{dictionary.board.adminEdit}</button></div></details>; })}</div>
    </section>
  );
}

export default function VillageExplorer({ dictionary, locale }: { dictionary: VillageDictionary; locale: Locale }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [stageScale, setStageScale] = useState(1);
  const [falls, setFalls] = useState<Record<string, FallState>>({});
  const [shaking, setShaking] = useState<VillageTree | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppRegistryEntry | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formDone, setFormDone] = useState(false);
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState<ResidentAnimal>("owl");
  const [device, setDevice] = useState<Device>("both");
  const [resident, setResident] = useState<Resident | null>(null);
  const [returning, setReturning] = useState(false);
  const [gift, setGift] = useState<string | null>(null);
  const [mailOpen, setMailOpen] = useState(false);
  const [mailRead, setMailRead] = useState(false);
  const [adminApp, setAdminApp] = useState<AppRegistryEntry | null>(null);
  const [contentOverrides, setContentOverrides] = useState<Record<string, AppContent>>({});

  useEffect(() => {
    const element = shellRef.current;
    if (!element) return;
    const updateScale = () => setStageScale(Math.min(1, element.getBoundingClientRect().width / STAGE_WIDTH));
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("appvillage.resident");
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Resident> & { dev?: Device };
      if (!saved.name) return;
      const next: Resident = { name: saved.name, animal: saved.animal ?? "owl", device: saved.device ?? saved.dev ?? "both" };
      setResident(next);
      setName(next.name);
      setAnimal(next.animal);
      setDevice(next.device);
      setReturning(true);
    } catch {
      window.localStorage.removeItem("appvillage.resident");
    }
  }, []);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  function later(callback: () => void, delay: number) {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }

  function dropLeaf(id: string) {
    const layout = v5AppLayouts[id];
    if (!layout || falls[id]) return;
    const dx = layout.landingX - layout.x + Math.round(Math.random() * 10 - 5);
    const dy = layout.landingY - layout.y + Math.round(Math.random() * 8);
    const rotation = (dx >= 0 ? 1 : -1) * (368 + Math.round(Math.random() * 14));
    const state: FallState = { phase: "falling", dx, dy, rotation };
    setFalls((current) => ({ ...current, [id]: state }));
    later(() => setFalls((current) => ({ ...current, [id]: { ...state, phase: "fallen" } })), 1750);
  }

  function shakeTree(tree: VillageTree) {
    if (shaking) return;
    const target = appForTree(tree).find((app) => app.status !== "unreleased" && !falls[app.id]);
    setShaking(tree);
    later(() => {
      setShaking(null);
      if (target) dropLeaf(target.id);
    }, 220);
  }

  function submitResident(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Resident = { name: name.trim() || dictionary.resident.defaultName, animal, device };
    window.localStorage.setItem("appvillage.resident", JSON.stringify(next));
    setResident(next);
    setReturning(false);
    setMailRead(false);
    const giftId = device === "iphone" ? "snapcart" : "breaklock-timer";
    setGift(giftId);
    dropLeaf(giftId);
    setFormDone(true);
  }

  const bubble = resident
    ? gift && !formOpen
      ? interpolate(dictionary.scene.bubble.gift, { name: resident.name })
      : returning
        ? interpolate(dictionary.scene.bubble.returning, { name: resident.name })
        : interpolate(dictionary.scene.bubble.resident, { name: resident.name })
    : dictionary.scene.bubble.visitor;
  const signRibbon = resident ? interpolate(dictionary.scene.bubble.deviceRibbon, { name: resident.name }) : undefined;

  return (
    <div className="village-page v5-page">
      <section className="v5-stage-shell" ref={shellRef} style={{ height: STAGE_HEIGHT * stageScale }}>
        <div className="v5-stage" style={{ transform: `scale(${stageScale})` }}>
          <div className="v5-sky" />
          <LanguageSwitcher dictionary={dictionary} />
          <SceneAsset alt="" className="v5-cloud v5-cloud-one" src="/village/cloud.svg" />
          <SceneAsset alt="" className="v5-cloud v5-cloud-two" src="/village/cloud.svg" />
          <SceneAsset alt="" className="v5-cloud v5-cloud-three" src="/village/cloud.svg" />
          <div className="v5-hill v5-hill-far" /><div className="v5-hill v5-hill-near" /><div className="v5-grass" /><div className="v5-front-ground" />
          <SceneAsset alt="" className="v5-ground-mushroom" src="/village/mushroom.svg" /><SceneAsset alt="" className="v5-ground-clover" src="/village/four-leaf-clover.svg" /><SceneAsset alt="" className="v5-ground-blossom" src="/village/seedling.svg" /><SceneAsset alt="" className="v5-ground-seedling" src="/village/seedling.svg" /><SceneAsset alt="" className="v5-ground-herb" src="/village/herb.svg" />

          <div className="v5-title-sign"><div className="v5-title-ropes"><span /><span /></div><div className="v5-title-plaque">{dictionary.scene.title}</div></div>
          <button className="v5-application-button" onClick={() => { setFormDone(false); setFormOpen(true); }} type="button"><VillageIcon name="home" size={19} />{resident ? dictionary.scene.reapply : dictionary.scene.apply}</button>

          <V5Tree appsForTree={appForTree("mac")} dictionary={dictionary} falls={falls} locale={locale} onOpen={setSelectedApp} onShake={() => shakeTree("mac")} platformRibbon={resident && (resident.device === "mac" || resident.device === "both") ? signRibbon : undefined} shaking={shaking === "mac"} tree="mac" />
          <V5Tree appsForTree={appForTree("iphone")} dictionary={dictionary} falls={falls} locale={locale} onOpen={setSelectedApp} onShake={() => shakeTree("iphone")} platformRibbon={resident && (resident.device === "iphone" || resident.device === "both") ? signRibbon : undefined} shaking={shaking === "iphone"} tree="iphone" />

          <div className="v5-ground-characters">
            <div className="v5-house-wrap"><V5House dictionary={dictionary} resident={resident} /></div>
            <V5Mailbox dictionary={dictionary} locale={locale} mailOpen={mailOpen} mailRead={mailRead} onToggle={() => { setMailOpen((open) => !open); setMailRead(true); }} resident={resident} />
            <V5Mascot animal={animal} bubble={bubble} dictionary={dictionary} />
          </div>
          <div className="v5-grain" />

          {selectedApp && <V5Detail app={selectedApp} dictionary={dictionary} locale={locale} onClose={() => setSelectedApp(null)} />}
          {formOpen && <div className="v5-overlay v5-form-overlay" onClick={() => { setFormOpen(false); setFormDone(false); }} role="presentation"><section aria-label={dictionary.resident.dialogLabel} className="v5-form-modal" onClick={(event) => event.stopPropagation()} role="dialog"><button aria-label={dictionary.detail.close} className="v5-close-button v5-form-close-top" onClick={() => { setFormOpen(false); setFormDone(false); }} type="button"><VillageIcon name="close" size={20} /></button><V5ResidentForm animal={animal} device={device} dictionary={dictionary} done={formDone} name={name} onAnimal={setAnimal} onDevice={setDevice} onName={setName} onClose={() => { setFormOpen(false); setFormDone(false); }} onSubmit={submitResident} resident={resident} /></section></div>}
        </div>
      </section>

      <div className="v5-after-scene"><StoryBoard dictionary={dictionary} locale={locale} onEdit={setAdminApp} overrides={contentOverrides} /><footer className="village-footer"><span>{dictionary.footer.signature}</span><span aria-label={dictionary.footer.ariaLabel} className="village-footer-meta"><span className="village-footer-links"><Link href={localePath(locale, "/privacy")}>{dictionary.footer.privacy}</Link><span aria-hidden="true"> · </span><Link href={localePath(locale, "/support/eatwater")}>{dictionary.footer.support}</Link><span aria-hidden="true"> · </span><Link href={localePath(locale, "/terms/eatwater")}>{dictionary.footer.terms}</Link></span><span className="village-credit">{dictionary.footer.credit}</span></span></footer></div>
      <VillageAdminEditModal dictionary={dictionary} obj={adminApp ? { id: adminApp.id, name: localizedAppName(adminApp, locale), description: localizedAppTagline(adminApp, locale) } : null} onClose={() => setAdminApp(null)} onSaved={(appId, data) => setContentOverrides((current) => ({ ...current, [appId]: data }))} />
    </div>
  );
}
