import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import config from '../../config/environment';

var App;

module('Acceptance: ConfirmGlobal', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Set global', function(assert) {
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.equal(window.Dummy.someProp, App.someProp, 'App is exported to window.Dummy');
  });
});

test('Don\'t clobber', function(assert) {
  window.Dummy = 'test';
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.equal(window.Dummy, 'test', 'App is not exported to window.Dummy');
  });
});
