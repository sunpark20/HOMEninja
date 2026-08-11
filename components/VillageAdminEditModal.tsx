"use client";

import { useEffect, useRef, useState } from "react";
import type { AppContent } from "@/data/tmt";
import VillageIcon from "./VillageIcon";

type EditableVillageApp = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  obj: EditableVillageApp | null;
  onClose: () => void;
  onSaved: (appId: string, data: AppContent) => void;
};

export default function VillageAdminEditModal({ obj, onClose, onSaved }: Props) {
  const [phase, setPhase] = useState<"auth" | "edit">("auth");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tmtText, setTmtText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!obj) return;
    setPhase("auth");
    setPassword("");
    setMessage(null);
    const stored = sessionStorage.getItem("tmt_pw");
    if (stored) void authenticate(stored);
    else window.setTimeout(() => passwordRef.current?.focus(), 80);
    // The modal is reset whenever a different app is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  useEffect(() => {
    if (!obj) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [obj, onClose]);

  if (!obj) return null;
  const target = obj;

  async function requestAuth(value: string) {
    const response = await fetch("/api/tmt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    });
    return response.ok;
  }

  async function authenticate(value: string) {
    setBusy(true);
    const ok = await requestAuth(value);
    if (!ok) {
      sessionStorage.removeItem("tmt_pw");
      setMessage("관리자 인증이 필요합니다.");
      setBusy(false);
      return;
    }
    sessionStorage.setItem("tmt_pw", value);
    setPassword(value);
    const response = await fetch(`/api/tmt?app=${encodeURIComponent(target.id)}`);
    const data = response.ok ? ((await response.json()) as AppContent) : null;
    setName(data?.name ?? target.name);
    setDescription(data?.description ?? target.description);
    setTmtText(data?.entries?.join("\n\n") ?? "");
    setPhase("edit");
    setBusy(false);
  }

  async function save() {
    setBusy(true);
    setMessage(null);
    const entries = tmtText
      .split(/\n\s*\n/)
      .map((entry) => entry.trim())
      .filter(Boolean);
    const response = await fetch("/api/tmt", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: sessionStorage.getItem("tmt_pw") ?? password,
        appId: target.id,
        name: name.trim() || null,
        description: description.trim() || null,
        entries,
      }),
    });
    if (response.ok) {
      onSaved(target.id, { name: name.trim() || null, description: description.trim() || null, entries });
      setMessage("저장했어요.");
      window.setTimeout(onClose, 700);
    } else {
      setMessage("저장하지 못했어요.");
    }
    setBusy(false);
  }

  return (
    <div className="village-modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-label={`${obj.name} 관리자 편집`}
        className="village-admin-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal-heading-row">
          <div>
            <p className="eyebrow">관리자 편집</p>
            <h2>{obj.name}</h2>
          </div>
          <button aria-label="닫기" className="icon-button" onClick={onClose} type="button">
            <VillageIcon name="close" />
          </button>
        </div>
        {phase === "auth" ? (
          <form className="admin-form" onSubmit={(event) => { event.preventDefault(); void authenticate(password); }}>
            <p className="modal-copy">TMT 게시판을 편집하려면 관리자 인증이 필요합니다.</p>
            <label>
              비밀번호
              <input ref={passwordRef} onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
            </label>
            <button className="button button-primary" disabled={busy} type="submit">{busy ? "확인 중…" : "인증하고 열기"}</button>
            {message && <p className="form-message">{message}</p>}
          </form>
        ) : (
          <form className="admin-form" onSubmit={(event) => { event.preventDefault(); void save(); }}>
            <label>이름<input onChange={(event) => setName(event.target.value)} value={name} /></label>
            <label>설명<input onChange={(event) => setDescription(event.target.value)} value={description} /></label>
            <label>TMT 항목<textarea onChange={(event) => setTmtText(event.target.value)} rows={8} value={tmtText} /></label>
            <div className="modal-actions">
              <button className="button button-primary" disabled={busy} type="submit">{busy ? "저장 중…" : "저장"}</button>
              <button className="button button-quiet" onClick={onClose} type="button">취소</button>
              {message && <span className="form-message">{message}</span>}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
