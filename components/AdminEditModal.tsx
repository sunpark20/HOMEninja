"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { PlanetObject } from "@/types/galaxy";
import type { AppContent } from "@/data/tmt";

type Props = {
  obj: PlanetObject | null;
  onClose: () => void;
  onSaved: (appId: string, data: AppContent) => void;
};

const C = {
  bg: "oklch(0.08 0.01 260)",
  border: "oklch(1 0 0 / 0.1)",
  text: "var(--c-heading)",
  title: "var(--c-title)",
  dim: "var(--c-dim)",
  inputBg: "oklch(0.06 0.01 260)",
  inputBorder: "var(--c-divider)",
  err: "oklch(0.55 0.12 25)",
  ok: "oklch(0.6 0.08 160)",
  label: "oklch(0.55 0.01 260)",
};

export default function AdminEditModal({ obj, onClose, onSaved }: Props) {
  const [phase, setPhase] = useState<"auth" | "edit">("auth");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tmtText, setTmtText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  const pwRef = useRef<HTMLInputElement>(null);
  const defaultName = useRef("");
  const defaultDesc = useRef("");

  const reset = useCallback(() => {
    setPhase("auth");
    setPassword("");
    setAuthError(false);
    setLoading(false);
    setName("");
    setDescription("");
    setTmtText("");
    setSaving(false);
    setSaveMsg(null);
  }, []);

  useEffect(() => {
    if (!obj) {
      reset();
      return;
    }
    defaultName.current = obj.name;
    defaultDesc.current = obj.description;

    const stored = sessionStorage.getItem("tmt_pw");
    if (stored) {
      tryAutoAuth(stored);
    } else {
      setPhase("auth");
      setTimeout(() => pwRef.current?.focus(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  useEffect(() => {
    if (!obj) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [obj, onClose]);

  if (!obj) return null;

  async function tryAuth(pw: string): Promise<boolean> {
    const res = await fetch("/api/tmt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    return res.ok;
  }

  async function fetchContent() {
    const res = await fetch(
      `/api/tmt?app=${encodeURIComponent(obj!.id)}`,
    );
    if (!res.ok) return null;
    return (await res.json()) as AppContent;
  }

  async function tryAutoAuth(pw: string) {
    setLoading(true);
    const ok = await tryAuth(pw);
    if (ok) {
      setPassword(pw);
      await enterEdit(pw);
    } else {
      sessionStorage.removeItem("tmt_pw");
      setPhase("auth");
      setTimeout(() => pwRef.current?.focus(), 100);
    }
    setLoading(false);
  }

  async function handleAuth() {
    setAuthError(false);
    setLoading(true);
    const ok = await tryAuth(password);
    if (!ok) {
      setAuthError(true);
      setLoading(false);
      return;
    }
    sessionStorage.setItem("tmt_pw", password);
    await enterEdit(password);
    setLoading(false);
  }

  async function enterEdit(_pw: string) {
    const data = await fetchContent();
    setName(data?.name ?? obj!.name);
    setDescription(data?.description ?? obj!.description);
    setTmtText(
      data?.entries && data.entries.length > 0
        ? data.entries.join("\n\n")
        : "",
    );
    setPhase("edit");
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg(null);
    const pw = sessionStorage.getItem("tmt_pw") || password;
    const filtered = tmtText
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const sendName =
      name.trim() === defaultName.current ? null : name.trim() || null;
    const sendDesc =
      description.trim() === defaultDesc.current
        ? null
        : description.trim() || null;

    try {
      const res = await fetch("/api/tmt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: pw,
          appId: obj!.id,
          name: sendName,
          description: sendDesc,
          entries: filtered,
        }),
      });
      if (res.ok) {
        onSaved(obj!.id, {
          name: sendName,
          description: sendDesc,
          entries: filtered,
        });
        setSaveMsg({ text: "저장 완료", ok: true });
        setTimeout(onClose, 1000);
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

  const inputStyle = {
    color: C.text,
    background: C.inputBg,
    border: `1px solid ${C.inputBorder}`,
    borderRadius: 8,
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 400,
        background: "oklch(0 0 0 / 0.7)",
        animation: "fade-in 200ms ease-out forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full font-[family-name:var(--font-body)]"
        style={{
          maxWidth: phase === "auth" ? 340 : 460,
          maxHeight: "80vh",
          overflowY: "auto",
          overscrollBehavior: "contain",
          padding: "24px 24px 20px",
          borderRadius: 12,
          background: C.bg,
          border: `1px solid ${C.border}`,
          color: C.text,
        }}
      >
        {/* 헤더 */}
        <h3
          className="font-[family-name:var(--font-display)] text-[20px] m-0 mb-4"
          style={{ color: C.title }}
        >
          {obj.name}
        </h3>

        {phase === "auth" ? (
          /* ── 인증 ── */
          <div className="flex flex-col gap-3">
            <input
              ref={pwRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="관리자 비밀번호"
              className="text-sm px-3 py-2 outline-none"
              style={inputStyle}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAuth}
                disabled={loading}
                className="text-sm px-4 py-1.5 rounded-lg cursor-pointer"
                style={{
                  color: C.title,
                  background: "oklch(0.2 0.01 260)",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? "..." : "확인"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm px-3 py-1.5 cursor-pointer"
                style={{ color: C.dim }}
              >
                닫기
              </button>
              {authError && (
                <span className="text-xs" style={{ color: C.err }}>
                  비밀번호 틀림
                </span>
              )}
            </div>
          </div>
        ) : (
          /* ── 편집 ── */
          <div className="flex flex-col gap-4">
            {/* 이름 */}
            <div>
              <label
                className="block text-xs mb-1"
                style={{ color: C.label }}
              >
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm px-3 py-2 outline-none"
                style={inputStyle}
              />
            </div>

            {/* 설명 */}
            <div>
              <label
                className="block text-xs mb-1"
                style={{ color: C.label }}
              >
                설명
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-sm px-3 py-2 outline-none"
                style={inputStyle}
              />
            </div>

            {/* TMT */}
            <div>
              <label
                className="block text-xs mb-1"
                style={{ color: C.label }}
              >
                TMT (빈 줄로 항목 구분)
              </label>
              <textarea
                value={tmtText}
                onChange={(e) => setTmtText(e.target.value)}
                rows={8}
                className="w-full text-[13px] leading-relaxed px-3 py-2 resize-y outline-none"
                style={inputStyle}
                placeholder={"첫 번째 항목\n\n두 번째 항목\n\n세 번째 항목"}
              />
            </div>

            {/* 액션 */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="text-sm px-4 py-1.5 rounded-lg cursor-pointer"
                style={{
                  color: C.title,
                  background: "oklch(0.2 0.01 260)",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                {saving ? "저장 중..." : "저장"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm px-3 py-1.5 cursor-pointer"
                style={{ color: C.dim }}
              >
                취소
              </button>
              {saveMsg && (
                <span
                  className="text-xs"
                  style={{ color: saveMsg.ok ? C.ok : C.err }}
                >
                  {saveMsg.text}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
