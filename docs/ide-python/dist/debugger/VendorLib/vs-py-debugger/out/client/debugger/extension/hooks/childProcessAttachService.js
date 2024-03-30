// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

const inversify_1 = require("inversify");

const types_1 = require("../../../common/application/types");

const misc_1 = require("../../../common/utils/misc");

const telemetry_1 = require("../../../telemetry");

const constants_1 = require("../../../telemetry/constants");
/**
 * This class is responsible for attaching the debugger to any
 * child processes launched. I.e. this is the classs responsible for multi-proc debugging.
 * @export
 * @class ChildProcessAttachEventHandler
 * @implements {IChildProcessAttachService}
 */


let ChildProcessAttachService = class ChildProcessAttachService {
  constructor(appShell, debugService, workspaceService) {
    this.appShell = appShell;
    this.debugService = debugService;
    this.workspaceService = workspaceService;
  }

  attach(data) {
    return __awaiter(this, void 0, void 0, function* () {
      const folder = this.getRelatedWorkspaceFolder(data);
      const debugConfig = this.getAttachConfiguration(data);
      const launched = yield this.debugService.startDebugging(folder, debugConfig);

      if (!launched) {
        this.appShell.showErrorMessage(`Failed to launch debugger for child process ${data.processId}`).then(misc_1.noop, misc_1.noop);
      }
    });
  }

  getRelatedWorkspaceFolder(data) {
    const workspaceFolder = data.rootStartRequest.arguments.workspaceFolder;

    if (!this.workspaceService.hasWorkspaceFolders || !workspaceFolder) {
      return;
    }

    return this.workspaceService.workspaceFolders.find(ws => ws.uri.fsPath === workspaceFolder);
  }

  getAttachConfiguration(data) {
    const args = data.rootStartRequest.arguments; // tslint:disable-next-line:no-any

    const config = JSON.parse(JSON.stringify(args));
    config.host = args.request === 'attach' ? args.host : 'localhost';
    config.port = data.port;
    config.name = `Child Process ${data.processId}`;
    config.request = 'attach';
    return config;
  }

};

__decorate([telemetry_1.captureTelemetry(constants_1.DEBUGGER_ATTACH_TO_CHILD_PROCESS)], ChildProcessAttachService.prototype, "attach", null);

ChildProcessAttachService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IApplicationShell)), __param(1, inversify_1.inject(types_1.IDebugService)), __param(2, inversify_1.inject(types_1.IWorkspaceService))], ChildProcessAttachService);
exports.ChildProcessAttachService = ChildProcessAttachService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoaWxkUHJvY2Vzc0F0dGFjaFNlcnZpY2UuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInR5cGVzXzEiLCJtaXNjXzEiLCJ0ZWxlbWV0cnlfMSIsImNvbnN0YW50c18xIiwiQ2hpbGRQcm9jZXNzQXR0YWNoU2VydmljZSIsImNvbnN0cnVjdG9yIiwiYXBwU2hlbGwiLCJkZWJ1Z1NlcnZpY2UiLCJ3b3Jrc3BhY2VTZXJ2aWNlIiwiYXR0YWNoIiwiZGF0YSIsImZvbGRlciIsImdldFJlbGF0ZWRXb3Jrc3BhY2VGb2xkZXIiLCJkZWJ1Z0NvbmZpZyIsImdldEF0dGFjaENvbmZpZ3VyYXRpb24iLCJsYXVuY2hlZCIsInN0YXJ0RGVidWdnaW5nIiwic2hvd0Vycm9yTWVzc2FnZSIsInByb2Nlc3NJZCIsIm5vb3AiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJyb290U3RhcnRSZXF1ZXN0IiwiaGFzV29ya3NwYWNlRm9sZGVycyIsIndvcmtzcGFjZUZvbGRlcnMiLCJmaW5kIiwid3MiLCJ1cmkiLCJmc1BhdGgiLCJhcmdzIiwiY29uZmlnIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiaG9zdCIsInJlcXVlc3QiLCJwb3J0IiwibmFtZSIsImNhcHR1cmVUZWxlbWV0cnkiLCJERUJVR0dFUl9BVFRBQ0hfVE9fQ0hJTERfUFJPQ0VTUyIsInByb3RvdHlwZSIsImluamVjdGFibGUiLCJpbmplY3QiLCJJQXBwbGljYXRpb25TaGVsbCIsIklEZWJ1Z1NlcnZpY2UiLCJJV29ya3NwYWNlU2VydmljZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFBSSxHQUFHSyxNQUFNLENBQUNDLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q0MsR0FBeEMsQ0FBdkIsR0FBc0VDLElBQXJIO0FBQUEsTUFBMkhPLENBQTNIO0FBQ0EsTUFBSSxPQUFPQyxPQUFQLEtBQW1CLFFBQW5CLElBQStCLE9BQU9BLE9BQU8sQ0FBQ0MsUUFBZixLQUE0QixVQUEvRCxFQUEyRUwsQ0FBQyxHQUFHSSxPQUFPLENBQUNDLFFBQVIsQ0FBaUJaLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQ0MsR0FBckMsRUFBMENDLElBQTFDLENBQUosQ0FBM0UsS0FDSyxLQUFLLElBQUlVLENBQUMsR0FBR2IsVUFBVSxDQUFDTSxNQUFYLEdBQW9CLENBQWpDLEVBQW9DTyxDQUFDLElBQUksQ0FBekMsRUFBNENBLENBQUMsRUFBN0MsRUFBaUQsSUFBSUgsQ0FBQyxHQUFHVixVQUFVLENBQUNhLENBQUQsQ0FBbEIsRUFBdUJOLENBQUMsR0FBRyxDQUFDSCxDQUFDLEdBQUcsQ0FBSixHQUFRTSxDQUFDLENBQUNILENBQUQsQ0FBVCxHQUFlSCxDQUFDLEdBQUcsQ0FB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LENBQUM0QyxpQkFBM0IsQ0FBSixDQUo0QixDQUFELEVBS25DeEMseUJBTG1DLENBQXRDO0FBTUFQLE9BQU8sQ0FBQ08seUJBQVIsR0FBb0NBLHlCQUFwQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL2FwcGxpY2F0aW9uL3R5cGVzXCIpO1xuY29uc3QgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi91dGlscy9taXNjXCIpO1xuY29uc3QgdGVsZW1ldHJ5XzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdGVsZW1ldHJ5XCIpO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vdGVsZW1ldHJ5L2NvbnN0YW50c1wiKTtcbi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgYXR0YWNoaW5nIHRoZSBkZWJ1Z2dlciB0byBhbnlcbiAqIGNoaWxkIHByb2Nlc3NlcyBsYXVuY2hlZC4gSS5lLiB0aGlzIGlzIHRoZSBjbGFzc3MgcmVzcG9uc2libGUgZm9yIG11bHRpLXByb2MgZGVidWdnaW5nLlxuICogQGV4cG9ydFxuICogQGNsYXNzIENoaWxkUHJvY2Vzc0F0dGFjaEV2ZW50SGFuZGxlclxuICogQGltcGxlbWVudHMge0lDaGlsZFByb2Nlc3NBdHRhY2hTZXJ2aWNlfVxuICovXG5sZXQgQ2hpbGRQcm9jZXNzQXR0YWNoU2VydmljZSA9IGNsYXNzIENoaWxkUHJvY2Vzc0F0dGFjaFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKGFwcFNoZWxsLCBkZWJ1Z1NlcnZpY2UsIHdvcmtzcGFjZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hcHBTaGVsbCA9IGFwcFNoZWxsO1xuICAgICAgICB0aGlzLmRlYnVnU2VydmljZSA9IGRlYnVnU2VydmljZTtcbiAgICAgICAgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlID0gd29ya3NwYWNlU2VydmljZTtcbiAgICB9XG4gICAgYXR0YWNoKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IHRoaXMuZ2V0UmVsYXRlZFdvcmtzcGFjZUZvbGRlcihkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IGRlYnVnQ29uZmlnID0gdGhpcy5nZXRBdHRhY2hDb25maWd1cmF0aW9uKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgbGF1bmNoZWQgPSB5aWVsZCB0aGlzLmRlYnVnU2VydmljZS5zdGFydERlYnVnZ2luZyhmb2xkZXIsIGRlYnVnQ29uZmlnKTtcbiAgICAgICAgICAgIGlmICghbGF1bmNoZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFNoZWxsLnNob3dFcnJvck1lc3NhZ2UoYEZhaWxlZCB0byBsYXVuY2ggZGVidWdnZXIgZm9yIGNoaWxkIHByb2Nlc3MgJHtkYXRhLnByb2Nlc3NJZH1gKS50aGVuKG1pc2NfMS5ub29wLCBtaXNjXzEubm9vcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRSZWxhdGVkV29ya3NwYWNlRm9sZGVyKGRhdGEpIHtcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlRm9sZGVyID0gZGF0YS5yb290U3RhcnRSZXF1ZXN0LmFyZ3VtZW50cy53b3Jrc3BhY2VGb2xkZXI7XG4gICAgICAgIGlmICghdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmhhc1dvcmtzcGFjZUZvbGRlcnMgfHwgIXdvcmtzcGFjZUZvbGRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLndvcmtzcGFjZVNlcnZpY2Uud29ya3NwYWNlRm9sZGVycy5maW5kKHdzID0+IHdzLnVyaS5mc1BhdGggPT09IHdvcmtzcGFjZUZvbGRlcik7XG4gICAgfVxuICAgIGdldEF0dGFjaENvbmZpZ3VyYXRpb24oZGF0YSkge1xuICAgICAgICBjb25zdCBhcmdzID0gZGF0YS5yb290U3RhcnRSZXF1ZXN0LmFyZ3VtZW50cztcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAgICAgY29uZmlnLmhvc3QgPSBhcmdzLnJlcXVlc3QgPT09ICdhdHRhY2gnID8gYXJncy5ob3N0IDogJ2xvY2FsaG9zdCc7XG4gICAgICAgIGNvbmZpZy5wb3J0ID0gZGF0YS5wb3J0O1xuICAgICAgICBjb25maWcubmFtZSA9IGBDaGlsZCBQcm9jZXNzICR7ZGF0YS5wcm9jZXNzSWR9YDtcbiAgICAgICAgY29uZmlnLnJlcXVlc3QgPSAnYXR0YWNoJztcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG59O1xuX19kZWNvcmF0ZShbXG4gICAgdGVsZW1ldHJ5XzEuY2FwdHVyZVRlbGVtZXRyeShjb25zdGFudHNfMS5ERUJVR0dFUl9BVFRBQ0hfVE9fQ0hJTERfUFJPQ0VTUylcbl0sIENoaWxkUHJvY2Vzc0F0dGFjaFNlcnZpY2UucHJvdG90eXBlLCBcImF0dGFjaFwiLCBudWxsKTtcbkNoaWxkUHJvY2Vzc0F0dGFjaFNlcnZpY2UgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JQXBwbGljYXRpb25TaGVsbCkpLFxuICAgIF9fcGFyYW0oMSwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzEuSURlYnVnU2VydmljZSkpLFxuICAgIF9fcGFyYW0oMiwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzEuSVdvcmtzcGFjZVNlcnZpY2UpKVxuXSwgQ2hpbGRQcm9jZXNzQXR0YWNoU2VydmljZSk7XG5leHBvcnRzLkNoaWxkUHJvY2Vzc0F0dGFjaFNlcnZpY2UgPSBDaGlsZFByb2Nlc3NBdHRhY2hTZXJ2aWNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2hpbGRQcm9jZXNzQXR0YWNoU2VydmljZS5qcy5tYXAiXX0=