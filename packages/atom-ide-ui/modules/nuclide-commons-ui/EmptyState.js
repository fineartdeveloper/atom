"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *  strict
 * @format
 */
class EmptyState extends React.Component {
  render() {
    return React.createElement("div", {
      className: "nuclide-ui-empty-state-container"
    }, React.createElement("div", {
      className: "nuclide-ui-empty-state-message"
    }, React.createElement("h1", null, this.props.title), this.props.message));
  }

}

exports.EmptyState = EmptyState;