'use strict';
import 'es6-promise/auto';
import 'dom-node-polyfills';
import 'element-matches';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'fetch-ie8';
import 'classlist-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculate from './modules/calculate';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calculate();          
});