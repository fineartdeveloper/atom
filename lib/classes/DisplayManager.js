'use babel';

console.clear();

_ = require('lodash');
fs = require('fs-extra');
path = require('path');

class DisplayManager
{

  options = {};

  constructor(options = {}) {
    const defaultOptions = {
      notifications: {
        dismissable: true,
      },
    };

    if (!_.isUndefined(options)) {
      this.options = Object.assign({}, defaultOptions, options);
    }
  }

  setOptions(userOptions = {}, defaultOptions = {}) {
    defaultOptions = (_.isUndefined(defaultOptions) || !_.isObject(defaultOptions)) ? {} : defaultOptions;
    userOptions = (_.isUndefined(userOptions) || !_.isObject(userOptions)) ? {} : userOptions;

    return Object.assign({}, defaultOptions, userOptions);
  }

  createInstance(displayBox, options = {}) {
    const userOptions = this.setOptions(options);

    displayBox.hide = function (callback) {
      if (_.isFunction(callback)) {
        callback(this);
      } else {
        setTimeout(function () {
          displayBox.dismiss();
        }, 500);
      }
    };

    return displayBox;
  }

  setOptions2(...options) {
    const userOptions = {};

    if (_.isUndefined(options) || _.isEmpty(options) || !_.isObject(options)) {
      options = [];
    }

    _.each(options, function (option) {
      Object.assign(userOptions, option);
    });

    return userOptions;
  }

  show(type = 'info', message = '', options = {}) {
    message = (_.isUndefined(message) || !_.isString(message)) ? '' : message;

    const userOptions = this.setOptions2(options, this.options.notifications);

    var displayBox;

    switch (type.toLowerCase()) {
      case 'info':
        displayBox = this.addInfo(message, userOptions);
        break;
      case 'success':
        displayBox = this.addSuccess(message, userOptions);
        break;
      case 'warning':
        displayBox = this.addWarning(message, userOptions);
        break;
      case 'error':
        displayBox = this.addError(message, userOptions);
        break;
      default:
        displayBox = this.addInfo(message, userOptions);
        break;
    }

    return displayBox;
  }

  addInfo(message = "", options = {}) {
    const userOptions = this.setOptions(options, this.options.notifications);
    return this.createInstance(atom.notifications.addInfo(message, userOptions));
  }

  addSuccess(message = "", options = {}) {
    const userOptions = this.setOptions(options, this.options.notifications);
    return this.createInstance(atom.notifications.addSuccess(message, userOptions));
  }

  addWarning(message = "", options = {}) {
    const userOptions = this.setOptions(options, this.options.notifications);
    return this.createInstance(atom.notifications.addWarning(message, userOptions));
  }

  addError(message = "", options = {}) {
    const userOptions = this.setOptions(options, this.options.notifications);
    return this.createInstance(atom.notifications.addError(message, userOptions));
  }
}

module.exports = DisplayManager;