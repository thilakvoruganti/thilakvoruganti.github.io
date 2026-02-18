import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { analyticsConfig, firebaseConfig } from "../config/env";

let analytics = null;
const pendingEvents = [];
const ENTRY_EVENT_STORAGE_KEY = "portfolio_entry_logged";

export function initAnalytics() {
  if (!analyticsConfig.enabled) return;

  const app = initializeApp(firebaseConfig);
  isSupported()
    .then((supported) => {
      if (!supported) return;
      analytics = getAnalytics(app);
      flushPendingEvents();
    })
    .catch(() => {
      // No-op: analytics support is optional in some environments/browsers
    });
}

export function trackEvent(name, params) {
  if (!analyticsConfig.enabled) return;
  if (!analytics) {
    pendingEvents.push({ name, params });
    return;
  }
  logEvent(analytics, name, params);
}

function flushPendingEvents() {
  while (pendingEvents.length) {
    const { name, params } = pendingEvents.shift();
    logEvent(analytics, name, params);
  }
}

function getReferrerDomain(referrer) {
  if (!referrer) return "direct";
  try {
    const { hostname } = new URL(referrer);
    return hostname.replace(/^www\./, "");
  } catch (error) {
    return "unknown";
  }
}

function safeSessionStorage() {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch (error) {
    return null;
  }
}

export function trackEntrySource() {
  if (typeof window === "undefined") return;
  const storage = safeSessionStorage();
  if (storage && storage.getItem(ENTRY_EVENT_STORAGE_KEY)) return;

  const searchParams = new URLSearchParams(window.location.search || "");
  const explicitSource = searchParams.get("source") || searchParams.get("utm_source");
  const medium = searchParams.get("utm_medium") || "unspecified";
  const campaign = searchParams.get("utm_campaign") || "unspecified";
  const referrerDomain = getReferrerDomain(typeof document !== "undefined" ? document.referrer : "");
  const inferredSource = explicitSource || (referrerDomain !== "direct" ? referrerDomain : "direct");
  const landingPath = `${window.location.pathname}${window.location.hash}`;

  trackEvent("portfolio_entry", {
    source: inferredSource,
    referrer: referrerDomain,
    medium,
    campaign,
    landingPath,
  });

  if (storage) {
    storage.setItem(ENTRY_EVENT_STORAGE_KEY, "true");
  }
}
