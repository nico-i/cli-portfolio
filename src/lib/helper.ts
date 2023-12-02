export const updateQueryString = (newSearchParams?: URLSearchParams) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.search = newSearchParams?.toString() || ``;
  window.history.replaceState({}, ``, currentUrl);
};
