import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from "react-router-dom";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Navbar from './containers/Navbar/Navbar';

const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('Navbar', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      authenticated: false,
      userInfo: {},
      isAdmin: false,
      token: ''
    });
    
    component = shallow(
      <Provider store={store}>
        <Navbar />
      </Provider>
    ).dive();
  });

  it('shouldnt render links if not authenticated', () => {
    expect(component.find(Link)).toHaveLength(0);
  })




})