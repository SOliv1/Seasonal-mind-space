const DAILY_REFLECTIONS_URL = "https://soliv1.github.io/Daily-Reflections-App/";
const CENTRE_NOTES_URL = "https://centre-notes.netlify.app/";
const SEASONAL_MIND_SPACE_URL = "https://soliv1.github.io/Seasonal-mind-space/";
const SEASONAL_STUDIO_URL = "https://seasonal.studio/studio/about";
const CINEMATIC_QUOTATIONS = "https://cinematic-quotations-evez.onrender.com/";
const MOOD_LEXICON = "https://mood-lexicon-production.up.railway.app/";

function getReturnUrl() {
  if (typeof window === "undefined") {
    return SEASONAL_STUDIO_URL;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("returnTo") || SEASONAL_STUDIO_URL;
}

function withReturn(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}from=seasonal-mind-space&returnTo=${encodeURIComponent(SEASONAL_MIND_SPACE_URL)}`;
}

export default function MindMapFooter() {
  const returnUrl = getReturnUrl();

  return (
    <footer className="mindmap-footer" aria-label="Mindspace footer">
      <p>(c) 2026 Reflections in Light - Part of the Reflections in Light Family</p>
      <nav className="mindmap-return-nav" aria-label="Return and companion spaces">
        <a href={returnUrl}>Return to Seasonal Studio</a>
        <a href={withReturn(DAILY_REFLECTIONS_URL)}>Open Daily Reflections</a>
        <a href={withReturn(CENTRE_NOTES_URL)}>Open Centre Notes</a>
        <a href={withReturn(MOOD_LEXICON_URL)}>Open Mood Lexicon</a>
        <a href={withReturn(CINEMATIC_QUOTATIONS_URL)}>Open Cinematic Quotations</a>
      </nav>
    </footer>
  );
}
