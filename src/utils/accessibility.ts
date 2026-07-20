export function announceAccessibility(message: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('accessibility-announce', { detail: message }));
  }
}
