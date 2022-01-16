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

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const types_1 = require("../../common/application/types");

const types_2 = require("../../common/platform/types");

const types_3 = require("../../common/terminal/types");

const types_4 = require("../../common/types");

const types_5 = require("../../common/types");

const terminalCodeExecution_1 = require("./terminalCodeExecution");

let ReplProvider = class ReplProvider extends terminalCodeExecution_1.TerminalCodeExecutionProvider {
  constructor(terminalServiceFactory, configurationService, workspace, disposableRegistry, platformService) {
    super(terminalServiceFactory, configurationService, workspace, disposableRegistry, platformService);
    this.terminalTitle = 'REPL';
  }

};
ReplProvider = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_3.ITerminalServiceFactory)), __param(1, inversify_1.inject(types_4.IConfigurationService)), __param(2, inversify_1.inject(types_1.IWorkspaceService)), __param(3, inversify_1.inject(types_5.IDisposableRegistry)), __param(4, inversify_1.inject(types_2.IPlatformService))], ReplProvider);
exports.ReplProvider = ReplProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcGwuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ0eXBlc18xIiwidHlwZXNfMiIsInR5cGVzXzMiLCJ0eXBlc180IiwidHlwZXNfNSIsInRlcm1pbmFsQ29kZUV4ZWN1dGlvbl8xIiwiUmVwbFByb3ZpZGVyIiwiVGVybWluYWxDb2RlRXhlY3V0aW9uUHJvdmlkZXIiLCJjb25zdHJ1Y3RvciIsInRlcm1pbmFsU2VydmljZUZhY3RvcnkiLCJjb25maWd1cmF0aW9uU2VydmljZSIsIndvcmtzcGFjZSIsImRpc3Bvc2FibGVSZWdpc3RyeSIsInBsYXRmb3JtU2VydmljZSIsInRlcm1pbmFsVGl0bGUiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVRlcm1pbmFsU2VydmljZUZhY3RvcnkiLCJJQ29uZmlndXJhdGlvblNlcnZpY2UiLCJJV29ya3NwYWNlU2VydmljZSIsIklEaXNwb3NhYmxlUmVnaXN0cnkiLCJJUGxhdGZvcm1TZXJ2aWNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJ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Q2UscUJBQTNCLENBQUosQ0FIZSxFQUl0QnpCLE9BQU8sQ0FBQyxDQUFELEVBQUlLLFdBQVcsQ0FBQ2tCLE1BQVosQ0FBbUJoQixPQUFPLENBQUNtQixpQkFBM0IsQ0FBSixDQUplLEVBS3RCMUIsT0FBTyxDQUFDLENBQUQsRUFBSUssV0FBVyxDQUFDa0IsTUFBWixDQUFtQlosT0FBTyxDQUFDZ0IsbUJBQTNCLENBQUosQ0FMZSxFQU10QjNCLE9BQU8sQ0FBQyxDQUFELEVBQUlLLFdBQVcsQ0FBQ2tCLE1BQVosQ0FBbUJmLE9BQU8sQ0FBQ29CLGdCQUEzQixDQUFKLENBTmUsQ0FBRCxFQU90QmYsWUFQc0IsQ0FBekI7QUFRQVYsT0FBTyxDQUFDVSxZQUFSLEdBQXVCQSxZQUF2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL3BsYXRmb3JtL3R5cGVzXCIpO1xuY29uc3QgdHlwZXNfMyA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vdGVybWluYWwvdHlwZXNcIik7XG5jb25zdCB0eXBlc180ID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi90eXBlc1wiKTtcbmNvbnN0IHR5cGVzXzUgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL3R5cGVzXCIpO1xuY29uc3QgdGVybWluYWxDb2RlRXhlY3V0aW9uXzEgPSByZXF1aXJlKFwiLi90ZXJtaW5hbENvZGVFeGVjdXRpb25cIik7XG5sZXQgUmVwbFByb3ZpZGVyID0gY2xhc3MgUmVwbFByb3ZpZGVyIGV4dGVuZHMgdGVybWluYWxDb2RlRXhlY3V0aW9uXzEuVGVybWluYWxDb2RlRXhlY3V0aW9uUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKHRlcm1pbmFsU2VydmljZUZhY3RvcnksIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCB3b3Jrc3BhY2UsIGRpc3Bvc2FibGVSZWdpc3RyeSwgcGxhdGZvcm1TZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKHRlcm1pbmFsU2VydmljZUZhY3RvcnksIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCB3b3Jrc3BhY2UsIGRpc3Bvc2FibGVSZWdpc3RyeSwgcGxhdGZvcm1TZXJ2aWNlKTtcbiAgICAgICAgdGhpcy50ZXJtaW5hbFRpdGxlID0gJ1JFUEwnO1xuICAgIH1cbn07XG5SZXBsUHJvdmlkZXIgPSBfX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMy5JVGVybWluYWxTZXJ2aWNlRmFjdG9yeSkpLFxuICAgIF9fcGFyYW0oMSwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzQuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlKSksXG4gICAgX19wYXJhbSgyLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JV29ya3NwYWNlU2VydmljZSkpLFxuICAgIF9fcGFyYW0oMywgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzUuSURpc3Bvc2FibGVSZWdpc3RyeSkpLFxuICAgIF9fcGFyYW0oNCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzIuSVBsYXRmb3JtU2VydmljZSkpXG5dLCBSZXBsUHJvdmlkZXIpO1xuZXhwb3J0cy5SZXBsUHJvdmlkZXIgPSBSZXBsUHJvdmlkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBsLmpzLm1hcCJdfQ==