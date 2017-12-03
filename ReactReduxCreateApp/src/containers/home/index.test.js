import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Home from './index'

const mockStore = configureMockStore([thunk])

describe('Home', () => {
	let store
	let wrapper
	beforeEach(() => {
		store = mockStore({
			counter: {
				count: 1
			}
		})

		wrapper = mount(
			<Provider store={store}>
				<Home />
			</Provider>
		)
	})

	it('has a Home component', () => {
		expect(wrapper.contains(Home)).toEqual(true)
	})
	it('has a counter', () => {
		const component = wrapper.find('.counter')
		expect(component.length).toBe(1)
	})
	it('has 1 on counter', () => {
		const component = wrapper.find('.counter')
		expect(component.text()).toBe('Count: 1')
	})
})