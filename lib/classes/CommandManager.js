'use babel';

module.exports = class CommandManager {

  constructor(data) {
    this.commands = [];

    if (typeof data !== 'undefined' && !_.isEmpty(data)) {
      if (_.isObject(data)) {
        this.commands.push(data);
      } else if(_.isArray(data)) {
        this.commands.push(data);
      }
    }
  }
};