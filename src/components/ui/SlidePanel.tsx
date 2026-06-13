'use client';

// Opens a Reddit post in a small popup window — same as OAuth flows.
// No iframe, no embedding — Reddit loads natively in the popup.

export function openRedditPopup(url: string): void {
  const width  = 900;
  const height = 700;
  const left   = Math.round(window.screenX + (window.outerWidth  - width)  / 2);
  const top    = Math.round(window.screenY + (window.outerHeight - height) / 2);

  window.open(
    url,
    'reddit_post',
    `width=${width},height=${height},left=${left},top=${top},` +
    `resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`
  );
}

// Keep SlidePanel export so existing imports don't break — it's now a no-op shell.
export function SlidePanel() { return null; }
