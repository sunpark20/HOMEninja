"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  appId: string;
  entries: string[];
};

function renderWithBreaks(text: string) {
  const parts = text.split("\n");
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {part}
    </span>
  ));
}

const TEXT = "oklch(0.58 0.01 260)";
const DIM = "oklch(0.38 0.01 260)";
const ERR = "oklch(0.55 0.12 25)";
const OK = "oklch(0.6 0.08 160)";

export default function TmtSection({ appId, entries: initialEntries }: Props) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState(initialEntries);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const [adminMode, setAdminMode] = useState(false);
  const [showPwInput, setShowPwInput] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [editEntries, setEditEntries] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const measure = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (!open || adminMode) return;
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [open, adminMode, measure, entries, showPwInput, authError, saveMsg]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !open || adminMode) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, adminMode, measure]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setOpen(false);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── helpers ── */

  async function tryAuth(pw: string): Promise<boolean> {
    try {
      const res = await fetch("/api/tmt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function fetchLatest(): Promise<string[] | null> {
    try {
      const res = await fetch(`/api/tmt?app=${encodeURIComponent(appId)}`);
      if (!res.ok) return null;
      const data = (await res.json()) as { entries: string[] };
      return data.entries ?? null;
    } catch {
      return null;
    }
  }

  async function enterEditMode(pw: string) {
    sessionStorage.setItem("tmt_pw", pw);
    setPassword(pw);
    const latest = await fetchLatest();
    const data = latest ?? [...entries];
    setEditEntries(data.length > 0 ? data : [""]);
    if (latest) setEntries(latest);
    setAdminMode(true);
    setShowPwInput(false);
  }

  /* ── handlers ── */

  async function handleEditClick() {
    setLoading(true);
    try {
      const stored = sessionStorage.getItem("tmt_pw");
      if (stored) {
        const ok = await tryAuth(stored);
        if (ok) {
          await enterEditMode(stored);
          return;
        }
        sessionStorage.removeItem("tmt_pw");
      }
      setShowPwInput(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuth() {
    setAuthError(false);
    setLoading(true);
    try {
      const ok = await tryAuth(password);
      if (!ok) {
        setAuthError(true);
        return;
      }
      await enterEditMode(password);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg(null);
    const pw = sessionStorage.getItem("tmt_pw") || password;
    const filtered = editEntries.filter((e) => e.trim() !== "");
    try {
      const res = await fetch("/api/tmt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, appId, entries: filtered }),
      });
      if (res.ok) {
        setEntries(filtered);
        setAdminMode(false);
        setSaveMsg({ text: "저장 완료", ok: true });
        setTimeout(() => setSaveMsg(null), 3000);
      } else {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setSaveMsg({ text: data.error ?? "저장 실패", ok: false });
      }
    } catch {
      setSaveMsg({ text: "네트워크 오류", ok: false });
    }
    setSaving(false);
  }

  /* ── render ── */

  return (
    <div ref={containerRef} className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs tracking-wide transition-colors duration-200 rounded cursor-pointer"
        style={{
          color: open ? "oklch(0.65 0.01 260)" : "oklch(0.45 0.01 260)",
        }}
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        {open ? "Too Much Talk" : "TMT"}
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: !open ? "0px" : adminMode ? "none" : `${contentHeight}px`,
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pt-3 flex flex-col gap-2.5">
          {/* ── 편집 모드 ── */}
          {adminMode ? (
            <>
              {editEntries.map((text, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <textarea
                    value={text}
                    onChange={(e) => {
                      const next = [...editEntries];
                      next[i] = e.target.value;
                      setEditEntries(next);
                    }}
                    rows={2}
                    className="flex-1 text-[13px] leading-relaxed bg-transparent border rounded px-2 py-1.5 resize-y outline-none"
                    style={{ color: TEXT, borderColor: DIM }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditEntries(editEntries.filter((_, j) => j !== i))
                    }
                    className="text-xs px-1.5 py-1 shrink-0 cursor-pointer"
                    style={{ color: ERR }}
                  >
                    삭제
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setEditEntries([...editEntries, ""])}
                  className="text-xs px-2 py-1 cursor-pointer"
                  style={{ color: DIM }}
                >
                  + 추가
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="text-xs px-3 py-1 cursor-pointer"
                  style={{
                    color: OK,
                    opacity: saving ? 0.5 : 1,
                  }}
                >
                  {saving ? "저장 중..." : "저장"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdminMode(false);
                    setEditEntries([]);
                  }}
                  className="text-xs px-2 py-1 cursor-pointer"
                  style={{ color: DIM }}
                >
                  취소
                </button>
                {saveMsg && (
                  <span
                    className="text-xs self-center"
                    style={{ color: saveMsg.ok ? OK : ERR }}
                  >
                    {saveMsg.text}
                  </span>
                )}
              </div>
            </>
          ) : (
            /* ── 읽기 모드 ── */
            entries.map((text, i) => (
              <p
                key={i}
                className="text-[13px] leading-relaxed m-0"
                style={{ color: TEXT }}
              >
                {renderWithBreaks(text)}
              </p>
            ))
          )}

          {/* ── 관리자 접근 ── */}
          {!adminMode && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {showPwInput ? (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAuthError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                    placeholder="비밀번호"
                    className="text-xs bg-transparent border rounded px-2 py-1 outline-none"
                    style={{ color: TEXT, borderColor: DIM, width: "120px" }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAuth}
                    disabled={loading}
                    className="text-xs px-2 py-1 cursor-pointer"
                    style={{ color: DIM, opacity: loading ? 0.5 : 1 }}
                  >
                    {loading ? "..." : "확인"}
                  </button>
                  {authError && (
                    <span className="text-xs" style={{ color: ERR }}>
                      틀림
                    </span>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  disabled={loading}
                  className="text-[11px] cursor-pointer"
                  style={{ color: DIM, opacity: loading ? 0.5 : 1 }}
                >
                  {loading ? "..." : "수정"}
                </button>
              )}
              {saveMsg && (
                <span
                  className="text-xs"
                  style={{ color: saveMsg.ok ? OK : ERR }}
                >
                  {saveMsg.text}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
