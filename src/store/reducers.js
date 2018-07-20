const initialState = {
	messages: [
		{
			id: '11',
			author: 'unknown',
      authorColor: '#0044aa',
			text: 'Hi there!',
			sameAuthor: false
		},
		{
			id: '22',
			author: 'noname',
      authorColor: '#cccc00',
			text: 'Wassaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaap!!!!!',
			sameAuthor: false
		},
		{
			id: '33',
			author: 'infamous',
      authorColor: '#00dd77',
			text: 'hello guys:)',
			sameAuthor: false
		},
		{
			id: '44',
			author: 'anonymous',
      authorColor: '#7777ee',
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam architecto asperiores aut commodi enim est et eveniet excepturi facere, fuga maxime molestias, natus nihil obcaecati placeat quaerat repellendus totam.',
			sameAuthor: false
		}
	]
};

export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_MESSAGE':
			return {
				...state,
				messages: [...state.messages, action.payload]
			};
	}
	return state;
};
