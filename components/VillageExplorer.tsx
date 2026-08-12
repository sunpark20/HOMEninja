"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { apps, type AppRegistryEntry } from "@/data/apps";
import { tmt, type AppContent } from "@/data/tmt";
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

const treeAppIds: Record<VillageTree, string[]> = {
  mac: ["centuryiris", "gnomon", "breaklock-timer", "yt-bulk-downloader"],
  iphone: ["spamcall070", "callninja", "snapcart", "memory-palace", "eatwater", "earth"],
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

const mascotAlt: Record<ResidentAnimal, string> = {
  owl: "부엉이 이장",
  hedgehog: "고슴도치 이장",
  leopard: "표범 이장",
  rabbit: "토끼 이장",
  sloth: "나무늘보 이장",
  monkey: "원숭이 이장",
  eagle: "독수리 이장",
  dove: "비둘기 이장",
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

function V5Leaf({
  app,
  fall,
  onOpen,
}: {
  app: AppRegistryEntry;
  fall?: FallState;
  onOpen: (app: AppRegistryEntry) => void;
}) {
  const layout = v5AppLayouts[app.id];
  const visual = villageAppVisuals[app.id];
  if (!layout || !visual) return null;

  return (
    <div className={`v5-leaf ${fall ? `is-${fall.phase}` : ""}`} data-leaf={app.id} style={leafStyle(app.id, fall)}>
      <div className="v5-leaf-sway">
        <div aria-hidden="true" className={`v5-leaf-card leaf-tone-${visual.tone} ${app.status === "unreleased" ? "is-soon" : ""}`}>
          <span className="v5-leaf-icon">{visual.label}</span>
          <span className="v5-leaf-name">{app.displayNameKo}</span>
          <span className="v5-leaf-copy">{layout.shortCopy}</span>
        </div>
      </div>
      <button aria-label={`${app.displayNameKo} 상세 보기`} className="v5-leaf-hit" onClick={() => onOpen(app)} type="button" />
    </div>
  );
}

function V5Tree({
  appsForTree,
  falls,
  onOpen,
  onReset,
  onShake,
  platformRibbon,
  shaking,
  tree,
}: {
  appsForTree: AppRegistryEntry[];
  falls: Record<string, FallState>;
  onOpen: (app: AppRegistryEntry) => void;
  onReset?: () => void;
  onShake: () => void;
  platformRibbon?: string;
  shaking: boolean;
  tree: VillageTree;
}) {
  return (
    <div className={`v5-tree v5-tree-${tree} ${shaking ? "is-shaking" : ""}`}>
      <SceneAsset alt={`${tree === "mac" ? "Mac" : "iPhone"} 앱 나무`} className="v5-tree-image" src="/village/deciduous-tree.svg" />
      <div className="v5-tree-leaves">
        {appsForTree.map((app) => <V5Leaf app={app} fall={falls[app.id]} key={app.id} onOpen={onOpen} />)}
      </div>
      <V5PlatformSign ribbon={platformRibbon} type={tree} />
      <button aria-label={`${tree === "mac" ? "Mac" : "iPhone"} 나무 밑동 흔들기`} className={`v5-trunk-hit v5-trunk-hit-${tree}`} onClick={onShake} type="button">
        {tree === "mac" && <span className="v5-shake-hint"><VillageIcon name="wind" size={15} /><span>나무 흔들기</span></span>}
      </button>
      {tree === "mac" && onReset && <button aria-label="잎 다시 매달기" className="v5-reset-button" onClick={onReset} type="button"><VillageIcon name="refresh" size={13} /><span>다시 매달기</span></button>}
    </div>
  );
}

function V5PlatformSign({ type, ribbon }: { type: "mac" | "iphone"; ribbon?: string }) {
  return (
    <div className={`v5-platform-sign v5-platform-sign-${type}`}>
      {ribbon && <div className="v5-ribbon">{ribbon}</div>}
      <span className="v5-sign-stem" />
      <div className="v5-sign-plaque">
        <VillageIcon name={type === "mac" ? "monitor" : "phone"} size={15} />
        <span>{type === "mac" ? "MAC" : "iPhone"}</span>
      </div>
    </div>
  );
}

function V5House({ resident }: { resident: Resident | null }) {
  return (
    <div className="v5-house" aria-label={resident ? `${resident.name}의 집` : "빈 집"}>
      <div className="v5-house-body" />
      <div className="v5-house-roof" />
      <div className="v5-house-door" />
      <div className="v5-house-window" />
      {resident && <div className="v5-house-sign">{resident.name}의 집</div>}
    </div>
  );
}

function V5Mailbox({
  mailOpen,
  mailRead,
  onToggle,
  resident,
}: {
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
          <div className="v5-mail-title"><VillageIcon name="mail" size={16} />{resident ? `${resident.name}의 우편함` : "마을 우편함"}</div>
          {resident ? (
            <div className="v5-mail-notes">
              {upcoming.map((app) => <div key={app.id}><span className="v5-mail-dot" />{app.displayNameKo} · 출시 알림 예약됨</div>)}
            </div>
          ) : <p>아직 비어 있어. 입주신청서를 쓰면 새 앱 소식이 여기로 들어와.</p>}
        </div>
      )}
      <button aria-expanded={mailOpen} aria-label="우편함 열기" className="v5-mailbox-button" onClick={onToggle} type="button">
        <SceneAsset alt="우편함" src={resident && !mailRead ? "/village/closed-mailbox-with-raised-flag.svg" : "/village/open-mailbox-with-lowered-flag.svg"} />
      </button>
    </div>
  );
}

function V5Mascot({ animal, bubble }: { animal: ResidentAnimal; bubble: string }) {
  const spec = mascotSpecs[animal];
  const animalAsset = residentAnimals.find((item) => item.id === animal)?.asset ?? "/village/owl.svg";
  return (
    <div className="v5-mascot-layer">
      <div className="v5-mascot-bubble" style={{ left: spec.bubble[0], top: spec.bubble[1] }}>{bubble}</div>
      <SceneAsset alt={mascotAlt[animal]} className="v5-mascot" src={animalAsset} style={{ left: spec.image[0], top: spec.image[1], height: spec.height, animation: spec.animation }} />
    </div>
  );
}

function V5Detail({ app, onClose }: { app: AppRegistryEntry | null; onClose: () => void }) {
  if (!app) return null;
  const visual = villageAppVisuals[app.id];
  const layout = v5AppLayouts[app.id];
  return (
    <div className="v5-overlay v5-detail-overlay" onClick={onClose} role="presentation">
      <section aria-label={`${app.displayNameKo} 상세 정보`} aria-modal="true" className="v5-detail-modal" onClick={(event) => event.stopPropagation()} role="dialog">
        <div className="v5-detail-heading">
          <div className={`v5-detail-mark leaf-tone-${visual?.tone ?? "sage"}`}>{visual?.label ?? "APP"}</div>
          <button aria-label="닫기" className="v5-close-button" onClick={onClose} type="button"><VillageIcon name="close" size={20} /></button>
        </div>
        <div className="v5-detail-title"><h2>{app.displayNameKo}</h2><p>{app.displayName}</p></div>
        <p className="v5-detail-copy">{layout?.shortCopy ?? app.taglineKo}</p>
        <div className="v5-detail-facts"><span>{app.minOS}</span><span>v{app.version}</span><span>{app.platforms.join(" · ")}</span></div>
        <div className="v5-detail-shot">앱 스크린샷 준비 중</div>
        <div className="v5-detail-actions">
          {app.downloads.filter((download) => download.url).map((download) => <a className="v5-detail-cta" href={download.url ?? undefined} key={`${app.id}-${download.platform}`} rel="noreferrer" target="_blank"><VillageIcon name="download" size={17} />{download.label}</a>)}
          {app.status === "unreleased" && <span className="v5-detail-cta is-soon">출시 알림은 입주 후 받아요</span>}
          <a className="v5-detail-report" href={app.reporting.url} rel="noreferrer" target="_blank">GitHub에 신고</a>
        </div>
        <div className="v5-detail-links">{app.web.privacy && <a href={app.web.privacy} rel="noreferrer" target="_blank">개인정보처리방침</a>}{app.web.support && <a href={app.web.support} rel="noreferrer" target="_blank">지원 페이지</a>}</div>
        <button className="v5-detail-back" onClick={onClose} type="button">닫기</button>
      </section>
    </div>
  );
}

function V5ResidentForm({
  animal,
  device,
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
        <div className="v5-stamp">입주<br />승인</div>
        <div className="v5-success-title">환영해, {name || resident?.name || "이웃"}!</div>
        <p>새 앱이 마을에 들어오면 우편함에 넣어둘게. 잎 한 장은 환영 선물로 떨어뜨려 뒀어.</p>
        <button className="v5-form-close" onClick={onClose} type="button">마을 구경 계속하기</button>
      </div>
    );
  }

  return (
    <form className="v5-resident-form" onSubmit={onSubmit}>
      <div className="v5-form-header"><div>입주신청서</div><span>선택 사항 · 신청 없이도 앱을 받을 수 있어요</span></div>
      <div className="v5-form-body">
        <label>이름<input maxLength={24} onChange={(event) => onName(event.target.value)} placeholder="마을에서 불릴 이름" value={name} /></label>
        <div className="v5-form-field"><div className="v5-form-label">마을에서 지낼 모습 <span>· 사는 곳도 같이 정해져요</span></div><div className="v5-animal-grid">
          {residentAnimals.map((item) => <button className={`v5-animal-choice ${animal === item.id ? "is-selected" : ""}`} key={item.id} onClick={() => onAnimal(item.id)} type="button"><span className="v5-animal-image"><SceneAsset alt="" src={item.asset} /></span><strong>{item.label}</strong><small>{item.id === "sloth" ? "나무에 매달림" : item.id === "monkey" ? "나무 꼭대기에 앉음" : "집 앞에 있음"}</small></button>)}
        </div></div>
        <div className="v5-form-field"><div className="v5-form-label">주로 쓰는 기기</div><div className="v5-device-row">{(["mac", "iphone", "both"] as const).map((item) => <button className={`v5-device-choice ${device === item ? "is-selected" : ""}`} key={item} onClick={() => onDevice(item)} type="button">{item === "mac" ? "Mac" : item === "iphone" ? "iPhone" : "둘 다"}</button>)}</div></div>
        <div className="v5-form-actions"><button className="v5-form-submit" type="submit">도장 꾹, 입주 신청</button><button className="v5-form-skip" onClick={onClose} type="button">그냥 둘러볼게요</button></div>
        <p className="v5-privacy-note">이름·동물·기기는 이 브라우저에만 저장되며 서버로 전송하지 않아요.</p>
      </div>
    </form>
  );
}

function StoryBoard({ onEdit, overrides }: { onEdit: (app: AppRegistryEntry) => void; overrides: Record<string, AppContent> }) {
  const stories = useMemo(() => apps.filter((app) => tmt[app.id]?.entries?.length), []);
  return (
    <section className="story-board" id="tmt-board">
      <div className="board-heading"><div><p className="eyebrow">마을 게시판</p><h2>만들며 적은 이야기</h2></div><VillageIcon name="board" size={27} /></div>
      <p className="board-intro">앱을 만들며 남긴 Too Much Talk을 마을 게시판으로 옮겼어요.</p>
      <div className="story-list">{stories.map((app) => { const content = overrides[app.id] ?? tmt[app.id]; return <details className="story-entry" key={app.id}><summary><span className="story-dot" />{app.displayNameKo}</summary><div className="story-body">{content.entries.map((entry, index) => <p key={`${app.id}-${index}`}>{entry}</p>)}<button className="admin-edit-link" onClick={() => onEdit(app)} type="button">관리자 편집</button></div></details>; })}</div>
    </section>
  );
}

export default function VillageExplorer() {
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

  function resetLeaves() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setFalls({});
    setShaking(null);
  }

  function submitResident(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Resident = { name: name.trim() || "이웃", animal, device };
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
      ? `${resident.name}, 환영 선물로 잎 한 장 떨어뜨려 뒀어.`
      : returning
        ? `다시 왔네, ${resident.name}! 나무는 그대로 있어.`
        : `${resident.name}, 편하게 골라 가.`
    : "앱은 그냥 눌러서 받아가도 돼. 심심하면 신청서도 한 장?";
  const signRibbon = resident ? `${resident.name}가 쓰는 기기` : undefined;

  return (
    <div className="village-page v5-page">
      <section className="v5-stage-shell" ref={shellRef} style={{ height: STAGE_HEIGHT * stageScale }}>
        <div className="v5-stage" style={{ transform: `scale(${stageScale})` }}>
          <div className="v5-sky" />
          <SceneAsset alt="" className="v5-cloud v5-cloud-one" src="/village/cloud.svg" />
          <SceneAsset alt="" className="v5-cloud v5-cloud-two" src="/village/cloud.svg" />
          <SceneAsset alt="" className="v5-cloud v5-cloud-three" src="/village/cloud.svg" />
          <div className="v5-hill v5-hill-far" /><div className="v5-hill v5-hill-near" /><div className="v5-grass" /><div className="v5-front-ground" />
          <SceneAsset alt="" className="v5-ground-mushroom" src="/village/mushroom.svg" /><SceneAsset alt="" className="v5-ground-clover" src="/village/four-leaf-clover.svg" /><SceneAsset alt="" className="v5-ground-blossom" src="/village/seedling.svg" /><SceneAsset alt="" className="v5-ground-seedling" src="/village/seedling.svg" /><SceneAsset alt="" className="v5-ground-herb" src="/village/herb.svg" />

          <div className="v5-title-sign"><div className="v5-title-ropes"><span /><span /></div><div className="v5-title-plaque">모여봐 앱마을</div></div>
          <button className="v5-application-button" onClick={() => { setFormDone(false); setFormOpen(true); }} type="button"><VillageIcon name="home" size={19} />{resident ? "신청서 다시 쓰기" : "입주신청서 쓰기"}</button>

          <V5Tree appsForTree={appForTree("mac")} falls={falls} onOpen={setSelectedApp} onReset={resetLeaves} onShake={() => shakeTree("mac")} platformRibbon={resident && (resident.device === "mac" || resident.device === "both") ? signRibbon : undefined} shaking={shaking === "mac"} tree="mac" />
          <V5Tree appsForTree={appForTree("iphone")} falls={falls} onOpen={setSelectedApp} onShake={() => shakeTree("iphone")} platformRibbon={resident && (resident.device === "iphone" || resident.device === "both") ? signRibbon : undefined} shaking={shaking === "iphone"} tree="iphone" />

          <div className="v5-ground-characters">
            <div className="v5-house-wrap"><V5House resident={resident} /></div>
            <V5Mailbox mailOpen={mailOpen} mailRead={mailRead} onToggle={() => { setMailOpen((open) => !open); setMailRead(true); }} resident={resident} />
            <V5Mascot animal={animal} bubble={bubble} />
          </div>
          <div className="v5-grain" />

          {selectedApp && <V5Detail app={selectedApp} onClose={() => setSelectedApp(null)} />}
          {formOpen && <div className="v5-overlay v5-form-overlay" onClick={() => { setFormOpen(false); setFormDone(false); }} role="presentation"><section aria-label="앱마을 입주 신청" className="v5-form-modal" onClick={(event) => event.stopPropagation()} role="dialog"><button aria-label="닫기" className="v5-close-button v5-form-close-top" onClick={() => { setFormOpen(false); setFormDone(false); }} type="button"><VillageIcon name="close" size={20} /></button><V5ResidentForm animal={animal} device={device} done={formDone} name={name} onAnimal={setAnimal} onDevice={setDevice} onName={setName} onClose={() => { setFormOpen(false); setFormDone(false); }} onSubmit={submitResident} resident={resident} /></section></div>}
        </div>
      </section>

      <div className="v5-after-scene"><StoryBoard onEdit={setAdminApp} overrides={contentOverrides} /><footer className="village-footer"><span>Made slowly, with useful little things.</span><span className="village-footer-meta"><span className="village-footer-links"><a href="/privacy">개인정보처리방침</a><span aria-hidden="true"> · </span><a href="/support/eatwater">지원</a><span aria-hidden="true"> · </span><a href="/llms.txt">llms.txt</a></span><span className="village-credit">자연물: Fluent Emoji (MIT) · UI 아이콘: Lucide (ISC) · 앱 아이콘·스크린샷은 placeholder</span></span></footer></div>
      <VillageAdminEditModal obj={adminApp ? { id: adminApp.id, name: adminApp.displayNameKo, description: adminApp.taglineKo } : null} onClose={() => setAdminApp(null)} onSaved={(appId, data) => setContentOverrides((current) => ({ ...current, [appId]: data }))} />
    </div>
  );
}
