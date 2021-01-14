export const sortCompare = (a, b, key, isDescending) => {
  if (a[key] < b[key]) {
    return isDescending ? -1 : 1;
  }
  if (a[key] > b[key]) {
    return isDescending ? 1 : -1;
  }
  return 0;
};
