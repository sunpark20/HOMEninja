type IconName =
  | "arrow"
  | "board"
  | "check"
  | "close"
  | "download"
  | "home"
  | "leaf"
  | "mail"
  | "monitor"
  | "phone"
  | "report"
  | "refresh"
  | "stump"
  | "wind";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

export default function VillageIcon({ name, size = 18, className }: Props) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  let content: React.ReactNode;
  switch (name) {
    case "arrow":
      content = <path {...common} d="M4 9h13m-5-5 5 5-5 5" />;
      break;
    case "board":
      content = (
        <>
          <path {...common} d="M4 4.5h16v11H4zM8 15.5v3m8-3v3M7.5 8h9M7.5 11h6" />
        </>
      );
      break;
    case "check":
      content = <path {...common} d="m4.5 10 3.4 3.4L19.5 4.8" />;
      break;
    case "close":
      content = <path {...common} d="m6 6 12 12M18 6 6 18" />;
      break;
    case "download":
      content = <path {...common} d="M12 3v11m-4-4 4 4 4-4M5 18h14" />;
      break;
    case "home":
      content = <path {...common} d="m3.5 10 8.5-7 8.5 7M5.5 8.5V20h13V8.5M9 20v-6h6v6" />;
      break;
    case "leaf":
      content = <path {...common} d="M19.5 4.5C10 4.5 5 8.2 5 14c0 2.5 1.7 4.5 4.7 4.5 5.6 0 8.7-5.4 9.8-14ZM5.5 19.5c2.4-4 5.3-6.2 9-8.1" />;
      break;
    case "mail":
      content = <path {...common} d="M4 6.5h16v12H4zM4 7l8 6 8-6" />;
      break;
    case "monitor":
      content = <path {...common} d="M3.5 4.5h17v11h-17zM9 19.5h6M12 15.5v4" />;
      break;
    case "phone":
      content = <path {...common} d="M7.5 3.5h9v17h-9zM10.5 17.5h3" />;
      break;
    case "report":
      content = <path {...common} d="M6 3.5h9l3 3v14H6zM14.5 3.8v3h3M9 11h6M9 14.5h6M9 18h3" />;
      break;
    case "refresh":
      content = <path {...common} d="M19 7V3m0 0h-4m4 0-3.1 3.1A7.5 7.5 0 1 0 19 13" />;
      break;
    case "stump":
      content = <path {...common} d="M6 8h12l-1 12H7L6 8Zm1-3h10M8 5V3m8 2V3M9 11v6m6-6v6" />;
      break;
    case "wind":
      content = <path {...common} d="M3 8h10.5a2.5 2.5 0 1 0-2.2-3.7M3 12h15a2.5 2.5 0 1 1-2.2 3.7M3 16h7" />;
      break;
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {content}
    </svg>
  );
}
