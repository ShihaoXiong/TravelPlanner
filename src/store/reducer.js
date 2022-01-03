const defaultState = {
	city: null,
	date: [],
	planId: '',
	attractions: null
};

const reducer = (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	newState[action.type] = action.value;
	return newState;
};

export default reducer;
