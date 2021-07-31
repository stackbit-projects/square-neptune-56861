// Due to Next.js rehydration issues with the <title /> in head, returning null here
// and will render <title /> outside of placeholder
export default function BrowserTitle() {
  return null;
}