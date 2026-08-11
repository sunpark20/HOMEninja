"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { apps, type AppRegistryEntry } from "@/data/apps";
import { tmt, type AppContent } from "@/data/tmt";
import {
  residentAnimals,
  retiredVillageApp,
  villageAppVisuals,
  type ResidentAnimal,
  type VillageTree,
} from "@/data/village-visuals";
import VillageAdminEditModal from "./VillageAdminEditModal";
import VillageIcon from "./VillageIcon";

type Resident = {
  name: string;
  animal: ResidentAnimal;
  device: "mac" | "iphone" | "both";
};

type AppLeafProps = {
  app: AppRegistryEntry;
  fallen: boolean;
  falling: boolean;
  onOpen: (app: AppRegistryEntry) => void;
};

const treeLabels: Record<VillageTree, { title: string; subtitle: string }> = {
  mac: { title: "Mac 나무", subtitle: "Mac에서 쓰는 앱" },
  iphone: { title: "iPhone 나무", subtitle: "iPhone에서 쓰는 앱" },
};

const animalById = new Map(residentAnimals.map((animal) => [animal.id, animal]));

function Asset({
  alt,
  className,
  src,
}: {
  alt?: string;
  className?: string;
  src: string;
}) {
  return (
    <span
      aria-label={alt}
      className={`village-asset ${className ?? ""}`}
      role={alt ? "img" : undefined}
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
}

function AppLeaf({ app, fallen, falling, onOpen }: AppLeafProps) {
  const visual = villageAppVisuals[app.id];
  if (!visual || fallen) return null;

  return (
    <button
      aria-label={`${app.displayNameKo} 상세 보기`}
      className={`village-leaf leaf-tone-${visual.tone} ${falling ? "is-falling" : ""}`}
      onClick={() => onOpen(app)}
      style={{ "--leaf-tilt": `${visual.tilt}deg` } as React.CSSProperties}
      type="button"
    >
      <span className="leaf-pin" />
      <span className="leaf-mark">{visual.label}</span>
      <span className="leaf-name">{app.displayNameKo}</span>
      <span className="leaf-status">
        {app.status === "unreleased" ? "곧 만나요" : app.version}
      </span>
    </button>
  );
}

function FallenLeaf({ app, onOpen }: { app: AppRegistryEntry; onOpen: (app: AppRegistryEntry) => void }) {
  const visual = villageAppVisuals[app.id];
  if (!visual) return null;
  return (
    <button
      aria-label={`${app.displayNameKo} 상세 보기`}
      className={`ground-leaf leaf-tone-${visual.tone}`}
      onClick={() => onOpen(app)}
      style={{ "--leaf-tilt": `${visual.tilt}deg` } as React.CSSProperties}
      type="button"
    >
      <span className="leaf-mark">{visual.label}</span>
      <span>{app.displayNameKo}</span>
      <VillageIcon name="arrow" size={14} />
    </button>
  );
}

function PlatformTree({
  appsForTree,
  fallen,
  falling,
  onOpen,
  onShake,
  shaking,
  tree,
}: {
  appsForTree: AppRegistryEntry[];
  fallen: Set<string>;
  falling: string | null;
  onOpen: (app: AppRegistryEntry) => void;
  onShake: () => void;
  shaking: boolean;
  tree: VillageTree;
}) {
  const labels = treeLabels[tree];
  return (
    <section aria-labelledby={`${tree}-tree-title`} className={`platform-tree platform-tree-${tree}`}>
      <div className="tree-canopy" aria-hidden="true">
        <span className="canopy-blob canopy-blob-a" />
        <span className="canopy-blob canopy-blob-b" />
        <span className="canopy-blob canopy-blob-c" />
        <Asset className="tree-emoji" src="/village/deciduous-tree.svg" />
      </div>
      <div className={`tree-illustration ${shaking ? "is-shaking" : ""}`} aria-hidden="true">
        <span className="tree-trunk" />
        <span className="tree-branch tree-branch-one" />
        <span className="tree-branch tree-branch-two" />
        <span className="tree-knot" />
      </div>
      <div className="tree-copy">
        <p className="eyebrow">앱이 자라는 곳</p>
        <h2 id={`${tree}-tree-title`}>{labels.title}</h2>
        <p>{labels.subtitle}</p>
      </div>
      <div className="tree-leaves">
        {appsForTree.map((app) => (
          <AppLeaf app={app} fallen={fallen.has(app.id)} falling={falling === app.id} key={app.id} onOpen={onOpen} />
        ))}
      </div>
      <button className="tree-shake-button" onClick={onShake} type="button">
        <VillageIcon name="wind" size={17} />
        <span className="shake-label-wide">나무 흔들기</span>
        <span className="shake-label-narrow">나무 탭하기</span>
      </button>
    </section>
  );
}

function AppDetail({ app, onClose }: { app: AppRegistryEntry | null; onClose: () => void }) {
  if (!app) return null;
  const visual = villageAppVisuals[app.id];
  const downloadable = app.status === "released" && app.downloads.length > 0;
  return (
    <div className="village-modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-label={`${app.displayNameKo} 상세 정보`}
        aria-modal="true"
        className="app-detail-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal-heading-row">
          <div className={`detail-mark leaf-tone-${visual?.tone ?? "sage"}`}>{visual?.label ?? "APP"}</div>
          <button aria-label="닫기" className="icon-button" onClick={onClose} type="button">
            <VillageIcon name="close" />
          </button>
        </div>
        <p className="eyebrow">{app.status === "unreleased" ? "출시 준비 중" : "앱 잎사귀"}</p>
        <h2>{app.displayNameKo}</h2>
        <p className="detail-english">{app.displayName}</p>
        <p className="detail-tagline">{app.taglineKo}</p>
        <div className="detail-facts">
          <span>{app.minOS}</span>
          <span>v{app.version}</span>
          <span>{app.platforms.join(" · ")}</span>
        </div>
        <div className="detail-actions">
          {downloadable ? (
            app.downloads.filter((download) => download.url).map((download) => (
              <a className="button button-primary" href={download.url ?? undefined} key={`${app.id}-${download.platform}`} rel="noreferrer" target="_blank">
                <VillageIcon name="download" size={16} />
                {download.label}
              </a>
            ))
          ) : (
            <span className="button button-soon">곧 출시할게요</span>
          )}
          <a className="button button-secondary" href={app.reporting.url} rel="noreferrer" target="_blank">
            <VillageIcon name="report" size={16} />
            GitHub에 신고
          </a>
        </div>
        <div className="detail-links">
          {app.web.privacy && <a href={app.web.privacy} rel="noreferrer" target="_blank">개인정보처리방침</a>}
          {app.web.support && <a href={app.web.support} rel="noreferrer" target="_blank">지원 페이지</a>}
        </div>
        <button className="modal-close-link" onClick={onClose} type="button">목록으로 돌아가기</button>
      </section>
    </div>
  );
}

function ResidentForm({ onSaved }: { onSaved: (resident: Resident) => void }) {
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState<ResidentAnimal>("owl");
  const [device, setDevice] = useState<Resident["device"]>("both");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resident = { name: name.trim() || "새 이웃", animal, device };
    localStorage.setItem("appvillage.resident", JSON.stringify(resident));
    onSaved(resident);
    setSaved(true);
  }

  return (
    <form className="resident-form" onSubmit={submit}>
      <p className="eyebrow">브라우저에만 기억해요</p>
      <h2>앱마을에 이름표 달기</h2>
      <p className="modal-copy">신청은 선택 사항이에요. 이름과 취향은 이 브라우저에만 저장하고 어디에도 보내지 않습니다.</p>
      <label>이름<input maxLength={24} onChange={(event) => setName(event.target.value)} placeholder="예: 수지" value={name} /></label>
      <label>마을 친구<select onChange={(event) => setAnimal(event.target.value as ResidentAnimal)} value={animal}>{residentAnimals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
      <fieldset>
        <legend>주로 쓰는 기기</legend>
        <div className="choice-row">
          {([["mac", "Mac"], ["iphone", "iPhone"], ["both", "둘 다"]] as const).map(([value, label]) => (
            <label className={`choice-pill ${device === value ? "is-selected" : ""}`} key={value}>
              <input checked={device === value} name="device" onChange={() => setDevice(value)} type="radio" value={value} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <button className="button button-primary form-submit" type="submit">
        <VillageIcon name={saved ? "check" : "leaf"} size={16} />
        {saved ? "이 브라우저에 기억했어요" : "입주하기"}
      </button>
    </form>
  );
}

function Mailbox({ resident }: { resident: Resident | null }) {
  const [open, setOpen] = useState(false);
  const upcoming = apps.filter((app) => app.status === "unreleased");
  return (
    <aside className={`mailbox-panel ${open ? "is-open" : ""}`}>
      <button aria-expanded={open} className="mailbox-trigger" onClick={() => setOpen((current) => !current)} type="button">
        <Asset className="mailbox-asset" src={open ? "/village/open-mailbox-with-lowered-flag.svg" : "/village/closed-mailbox-with-raised-flag.svg"} />
        <span><strong>우편함</strong><small>{resident ? `${resident.name}님에게 온 소식` : "새 앱 소식"}</small></span>
        <VillageIcon name={open ? "close" : "arrow"} size={16} />
      </button>
      {open && (
        <div className="mailbox-content">
          <p>아직 출시 전인 앱도 미리 구경할 수 있어요.</p>
          {upcoming.map((app) => <span className="mail-note" key={app.id}><VillageIcon name="leaf" size={14} />{app.displayNameKo} · 출시 준비 중</span>)}
        </div>
      )}
    </aside>
  );
}

function StoryBoard({ onEdit, overrides }: { onEdit: (app: AppRegistryEntry) => void; overrides: Record<string, AppContent> }) {
  const stories = useMemo(() => apps.filter((app) => tmt[app.id]?.entries?.length), []);
  return (
    <section className="story-board" id="tmt-board">
      <div className="board-heading">
        <div>
          <p className="eyebrow">마을 게시판</p>
          <h2>만들며 적은 이야기</h2>
        </div>
        <VillageIcon name="board" size={27} />
      </div>
      <p className="board-intro">앱을 만들며 남긴 Too Much Talk을 마을 게시판으로 옮겼어요.</p>
      <div className="story-list">
        {stories.map((app) => {
          const content = overrides[app.id] ?? tmt[app.id];
          return (
            <details className="story-entry" key={app.id}>
              <summary><span className="story-dot" />{app.displayNameKo}<span className="story-count">{content.entries.length}개</span></summary>
              <div className="story-body">
                {content.entries.map((entry, index) => <p key={`${app.id}-${index}`}>{entry}</p>)}
                <button className="admin-edit-link" onClick={() => onEdit(app)} type="button">관리자 편집</button>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function VillageDecor() {
  return (
    <div aria-hidden="true" className="village-decor">
      <Asset className="decor-cloud cloud-one" src="/village/cloud.svg" />
      <Asset className="decor-cloud cloud-two" src="/village/cloud.svg" />
      <Asset className="decor-cloud cloud-three" src="/village/cloud.svg" />
      <Asset className="decor-mushroom" src="/village/mushroom.svg" />
      <Asset className="decor-clover" src="/village/four-leaf-clover.svg" />
      <Asset className="decor-seedling" src="/village/seedling.svg" />
      <Asset className="decor-herb" src="/village/herb.svg" />
    </div>
  );
}

export default function VillageExplorer() {
  const [fallen, setFallen] = useState<Set<string>>(() => new Set());
  const [fallingId, setFallingId] = useState<string | null>(null);
  const [shaking, setShaking] = useState<VillageTree | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppRegistryEntry | null>(null);
  const [resident, setResident] = useState<Resident | null>(null);
  const [residentOpen, setResidentOpen] = useState(false);
  const [adminApp, setAdminApp] = useState<AppRegistryEntry | null>(null);
  const [contentOverrides, setContentOverrides] = useState<Record<string, AppContent>>({});

  useEffect(() => {
    const raw = localStorage.getItem("appvillage.resident");
    if (!raw) return;
    try { setResident(JSON.parse(raw) as Resident); } catch { localStorage.removeItem("appvillage.resident"); }
  }, []);

  const appsByTree = (tree: VillageTree) => apps.filter((app) => villageAppVisuals[app.id]?.tree === tree);

  function shake(tree: VillageTree) {
    if (shaking) return;
    const target = appsByTree(tree).find((app) => app.status !== "unreleased" && !fallen.has(app.id));
    setShaking(tree);
    setFallingId(target?.id ?? null);
    window.setTimeout(() => {
      if (target) setFallen((current) => new Set(current).add(target.id));
      setFallingId(null);
      setShaking(null);
    }, 680);
  }

  function restoreLeaves() {
    setFallingId(null);
    setShaking(null);
    setFallen(new Set());
  }

  function saveResident(next: Resident) {
    setResident(next);
    setResidentOpen(false);
    const giftId = next.device === "iphone" ? "snapcart" : "breaklock-timer";
    if (!fallen.has(giftId)) {
      setFallingId(giftId);
      window.setTimeout(() => {
        setFallen((current) => new Set(current).add(giftId));
        setFallingId(null);
      }, 680);
    }
  }

  const fallenApps = apps.filter((app) => fallen.has(app.id));
  const residentAnimal = resident ? animalById.get(resident.animal) : null;

  return (
    <div className="village-page">
      <VillageDecor />
      <header className="village-header">
        <div className="village-brand-lockup">
          <span className="brand-stamp">앱<br />마을</span>
          <div><p className="eyebrow">닌자거북의홈</p><p className="brand-note">작은 앱들이 자라는 곳</p></div>
        </div>
        <nav aria-label="페이지 메뉴" className="village-nav">
          <a href="#app-grove">앱 구경하기</a>
          <a href="#tmt-board">게시판</a>
          <a href="/privacy">개인정보</a>
          <button className="resident-button" onClick={() => setResidentOpen(true)} type="button"><VillageIcon name="home" size={15} />{resident ? "내 집 보기" : "입주 신청"}</button>
        </nav>
      </header>

      <main>
        <section className="village-hero" aria-labelledby="village-title">
          <div className="hero-copy">
            <p className="hero-kicker"><span className="kicker-line" />WELCOME TO APP VILLAGE</p>
            <h1 id="village-title">모여봐<br /><em>앱마을</em></h1>
            <p className="hero-lede">필요한 앱을 잎사귀처럼 골라<br className="mobile-break" /> 편하게 가져가세요.</p>
            <div className="hero-actions"><a className="button button-primary" href="#app-grove"><VillageIcon name="leaf" size={16} />마을 둘러보기</a><a className="button button-quiet" href="#tmt-board">만든 이야기 읽기 <VillageIcon name="arrow" size={15} /></a></div>
          </div>
          <div className="hero-sign" aria-label="모여봐 앱마을 안내판" role="img"><span className="sign-nail" /><span className="sign-nail sign-nail-right" /><span>모여봐<br />앱마을</span></div>
          <div className="hero-note"><VillageIcon name="wind" size={16} /><span>나무를 흔들면<br />잎이 하나씩 내려와요</span></div>
        </section>

        <section className="grove-wrap" id="app-grove" aria-labelledby="grove-title">
          <div className="section-heading">
            <div><p className="eyebrow">우리 마을의 나무</p><h2 id="grove-title">앱을 골라볼까요?</h2></div>
            <p className="section-aside">{apps.length}개의 앱 · Mac과 iPhone</p>
          </div>
          <div className="tree-grove">
            <PlatformTree appsForTree={appsByTree("mac")} fallen={fallen} falling={fallingId} onOpen={setSelectedApp} onShake={() => shake("mac")} shaking={shaking === "mac"} tree="mac" />
            <PlatformTree appsForTree={appsByTree("iphone")} fallen={fallen} falling={fallingId} onOpen={setSelectedApp} onShake={() => shake("iphone")} shaking={shaking === "iphone"} tree="iphone" />
          </div>
          <div className="ground-actions"><p><VillageIcon name="leaf" size={15} /> 떨어진 잎은 눌러서 자세히 볼 수 있어요.</p><button className="button button-quiet" onClick={restoreLeaves} type="button"><VillageIcon name="refresh" size={15} />다시 매달기</button></div>
          <div className="ground-leaves" aria-live="polite">{fallenApps.length > 0 ? fallenApps.map((app) => <FallenLeaf app={app} key={app.id} onOpen={setSelectedApp} />) : <span className="ground-empty">아직 떨어진 잎이 없어요. 나무를 살짝 흔들어 보세요.</span>}</div>
        </section>

        <section className="village-lower" aria-label="마을 시설">
          <div className="house-card"><Asset className="house-asset" src="/village/house.svg" /><div><p className="eyebrow">방문자의 집</p><h2>{resident ? `${resident.name}의 집` : "아직 빈 집이에요"}</h2><p>{resident ? `${residentAnimal?.label ?? "친구"}와 함께 살고 있어요.` : "이 브라우저에 이름표를 달아볼까요?"}</p></div><button className="button button-secondary" onClick={() => setResidentOpen(true)} type="button">{resident ? "집 꾸미기" : "입주하기"}</button></div>
          <Mailbox resident={resident} />
          <div className="stump-card"><div className="stump-icon"><VillageIcon name="stump" size={25} /></div><div><p className="eyebrow">그루터기</p><h2>{retiredVillageApp.name}</h2><p>{retiredVillageApp.description}</p></div><span className="retired-badge">퇴역</span></div>
        </section>

        <StoryBoard onEdit={setAdminApp} overrides={contentOverrides} />
      </main>

      <footer className="village-footer"><span>Made slowly, with useful little things.</span><span><a href="/privacy">개인정보처리방침</a><span aria-hidden="true"> · </span><a href="/support/eatwater">지원</a><span aria-hidden="true"> · </span><a href="/llms.txt">llms.txt</a></span></footer>

      <AppDetail app={selectedApp} onClose={() => setSelectedApp(null)} />
      {residentOpen && <div className="village-modal-backdrop" onClick={() => setResidentOpen(false)} role="presentation"><section aria-label="앱마을 입주 신청" className="resident-modal" onClick={(event) => event.stopPropagation()} role="dialog"><button aria-label="닫기" className="icon-button modal-top-close" onClick={() => setResidentOpen(false)} type="button"><VillageIcon name="close" /></button><ResidentForm onSaved={saveResident} /></section></div>}
      <VillageAdminEditModal obj={adminApp ? { id: adminApp.id, name: adminApp.displayNameKo, description: adminApp.taglineKo } : null} onClose={() => setAdminApp(null)} onSaved={(appId, data) => setContentOverrides((current) => ({ ...current, [appId]: data }))} />
    </div>
  );
}
