import type { ResidentAnimal } from "@/data/village-visuals";
import type { Platform } from "@/types/app";

export type Locale = "ko" | "en";

export type VillageDictionary = {
  locale: Locale;
  alternateLocale: Locale;
  metadata: {
    title: string;
    description: string;
    openGraphLocale: string;
  };
  language: {
    label: string;
    korean: string;
    english: string;
    switchTo: string;
  };
  scene: {
    title: string;
    apply: string;
    reapply: string;
    treeAlt: Record<"mac" | "iphone", string>;
    shakeTree: Record<"mac" | "iphone", string>;
    platform: Record<"mac" | "iphone", string>;
    houseEmpty: string;
    houseOf: string;
    mailbox: string;
    mailboxOf: string;
    mailboxOpen: string;
    upcomingNotice: string;
    emptyMailbox: string;
    emptyMailboxHint: string;
    mascotAlt: Record<ResidentAnimal, string>;
    bubble: {
      visitor: string;
      gift: string;
      returning: string;
      resident: string;
      deviceRibbon: string;
    };
  };
  appCopies: Record<string, string>;
  detail: {
    ariaLabel: string;
    close: string;
    screenshotPlaceholder: string;
    comingSoon: string;
    report: string;
    privacy: string;
    support: string;
    dismiss: string;
    downloadLabels: Partial<Record<Platform, string>>;
  };
  resident: {
    dialogLabel: string;
    formTitle: string;
    formHint: string;
    defaultName: string;
    name: string;
    namePlaceholder: string;
    appearance: string;
    appearanceHint: string;
    animals: Record<ResidentAnimal, { label: string; hint: string }>;
    device: string;
    devices: Record<"mac" | "iphone" | "both", string>;
    submit: string;
    skip: string;
    privacyNote: string;
    successStamp: string;
    welcome: string;
    successCopy: string;
    continue: string;
  };
  board: {
    eyebrow: string;
    title: string;
    intro: string;
    adminEdit: string;
  };
  footer: {
    signature: string;
    privacy: string;
    support: string;
    terms: string;
    ariaLabel: string;
    credit: string;
  };
  admin: {
    eyebrow: string;
    ariaLabel: string;
    authCopy: string;
    password: string;
    authenticate: string;
    authenticating: string;
    name: string;
    description: string;
    tmt: string;
    save: string;
    saving: string;
    cancel: string;
    saved: string;
    saveFailed: string;
    authFailed: string;
    close: string;
  };
};
