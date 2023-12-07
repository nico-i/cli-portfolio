export function getCharWidth(): number {
  const span = document.createElement(`span`);

  // Set the font and content
  span.style.position = `absolute`;
  span.style.left = `-9999px`;
  span.textContent = `m`; // The character 'm' is often used as it is typically wide

  // Append it to the body and measure
  document.body.appendChild(span);
  const width = span.offsetWidth; // Get the width of the character

  // Clean up
  document.body.removeChild(span);

  return width;
}

export function escapeMarkdown(toEscape: string, replacer: string = `\\$1`) {
  const markdownMetaRegex = /([*_`#[\]()<>!])/g;
  return toEscape.replace(markdownMetaRegex, replacer);
}
