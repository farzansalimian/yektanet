import FILTER_KEYS from '../../constants/filterKeys';

function handleSort(onSorByKey = () => {}) {
  const sorByName = () => {
    onSorByKey(FILTER_KEYS.name);
  };

  const sorByDate = () => {
    onSorByKey(FILTER_KEYS.date);
  };

  const sorByField = () => {
    onSorByKey(FILTER_KEYS.field);
  };

  const sorByTitle = () => {
    onSorByKey(FILTER_KEYS.title);
  };

  const sorByNewValue = () => {
    onSorByKey(FILTER_KEYS.newValue);
  };

  const sorByOldValue = () => {
    onSorByKey(FILTER_KEYS.oldValue);
  };

  return { sorByName, sorByDate, sorByField, sorByTitle, sorByNewValue, sorByOldValue };
}

export default handleSort;
