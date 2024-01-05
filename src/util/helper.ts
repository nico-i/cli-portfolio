import { StrapiCollection } from '@/util/types';

export function getCharDimensions(): { width: number; height: number } {
  const span = document.createElement(`span`);

  // Set the font and content
  span.style.position = `absolute`;
  span.style.left = `-9999px`;
  span.textContent = `m`; // The character 'm' is often used as it is typically wide

  // Append it to the body and measure
  document.body.appendChild(span);
  const width = span.offsetWidth; // Get the width of the character
  const height = span.offsetHeight; // Get the height of the character

  // Clean up
  document.body.removeChild(span);

  return { width, height };
}

export function escapeMarkdown(toEscape: string, replacer: string = `\\$1`) {
  const markdownMetaRegex = /([*_`#[\]()<>!])/g;
  return toEscape.replace(markdownMetaRegex, replacer);
}

/**
 * Parses a collection of nodes from Strapi to a collection by locale
 * @param rawStaticQueryRes - the raw result from the static query. Each node must have a locale field
 * @param collectionName - the name of the collection
 * @param parseNode - function to parse a single node
 * @returns a collection by locale
 */
export function parseStrapiCollectionToCollectionByLocale<
  T extends StrapiCollection,
>(
  rawStaticQueryRes: any,
  collectionName: string,
  parseNode: (node: any) => T,
): Record<string, T[]> {
  const collectionByLocale: Record<string, T[]> = {};
  if (!rawStaticQueryRes[`allStrapi${collectionName}`]) {
    throw new Error(`No collection found for ${collectionName}`);
  }

  let defaultLocaleItem: T;

  rawStaticQueryRes[`allStrapi${collectionName}`].nodes.forEach((node: any) => {
    if (!node.locale) {
      throw new Error(`No locale found for ${collectionName}`);
    }

    if (!collectionByLocale[node.locale]) {
      collectionByLocale[node.locale] = [];
    }

    if (node.locale === `en`) {
      defaultLocaleItem = parseNode(node);
    }

    const currentLocaleItem = parseNode(node);
    Object.entries(node).forEach(([key, value]) => {
      // Use the default locale value if the value is null
      if (value !== null && (!Array.isArray(value) || value.length > 0)) {
        return;
      }
      // value is either null or an empty array
      (currentLocaleItem as Record<string, unknown>)[key] =
        defaultLocaleItem[key];
    });
    collectionByLocale[node.locale].push(currentLocaleItem);
  });
  console.log(collectionByLocale);
  return collectionByLocale;
}
