"use client";

import { useSyncExternalStore } from "react";

/**
 * Instagram's and Facebook's in-app browsers, as they identify themselves.
 *
 * `Instagram` is appended by the Instagram app on both platforms; `FBAN`
 * (Facebook App Name) and `FBAV` (Facebook App Version) are the Meta family
 * markers that show up in the wrapper more generally. Matching any of the three
 * is enough for what this is used for — showing a one-line hint — and the cost
 * of a false positive is a hint someone did not need, which is why nothing here
 * changes navigation.
 */
const META_WEBVIEW = /Instagram|FBAN|FBAV/i;

/** Nothing to subscribe to: the user agent does not change within a document. */
const subscribe = () => () => {};

const getSnapshot = () =>
  typeof navigator !== "undefined" && META_WEBVIEW.test(navigator.userAgent);

/** The server has no user agent to read, so it always renders the plain case. */
const getServerSnapshot = () => false;

/**
 * Whether this document is being viewed inside a Meta in-app browser.
 *
 * Read through `useSyncExternalStore` rather than during render for the same
 * reason the motion preference was: branching on `navigator` while rendering
 * makes the prerendered HTML and the hydrating client disagree, and React
 * refuses to patch that up — it throws the tree away and warns. This renders the
 * server's answer (`false`, so no hint) during hydration and swaps to the real
 * one on the commit immediately after.
 *
 * This is a *static export*: there are no request headers at build time, so
 * detection cannot happen anywhere but the client.
 */
export function useIsMetaWebview() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
