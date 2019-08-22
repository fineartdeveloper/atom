Object.defineProperty(exports, '__esModule', {
  value: true
});
/** @babel */

var formatter = {
  space: function space(scope) {
    var softTabs = atom.config.get('editor.softTabs', { scope: scope });
    var tabLength = Number([atom.config.get('editor.tabLength', { scope: scope })]);
    if (softTabs) {
      return Array(tabLength + 1).join(' ');
    } else {
      return '\t';
    }
  },

  stringify: function stringify(obj, options) {
    var scope = (options != null ? options.scope : undefined) != null ? options.scope : null;
    var sorted = (options != null ? options.sorted : undefined) != null ? options.sorted : false;

    // lazy load requirements
    var JSONbig = require('json-bigint');
    var stringify = require('json-stable-stringify');
    require('bignumber.js');

    var space = formatter.space(scope);
    if (sorted) {
      return stringify(obj, {
        space: space,
        replacer: function replacer(key, value) {
          try {
            if (value.constructor.name === 'BigNumber') {
              return JSONbig.stringify(value);
            }
          } catch (error) {
            // ignore
          }
          return value;
        }
      });
    } else {
      return JSONbig.stringify(obj, null, space);
    }
  },

  parseAndValidate: function parseAndValidate(text) {
    var JSONbig = require('json-bigint'); // lazy load requirements
    try {
      return JSONbig.parse(text);
    } catch (error) {
      if (atom.config.get('pretty-json.notifyOnParseError')) {
        atom.notifications.addWarning('JSON Pretty: ' + error.name + ': ' + error.message + ' at character ' + error.at + ' near "' + error.text + '"');
      }
      throw error;
    }
  },

  pretty: function pretty(text, options) {
    var parsed = undefined;
    try {
      parsed = formatter.parseAndValidate(text);
    } catch (error) {
      return text;
    }
    return formatter.stringify(parsed, options);
  },

  minify: function minify(text) {
    try {
      formatter.parseAndValidate(text);
    } catch (error) {
      return text;
    }
    var uglify = require('jsonminify'); // lazy load requirements
    return uglify(text);
  },

  jsonify: function jsonify(text, options) {
    var vm = require('vm'); // lazy load requirements
    try {
      vm.runInThisContext('newObject = ' + text);
    } catch (error) {
      if (atom.config.get('pretty-json.notifyOnParseError')) {
        atom.notifications.addWarning('JSON Pretty: eval issue: ' + error);
      }
      return text;
    }
    return formatter.stringify(newObject, options); // eslint-disable-line no-undef
  }
};

exports['default'] = formatter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdWRwcmF3YXQvLmF0b20vcGFja2FnZXMvcHJldHR5LWpzb24vc3JjL2Zvcm1hdHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLElBQU0sU0FBUyxHQUFHO0FBQ2hCLE9BQUssRUFBQyxlQUFDLEtBQUssRUFBRTtBQUNaLFFBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDLENBQUE7QUFDOUQsUUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUUsUUFBSSxRQUFRLEVBQUU7QUFDWixhQUFPLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3RDLE1BQU07QUFDTCxhQUFPLElBQUksQ0FBQTtLQUNaO0dBQ0Y7O0FBRUQsV0FBUyxFQUFDLG1CQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDdkIsUUFBTSxLQUFLLEdBQUcsQUFBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUEsSUFBSyxJQUFJLEdBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7QUFDNUYsUUFBTSxNQUFNLEdBQUcsQUFBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUEsSUFBSyxJQUFJLEdBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7OztBQUdoRyxRQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDdEMsUUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7QUFDbEQsV0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBOztBQUV2QixRQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BDLFFBQUksTUFBTSxFQUFFO0FBQ1YsYUFBTyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BCLGFBQUssRUFBTCxLQUFLO0FBQ0wsZ0JBQVEsRUFBQyxrQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3BCLGNBQUk7QUFDRixnQkFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7QUFDMUMscUJBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNoQztXQUNGLENBQUMsT0FBTyxLQUFLLEVBQUU7O1dBRWY7QUFDRCxpQkFBTyxLQUFLLENBQUE7U0FDYjtPQUNGLENBQ0EsQ0FBQTtLQUNGLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtLQUMzQztHQUNGOztBQUVELGtCQUFnQixFQUFDLDBCQUFDLElBQUksRUFBRTtBQUN0QixRQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDdEMsUUFBSTtBQUNGLGFBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUMzQixDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2QsVUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO0FBQ3JELFlBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxtQkFDWCxLQUFLLENBQUMsSUFBSSxVQUFLLEtBQUssQ0FBQyxPQUFPLHNCQUFpQixLQUFLLENBQUMsRUFBRSxlQUFVLEtBQUssQ0FBQyxJQUFJLE9BQzFGLENBQUE7T0FDRjtBQUNELFlBQU0sS0FBSyxDQUFBO0tBQ1o7R0FDRjs7QUFFRCxRQUFNLEVBQUMsZ0JBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNyQixRQUFJLE1BQU0sWUFBQSxDQUFBO0FBQ1YsUUFBSTtBQUNGLFlBQU0sR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDMUMsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLGFBQU8sSUFBSSxDQUFBO0tBQ1o7QUFDRCxXQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0dBQzVDOztBQUVELFFBQU0sRUFBQyxnQkFBQyxJQUFJLEVBQUU7QUFDWixRQUFJO0FBQ0YsZUFBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ2pDLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDZCxhQUFPLElBQUksQ0FBQTtLQUNaO0FBQ0QsUUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ3BDLFdBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQ3BCOztBQUVELFNBQU8sRUFBRSxpQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZCLFFBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixRQUFJO0FBQ0YsUUFBRSxDQUFDLGdCQUFnQixrQkFBZ0IsSUFBSSxDQUFHLENBQUE7S0FDM0MsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNkLFVBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtBQUNyRCxZQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsK0JBQTZCLEtBQUssQ0FBRyxDQUFBO09BQ25FO0FBQ0QsYUFBTyxJQUFJLENBQUE7S0FDWjtBQUNELFdBQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7R0FDL0M7Q0FDRixDQUFBOztxQkFFYyxTQUFTIiwiZmlsZSI6Ii9Vc2Vycy9zdWRwcmF3YXQvLmF0b20vcGFja2FnZXMvcHJldHR5LWpzb24vc3JjL2Zvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAYmFiZWwgKi9cblxuY29uc3QgZm9ybWF0dGVyID0ge1xuICBzcGFjZSAoc2NvcGUpIHtcbiAgICBjb25zdCBzb2Z0VGFicyA9IGF0b20uY29uZmlnLmdldCgnZWRpdG9yLnNvZnRUYWJzJywgeyBzY29wZSB9KVxuICAgIGNvbnN0IHRhYkxlbmd0aCA9IE51bWJlcihbYXRvbS5jb25maWcuZ2V0KCdlZGl0b3IudGFiTGVuZ3RoJywgeyBzY29wZSB9KV0pXG4gICAgaWYgKHNvZnRUYWJzKSB7XG4gICAgICByZXR1cm4gQXJyYXkodGFiTGVuZ3RoICsgMSkuam9pbignICcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnXFx0J1xuICAgIH1cbiAgfSxcblxuICBzdHJpbmdpZnkgKG9iaiwgb3B0aW9ucykge1xuICAgIGNvbnN0IHNjb3BlID0gKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLnNjb3BlIDogdW5kZWZpbmVkKSAhPSBudWxsKSA/IG9wdGlvbnMuc2NvcGUgOiBudWxsXG4gICAgY29uc3Qgc29ydGVkID0gKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLnNvcnRlZCA6IHVuZGVmaW5lZCkgIT0gbnVsbCkgPyBvcHRpb25zLnNvcnRlZCA6IGZhbHNlXG5cbiAgICAvLyBsYXp5IGxvYWQgcmVxdWlyZW1lbnRzXG4gICAgY29uc3QgSlNPTmJpZyA9IHJlcXVpcmUoJ2pzb24tYmlnaW50JylcbiAgICBjb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0YWJsZS1zdHJpbmdpZnknKVxuICAgIHJlcXVpcmUoJ2JpZ251bWJlci5qcycpXG5cbiAgICBjb25zdCBzcGFjZSA9IGZvcm1hdHRlci5zcGFjZShzY29wZSlcbiAgICBpZiAoc29ydGVkKSB7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5KG9iaiwge1xuICAgICAgICBzcGFjZSxcbiAgICAgICAgcmVwbGFjZXIgKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdCaWdOdW1iZXInKSB7XG4gICAgICAgICAgICAgIHJldHVybiBKU09OYmlnLnN0cmluZ2lmeSh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBKU09OYmlnLnN0cmluZ2lmeShvYmosIG51bGwsIHNwYWNlKVxuICAgIH1cbiAgfSxcblxuICBwYXJzZUFuZFZhbGlkYXRlICh0ZXh0KSB7XG4gICAgY29uc3QgSlNPTmJpZyA9IHJlcXVpcmUoJ2pzb24tYmlnaW50JykgLy8gbGF6eSBsb2FkIHJlcXVpcmVtZW50c1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTmJpZy5wYXJzZSh0ZXh0KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdwcmV0dHktanNvbi5ub3RpZnlPblBhcnNlRXJyb3InKSkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICBgSlNPTiBQcmV0dHk6ICR7ZXJyb3IubmFtZX06ICR7ZXJyb3IubWVzc2FnZX0gYXQgY2hhcmFjdGVyICR7ZXJyb3IuYXR9IG5lYXIgXCIke2Vycm9yLnRleHR9XCJgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9LFxuXG4gIHByZXR0eSAodGV4dCwgb3B0aW9ucykge1xuICAgIGxldCBwYXJzZWRcbiAgICB0cnkge1xuICAgICAgcGFyc2VkID0gZm9ybWF0dGVyLnBhcnNlQW5kVmFsaWRhdGUodGV4dClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlci5zdHJpbmdpZnkocGFyc2VkLCBvcHRpb25zKVxuICB9LFxuXG4gIG1pbmlmeSAodGV4dCkge1xuICAgIHRyeSB7XG4gICAgICBmb3JtYXR0ZXIucGFyc2VBbmRWYWxpZGF0ZSh0ZXh0KVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdGV4dFxuICAgIH1cbiAgICBjb25zdCB1Z2xpZnkgPSByZXF1aXJlKCdqc29ubWluaWZ5JykgLy8gbGF6eSBsb2FkIHJlcXVpcmVtZW50c1xuICAgIHJldHVybiB1Z2xpZnkodGV4dClcbiAgfSxcblxuICBqc29uaWZ5ICAodGV4dCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHZtID0gcmVxdWlyZSgndm0nKSAvLyBsYXp5IGxvYWQgcmVxdWlyZW1lbnRzXG4gICAgdHJ5IHtcbiAgICAgIHZtLnJ1bkluVGhpc0NvbnRleHQoYG5ld09iamVjdCA9ICR7dGV4dH1gKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdwcmV0dHktanNvbi5ub3RpZnlPblBhcnNlRXJyb3InKSkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhgSlNPTiBQcmV0dHk6IGV2YWwgaXNzdWU6ICR7ZXJyb3J9YClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZXIuc3RyaW5naWZ5KG5ld09iamVjdCwgb3B0aW9ucykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlclxuIl19