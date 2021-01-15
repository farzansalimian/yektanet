export const sortCompare = (a, b, key, isDescending) => {
  const firstItem = a[key];
  const secondItem = b[key];
  // If both are number
  if (
    Number.isFinite(firstItem) &&
    !Number.isNaN(firstItem) &&
    Number.isFinite(secondItem) &&
    !Number.isNaN(secondItem)
  ) {
    return isDescending ? firstItem - secondItem : secondItem - firstItem;
  }
  // Otherwise convert them to string
  const firstString = String(firstItem);
  const secondString = String(secondItem);
  return isDescending
    ? firstString.localeCompare(secondString)
    : secondString.localeCompare(firstString);
};
