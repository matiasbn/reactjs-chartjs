import day from 'dayjs';
import initialState from './initial-state';
import ACTION_TYPES from '../common/action-types';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SHOW_CONTRIBUTIONS:
      return {
        ...state,
        showContributions: !state.showContributions,
      };
    case ACTION_TYPES.SHOW_DAILY_RETURN:
      return {
        ...state,
        showDailyReturn: !state.showDailyReturn,
      };
    case ACTION_TYPES.SHOW_PF_INDEX:
      return {
        ...state,
        showPFIndex: !state.showPFIndex,
      };
    case ACTION_TYPES.SHOW_PF_VALUE:
      return {
        ...state,
        showPFValue: !state.showPFValue,
      };
    case ACTION_TYPES.CHANGE_START_DATE:
      const isAfterFinish = day(action.value).isAfter(state.finishDate);
      return {
        ...state,
        startDate: action.value,
        finishDate: isAfterFinish ? action.value : state.finishDate,
      };
    case ACTION_TYPES.CHANGE_FINISH_DATE:
      return {
        ...state,
        finishDate: action.value,
      };
    default:
      break;
  }
  return state;
}
