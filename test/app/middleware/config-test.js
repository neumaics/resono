import configMiddleware from '../../../app/middleware/config';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe.only('config middleware', () => {
  let middlewares;
  let mockStore;

  beforeEach(() => {
    middlewares = [ thunk ];
    mockStore = configureMockStore(middlewares);
  });

  it('should do stuff', () => {
    expect(true).toBe(true);
  });

  it('should setup watching for config file changes', () => {

  });

  it('should retrieve the contents of the config file', () => {

  });
});
