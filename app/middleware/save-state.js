import Immutable from 'immutable'
import jsonfile from 'jsonFile'

export default function statePersistence({ getState }) {
  return (next) => (action) => {
    let returnValue = next(action);

    const state = Immutable.fromJS(getState()).toJS();

    console.log(JSON.stringify(state));
    return returnValue;
  }
}
