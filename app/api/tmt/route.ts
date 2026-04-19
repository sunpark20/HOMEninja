import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";
const OWNER = "sunpark20";
const REPO = "HOMEninja";
const FILE_PATH = "data/tmt.json";
const BRANCH = "main";

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_PAT}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

async function getFile() {
  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: githubHeaders(), cache: "no-store" },
  );
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("[TMT] GitHub GET failed:", res.status, err);
    return null;
  }
  const data = (await res.json()) as { content: string; sha: string };
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return {
    content: JSON.parse(decoded) as Record<string, string[]>,
    sha: data.sha,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("app");

  const file = await getFile();
  if (!file) {
    return NextResponse.json({ error: "GitHub 연결 실패" }, { status: 500 });
  }

  if (appId) {
    return NextResponse.json({ entries: file.content[appId] ?? [] });
  }
  return NextResponse.json(file.content);
}

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password: string };
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as {
    password: string;
    appId: string;
    entries: string[];
  };

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "비밀번호 틀림" }, { status: 401 });
  }
  if (!body.appId || !Array.isArray(body.entries)) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const file = await getFile();
  if (!file) {
    return NextResponse.json({ error: "GitHub 연결 실패" }, { status: 500 });
  }

  if (body.entries.length === 0) {
    delete file.content[body.appId];
  } else {
    file.content[body.appId] = body.entries;
  }

  const json = JSON.stringify(file.content, null, 2) + "\n";
  const encoded = Buffer.from(json).toString("base64");

  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify({
        message: `chore: update TMT for ${body.appId}`,
        content: encoded,
        sha: file.sha,
        branch: BRANCH,
      }),
    },
  );

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as {
      message?: string;
    };
    console.error("[TMT] GitHub PUT failed:", res.status, err);
    const msg =
      err.message === "Resource not accessible by personal access token"
        ? "GitHub 토큰에 쓰기 권한 없음"
        : `저장 실패 (${res.status})`;
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
