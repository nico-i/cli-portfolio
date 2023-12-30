import { StrapiCollection } from '@/util/types';

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

  rawStaticQueryRes[`allStrapi${collectionName}`].nodes.forEach((node: any) => {
    if (!node.locale) {
      throw new Error(`No locale found for ${collectionName}`);
    }

    if (!collectionByLocale[node.locale]) {
      collectionByLocale[node.locale] = [];
    }

    const defaultLocaleSection: T = parseNode(node);

    Object.entries(node).forEach(([key, value]) => {
      // Use the default locale value if the value is null
      if (value !== null) return;
      const defaultLocaleNode: T | undefined = collectionByLocale[0]?.find(
        (node) => node.id === defaultLocaleSection.id,
      );
      if (!defaultLocaleNode) return;
      (defaultLocaleSection as any)[key] = (defaultLocaleNode as any)[key];
    });

    collectionByLocale[node.locale].push(defaultLocaleSection);
  });
  return collectionByLocale;
}
