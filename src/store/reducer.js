const defaultState = {
	city: null
};

const reducer = (state = defaultState, action) => {
	if (action.type === 'setCity') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.city = action.value;
		return newState;
	}
	return state;
};

export default reducer;
