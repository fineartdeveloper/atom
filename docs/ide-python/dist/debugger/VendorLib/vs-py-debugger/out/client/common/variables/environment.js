"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const dotenv = require("dotenv");

const fs = require("fs-extra");

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../types");

let EnvironmentVariablesService = class EnvironmentVariablesService {
  constructor(pathUtils) {
    this.pathVariable = pathUtils.getPathVariableName();
  }

  parseFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
      const exists = yield fs.pathExists(filePath);

      if (!exists) {
        return undefined;
      }

      if (!fs.lstatSync(filePath).isFile()) {
        return undefined;
      }

      return dotenv.parse(yield fs.readFile(filePath));
    });
  }

  mergeVariables(source, target) {
    if (!target) {
      return;
    }

    const settingsNotToMerge = ['PYTHONPATH', this.pathVariable];
    Object.keys(source).forEach(setting => {
      if (settingsNotToMerge.indexOf(setting) >= 0) {
        return;
      }

      if (target[setting] === undefined) {
        target[setting] = source[setting];
      }
    });
  }

  appendPythonPath(vars, ...pythonPaths) {
    return this.appendPaths(vars, 'PYTHONPATH', ...pythonPaths);
  }

  appendPath(vars, ...paths) {
    return this.appendPaths(vars, this.pathVariable, ...paths);
  }

  appendPaths(vars, variableName, ...pathsToAppend) {
    const valueToAppend = pathsToAppend.filter(item => typeof item === 'string' && item.trim().length > 0).map(item => item.trim()).join(path.delimiter);

    if (valueToAppend.length === 0) {
      return vars;
    }

    if (typeof vars[variableName] === 'string' && vars[variableName].length > 0) {
      vars[variableName] = vars[variableName] + path.delimiter + valueToAppend;
    } else {
      vars[variableName] = valueToAppend;
    }

    return vars;
  }

};
EnvironmentVariablesService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IPathUtils))], EnvironmentVariablesService);
exports.EnvironmentVariablesService = EnvironmentVariablesService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJkb3RlbnYiLCJyZXF1aXJlIiwiZnMiLCJpbnZlcnNpZnlfMSIsInBhdGgiLCJ0eXBlc18xIiwiRW52aXJvbm1lbnRWYXJpYWJsZXNTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJwYXRoVXRpbHMiLCJwYXRoVmFyaWFibGUiLCJnZXRQYXRoVmFyaWFibGVOYW1lIiwicGFyc2VGaWxlIiwiZmlsZVBhdGgiLCJleGlzdHMiLCJwYXRoRXhpc3RzIiwidW5kZWZpbmVkIiwibHN0YXRTeW5jIiwiaXNGaWxlIiwicGFyc2UiLCJyZWFkRmlsZSIsIm1lcmdlVmFyaWFibGVzIiwic291cmNlIiwic2V0dGluZ3NOb3RUb01lcmdlIiwia2V5cyIsImZvckVhY2giLCJzZXR0aW5nIiwiaW5kZXhPZiIsImFwcGVuZFB5dGhvblBhdGgiLCJ2YXJzIiwicHl0aG9uUGF0aHMiLCJhcHBlbmRQYXRocyIsImFwcGVuZFBhdGgiLCJwYXRocyIsInZhcmlhYmxlTmFtZSIsInBhdGhzVG9BcHBlbmQiLCJ2YWx1ZVRvQXBwZW5kIiwiZmlsdGVyIiwiaXRlbSIsInRyaW0iLCJtYXAiLCJqb2lu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LENBRjhCLENBQUQsRUFHckN0QywyQkFIcUMsQ0FBeEM7QUFJQVAsT0FBTyxDQUFDTywyQkFBUixHQUFzQ0EsMkJBQXRDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb3RlbnYgPSByZXF1aXJlKFwiZG90ZW52XCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xubGV0IEVudmlyb25tZW50VmFyaWFibGVzU2VydmljZSA9IGNsYXNzIEVudmlyb25tZW50VmFyaWFibGVzU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocGF0aFV0aWxzKSB7XG4gICAgICAgIHRoaXMucGF0aFZhcmlhYmxlID0gcGF0aFV0aWxzLmdldFBhdGhWYXJpYWJsZU5hbWUoKTtcbiAgICB9XG4gICAgcGFyc2VGaWxlKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdHMgPSB5aWVsZCBmcy5wYXRoRXhpc3RzKGZpbGVQYXRoKTtcbiAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZnMubHN0YXRTeW5jKGZpbGVQYXRoKS5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZG90ZW52LnBhcnNlKHlpZWxkIGZzLnJlYWRGaWxlKGZpbGVQYXRoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtZXJnZVZhcmlhYmxlcyhzb3VyY2UsIHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHRpbmdzTm90VG9NZXJnZSA9IFsnUFlUSE9OUEFUSCcsIHRoaXMucGF0aFZhcmlhYmxlXTtcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzTm90VG9NZXJnZS5pbmRleE9mKHNldHRpbmcpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0W3NldHRpbmddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc2V0dGluZ10gPSBzb3VyY2Vbc2V0dGluZ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBlbmRQeXRob25QYXRoKHZhcnMsIC4uLnB5dGhvblBhdGhzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZFBhdGhzKHZhcnMsICdQWVRIT05QQVRIJywgLi4ucHl0aG9uUGF0aHMpO1xuICAgIH1cbiAgICBhcHBlbmRQYXRoKHZhcnMsIC4uLnBhdGhzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZFBhdGhzKHZhcnMsIHRoaXMucGF0aFZhcmlhYmxlLCAuLi5wYXRocyk7XG4gICAgfVxuICAgIGFwcGVuZFBhdGhzKHZhcnMsIHZhcmlhYmxlTmFtZSwgLi4ucGF0aHNUb0FwcGVuZCkge1xuICAgICAgICBjb25zdCB2YWx1ZVRvQXBwZW5kID0gcGF0aHNUb0FwcGVuZFxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBpdGVtLnRyaW0oKS5sZW5ndGggPiAwKVxuICAgICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpKVxuICAgICAgICAgICAgLmpvaW4ocGF0aC5kZWxpbWl0ZXIpO1xuICAgICAgICBpZiAodmFsdWVUb0FwcGVuZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFyc1t2YXJpYWJsZU5hbWVdID09PSAnc3RyaW5nJyAmJiB2YXJzW3ZhcmlhYmxlTmFtZV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyc1t2YXJpYWJsZU5hbWVdID0gdmFyc1t2YXJpYWJsZU5hbWVdICsgcGF0aC5kZWxpbWl0ZXIgKyB2YWx1ZVRvQXBwZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVUb0FwcGVuZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFycztcbiAgICB9XG59O1xuRW52aXJvbm1lbnRWYXJpYWJsZXNTZXJ2aWNlID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzEuSVBhdGhVdGlscykpXG5dLCBFbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UpO1xuZXhwb3J0cy5FbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2UgPSBFbnZpcm9ubWVudFZhcmlhYmxlc1NlcnZpY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnZpcm9ubWVudC5qcy5tYXAiXX0=