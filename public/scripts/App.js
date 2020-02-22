'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _personList = require('./Components/personList');

var _personList2 = _interopRequireDefault(_personList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return _react2.default.createElement(
    'div',
    { className: 'App' },
    _react2.default.createElement(_personList2.default, null)
  );
}

exports.default = App;
