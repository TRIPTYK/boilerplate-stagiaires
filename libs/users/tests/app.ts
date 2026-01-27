import Application from "ember-strict-application-resolver";
import { moduleRegistry } from "#src/index.js";
import {  moduleRegistry as inputValidationRegistry  }  from '@triptyk/ember-input-validation';
import IntlService from 'ember-intl/services/intl';
import { setDebugFunction } from "@ember/debug";
import compatModules from '@embroider/virtual/compat-modules';
import loadInitializers from 'ember-load-initializers';
import PageTitleService from "ember-page-title/services/page-title";
import EmberRouter from "@ember/routing/router";

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

export class TestApp extends Application {
  podModulePrefix = '';
  modules = {
    './router': Router,
    ...moduleRegistry(),
    ...inputValidationRegistry(),
    ...compatModules,
    './services/intl': { default: IntlService},
    './services/page-title': { default: PageTitleService},
  };
}

loadInitializers(TestApp, '', compatModules);

setDebugFunction('debug', (...args) => {
  console.log(...args);
});
