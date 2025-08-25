export function openInNewTab(url: string) {
  try {
    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWin) newWin.opener = null; // extra safety
  } catch (e) {
    // no-op: window might be blocked or unavailable in SSR
  }
}
