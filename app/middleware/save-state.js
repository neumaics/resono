
export default function statePersistence() {
  return (next) => (action) => {
    let returnValue = next(action);

    return returnValue;
  };
}
