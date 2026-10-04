export function formatSpeechText(text: string): string {
  const trimmed = text.trim();

  if (!trimmed) {
    return "";
  }

  let formatted = trimmed;

  // Capitalize the first character only.
  formatted =
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1);

  // Add final punctuation only if the speech
  // recognition service didn't provide any.
  if (!/[.!?]$/.test(formatted)) {
    formatted += ".";
  }

  return formatted;
}