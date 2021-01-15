import FILTER_KEYS from '../../constants/filterKeys';
import { getEventValue } from '../../utils/eventUtils';

function handleSearch(onSearchKeyword = () => {}) {
  const onNameSearch = (event) => {
    onSearchKeyword(FILTER_KEYS.name, getEventValue(event));
  };

  const onDateSearch = (event) => {
    onSearchKeyword(FILTER_KEYS.date, getEventValue(event));
  };

  const onFieldSearch = (event) => {
    onSearchKeyword(FILTER_KEYS.field, getEventValue(event));
  };

  const onTitleSearch = (event) => {
    onSearchKeyword(FILTER_KEYS.title, getEventValue(event));
  };

  return { onNameSearch, onDateSearch, onFieldSearch, onTitleSearch };
}

export default handleSearch;
