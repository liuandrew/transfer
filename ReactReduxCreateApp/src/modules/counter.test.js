import reducer from './counter'
import * as actions from './counter'

describe('counter reducer', () => {
	const initialState = {
		count: 0,
		isIncrementing: false,
		isDecrementing: false
	}

	it('should handle INCREMENT', () => {
		const state = reducer(initialState, { type: actions.INCREMENT })
		expect(state.count).toEqual(1)
	})

	it('should handle DECREMENT', () => {
		const state = reducer(initialState, { type: actions.DECREMENT })
		expect(state.count).toEqual(-1)
	})
})