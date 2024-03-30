// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

const vscode = require("vscode");

const types_1 = require("../common/types");

const proxy = require("./jediProxy");

const providerUtilities_1 = require("./providerUtilities");

class DocumentPosition {
  constructor(document, position) {
    this.document = document;
    this.position = position;
  }

  static fromObject(item) {
    // tslint:disable-next-line:no-any
    return item._documentPosition;
  }

  attachTo(item) {
    // tslint:disable-next-line:no-any
    item._documentPosition = this;
  }

}

class CompletionSource {
  constructor(jediFactory, serviceContainer, itemInfoSource) {
    this.serviceContainer = serviceContainer;
    this.itemInfoSource = itemInfoSource;
    this.jediFactory = jediFactory;
  }

  getVsCodeCompletionItems(document, position, token) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield this.getCompletionResult(document, position, token);

      if (result === undefined) {
        return Promise.resolve([]);
      }

      return this.toVsCodeCompletions(new DocumentPosition(document, position), result, document.uri);
    });
  }

  getDocumentation(completionItem, token) {
    return __awaiter(this, void 0, void 0, function* () {
      const documentPosition = DocumentPosition.fromObject(completionItem);

      if (documentPosition === undefined) {
        return;
      } // Supply hover source with simulated document text where item in question was 'already typed'.


      const document = documentPosition.document;
      const position = documentPosition.position;
      const wordRange = document.getWordRangeAtPosition(position);
      const leadingRange = wordRange !== undefined ? new vscode.Range(new vscode.Position(0, 0), wordRange.start) : new vscode.Range(new vscode.Position(0, 0), position);
      const itemString = completionItem.label;
      const sourceText = `${document.getText(leadingRange)}${itemString}`;
      const range = new vscode.Range(leadingRange.end, leadingRange.end.translate(0, itemString.length));
      return this.itemInfoSource.getItemInfoFromText(document.uri, document.fileName, range, sourceText, token);
    });
  }

  getCompletionResult(document, position, token) {
    return __awaiter(this, void 0, void 0, function* () {
      if (position.character <= 0 || providerUtilities_1.isPositionInsideStringOrComment(document, position)) {
        return undefined;
      }

      const type = proxy.CommandType.Completions;
      const columnIndex = position.character;
      const source = document.getText();
      const cmd = {
        command: type,
        fileName: document.fileName,
        columnIndex: columnIndex,
        lineIndex: position.line,
        source: source
      };
      return this.jediFactory.getJediProxyHandler(document.uri).sendCommand(cmd, token);
    });
  }

  toVsCodeCompletions(documentPosition, data, resource) {
    return data && data.items.length > 0 ? data.items.map(item => this.toVsCodeCompletion(documentPosition, item, resource)) : [];
  }

  toVsCodeCompletion(documentPosition, item, resource) {
    const completionItem = new vscode.CompletionItem(item.text);
    completionItem.kind = item.type;
    const configurationService = this.serviceContainer.get(types_1.IConfigurationService);
    const pythonSettings = configurationService.getSettings(resource);

    if (pythonSettings.autoComplete.addBrackets === true && (item.kind === vscode.SymbolKind.Function || item.kind === vscode.SymbolKind.Method)) {
      completionItem.insertText = new vscode.SnippetString(item.text).appendText('(').appendTabstop().appendText(')');
    } // Ensure the built in members are at the bottom.


    completionItem.sortText = (completionItem.label.startsWith('__') ? 'z' : completionItem.label.startsWith('_') ? 'y' : '__') + completionItem.label;
    documentPosition.attachTo(completionItem);
    return completionItem;
  }

}

exports.CompletionSource = CompletionSource;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBsZXRpb25Tb3VyY2UuanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZzY29kZSIsInJlcXVpcmUiLCJ0eXBlc18xIiwicHJveHkiLCJwcm92aWRlclV0aWxpdGllc18xIiwiRG9jdW1lbnRQb3NpdGlvbiIsImNvbnN0cnVjdG9yIiwiZG9jdW1lbnQiLCJwb3NpdGlvbiIsImZyb21PYmplY3QiLCJpdGVtIiwiX2RvY3VtZW50UG9zaXRpb24iLCJhdHRhY2hUbyIsIkNvbXBsZXRpb25Tb3VyY2UiLCJqZWRpRmFjdG9yeSIsInNlcnZpY2VDb250YWluZXIiLCJpdGVtSW5mb1NvdXJjZSIsImdldFZzQ29kZUNvbXBsZXRpb25JdGVtcyIsInRva2VuIiwiZ2V0Q29tcGxldGlvblJlc3VsdCIsInVuZGVmaW5lZCIsInRvVnNDb2RlQ29tcGxldGlvbnMiLCJ1cmkiLCJnZXREb2N1bWVudGF0aW9uIiwiY29tcGxldGlvbkl0ZW0iLCJkb2N1bWVudFBvc2l0aW9uIiwid29yZFJhbmdlIiwiZ2V0V29yZFJhbmdlQXRQb3NpdGlvbiIsImxlYWRpbmdSYW5nZSIsIlJhbmdlIiwiUG9zaXRpb24iLCJzdGFydCIsIml0ZW1TdHJpbmciLCJsYWJlbCIsInNvdXJjZVRleHQiLCJnZXRUZXh0IiwicmFuZ2UiLCJlbmQiLCJ0cmFuc2xhdGUiLCJsZW5ndGgiLCJnZXRJdGVtSW5mb0Zyb21UZXh0IiwiZmlsZU5hbWUiLCJjaGFyYWN0ZXIiLCJpc1Bvc2l0aW9uSW5zaWRlU3RyaW5nT3JDb21tZW50IiwidHlwZSIsIkNvbW1hbmRUeXBlIiwiQ29tcGxldGlvbnMiLCJjb2x1bW5JbmRleCIsInNvdXJjZSIsImNtZCIsImNvbW1hbmQiLCJsaW5lSW5kZXgiLCJsaW5lIiwiZ2V0SmVkaVByb3h5SGFuZGxlciIsInNlbmRDb21tYW5kIiwiZGF0YSIsInJlc291cmNlIiwiaXRlbXMiLCJtYXAiLCJ0b1ZzQ29kZUNvbXBsZXRpb24iLCJDb21wbGV0aW9uSXRlbSIsInRleHQiLCJraW5kIiwiY29uZmlndXJhdGlvblNlcnZpY2UiLCJnZXQiLCJJQ29uZmlndXJhdGlvblNlcnZpY2UiLCJweXRob25TZXR0aW5ncyIsImdldFNldHRpbmdzIiwiYXV0b0NvbXBsZXRlIiwiYWRkQnJhY2tldHMiLCJTeW1ib2xLaW5kIiwiRnVuY3Rpb24iLCJNZXRob2QiLCJpbnNlcnRUZXh0IiwiU25pcHBldFN0cmluZyIsImFwcGVuZFRleHQiLCJhcHBlbmRUYWJzdG9wIiwic29ydFRleHQiLCJzdGFydHNXaXRoIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsU0FBUyxHQUFJLFVBQVEsU0FBS0EsU0FBZCxJQUE0QixVQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsQ0FBL0IsRUFBa0NDLFNBQWxDLEVBQTZDO0FBQ3JGLFNBQU8sS0FBS0QsQ0FBQyxLQUFLQSxDQUFDLEdBQUdFLE9BQVQsQ0FBTixFQUF5QixVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN2RCxhQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFFLFVBQUk7QUFBRUMsUUFBQUEsSUFBSSxDQUFDTixTQUFTLENBQUNPLElBQVYsQ0FBZUYsS0FBZixDQUFELENBQUo7QUFBOEIsT0FBcEMsQ0FBcUMsT0FBT0csQ0FBUCxFQUFVO0FBQUVMLFFBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxDQUFOO0FBQVk7QUFBRTs7QUFDM0YsYUFBU0MsUUFBVCxDQUFrQkosS0FBbEIsRUFBeUI7QUFBRSxVQUFJO0FBQUVDLFFBQUFBLElBQUksQ0FBQ04sU0FBUyxDQUFDLE9BQUQsQ0FB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QTBCLENBQUNyRCxjQUFjLENBQUNTLEtBQWYsQ0FBcUI2QyxVQUFyQixDQUFnQyxJQUFoQyxJQUF3QyxHQUF4QyxHQUErQ3RELGNBQWMsQ0FBQ1MsS0FBZixDQUFxQjZDLFVBQXJCLENBQWdDLEdBQWhDLElBQXVDLEdBQXZDLEdBQTZDLElBQTdGLElBQXNHdEQsY0FBYyxDQUFDUyxLQUEvSTtBQUNBUixJQUFBQSxnQkFBZ0IsQ0FBQ2IsUUFBakIsQ0FBMEJZLGNBQTFCO0FBQ0EsV0FBT0EsY0FBUDtBQUNIOztBQXJFa0I7O0FBdUV2QnpCLE9BQU8sQ0FBQ2MsZ0JBQVIsR0FBMkJBLGdCQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2c2NvZGUgPSByZXF1aXJlKFwidnNjb2RlXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdHlwZXNcIik7XG5jb25zdCBwcm94eSA9IHJlcXVpcmUoXCIuL2plZGlQcm94eVwiKTtcbmNvbnN0IHByb3ZpZGVyVXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi9wcm92aWRlclV0aWxpdGllc1wiKTtcbmNsYXNzIERvY3VtZW50UG9zaXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50LCBwb3NpdGlvbikge1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9XG4gICAgc3RhdGljIGZyb21PYmplY3QoaXRlbSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgIHJldHVybiBpdGVtLl9kb2N1bWVudFBvc2l0aW9uO1xuICAgIH1cbiAgICBhdHRhY2hUbyhpdGVtKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgaXRlbS5fZG9jdW1lbnRQb3NpdGlvbiA9IHRoaXM7XG4gICAgfVxufVxuY2xhc3MgQ29tcGxldGlvblNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoamVkaUZhY3RvcnksIHNlcnZpY2VDb250YWluZXIsIGl0ZW1JbmZvU291cmNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XG4gICAgICAgIHRoaXMuaXRlbUluZm9Tb3VyY2UgPSBpdGVtSW5mb1NvdXJjZTtcbiAgICAgICAgdGhpcy5qZWRpRmFjdG9yeSA9IGplZGlGYWN0b3J5O1xuICAgIH1cbiAgICBnZXRWc0NvZGVDb21wbGV0aW9uSXRlbXMoZG9jdW1lbnQsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgdGhpcy5nZXRDb21wbGV0aW9uUmVzdWx0KGRvY3VtZW50LCBwb3NpdGlvbiwgdG9rZW4pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b1ZzQ29kZUNvbXBsZXRpb25zKG5ldyBEb2N1bWVudFBvc2l0aW9uKGRvY3VtZW50LCBwb3NpdGlvbiksIHJlc3VsdCwgZG9jdW1lbnQudXJpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldERvY3VtZW50YXRpb24oY29tcGxldGlvbkl0ZW0sIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFBvc2l0aW9uID0gRG9jdW1lbnRQb3NpdGlvbi5mcm9tT2JqZWN0KGNvbXBsZXRpb25JdGVtKTtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdXBwbHkgaG92ZXIgc291cmNlIHdpdGggc2ltdWxhdGVkIGRvY3VtZW50IHRleHQgd2hlcmUgaXRlbSBpbiBxdWVzdGlvbiB3YXMgJ2FscmVhZHkgdHlwZWQnLlxuICAgICAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBkb2N1bWVudFBvc2l0aW9uLmRvY3VtZW50O1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBkb2N1bWVudFBvc2l0aW9uLnBvc2l0aW9uO1xuICAgICAgICAgICAgY29uc3Qgd29yZFJhbmdlID0gZG9jdW1lbnQuZ2V0V29yZFJhbmdlQXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCBsZWFkaW5nUmFuZ2UgPSB3b3JkUmFuZ2UgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gbmV3IHZzY29kZS5SYW5nZShuZXcgdnNjb2RlLlBvc2l0aW9uKDAsIDApLCB3b3JkUmFuZ2Uuc3RhcnQpXG4gICAgICAgICAgICAgICAgOiBuZXcgdnNjb2RlLlJhbmdlKG5ldyB2c2NvZGUuUG9zaXRpb24oMCwgMCksIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1TdHJpbmcgPSBjb21wbGV0aW9uSXRlbS5sYWJlbDtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZVRleHQgPSBgJHtkb2N1bWVudC5nZXRUZXh0KGxlYWRpbmdSYW5nZSl9JHtpdGVtU3RyaW5nfWA7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IG5ldyB2c2NvZGUuUmFuZ2UobGVhZGluZ1JhbmdlLmVuZCwgbGVhZGluZ1JhbmdlLmVuZC50cmFuc2xhdGUoMCwgaXRlbVN0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1JbmZvU291cmNlLmdldEl0ZW1JbmZvRnJvbVRleHQoZG9jdW1lbnQudXJpLCBkb2N1bWVudC5maWxlTmFtZSwgcmFuZ2UsIHNvdXJjZVRleHQsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldENvbXBsZXRpb25SZXN1bHQoZG9jdW1lbnQsIHBvc2l0aW9uLCB0b2tlbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uLmNoYXJhY3RlciA8PSAwIHx8XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJVdGlsaXRpZXNfMS5pc1Bvc2l0aW9uSW5zaWRlU3RyaW5nT3JDb21tZW50KGRvY3VtZW50LCBwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHByb3h5LkNvbW1hbmRUeXBlLkNvbXBsZXRpb25zO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBwb3NpdGlvbi5jaGFyYWN0ZXI7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRUZXh0KCk7XG4gICAgICAgICAgICBjb25zdCBjbWQgPSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZDogdHlwZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZG9jdW1lbnQuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGxpbmVJbmRleDogcG9zaXRpb24ubGluZSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmplZGlGYWN0b3J5LmdldEplZGlQcm94eUhhbmRsZXIoZG9jdW1lbnQudXJpKS5zZW5kQ29tbWFuZChjbWQsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvVnNDb2RlQ29tcGxldGlvbnMoZG9jdW1lbnRQb3NpdGlvbiwgZGF0YSwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgZGF0YS5pdGVtcy5sZW5ndGggPiAwID8gZGF0YS5pdGVtcy5tYXAoaXRlbSA9PiB0aGlzLnRvVnNDb2RlQ29tcGxldGlvbihkb2N1bWVudFBvc2l0aW9uLCBpdGVtLCByZXNvdXJjZSkpIDogW107XG4gICAgfVxuICAgIHRvVnNDb2RlQ29tcGxldGlvbihkb2N1bWVudFBvc2l0aW9uLCBpdGVtLCByZXNvdXJjZSkge1xuICAgICAgICBjb25zdCBjb21wbGV0aW9uSXRlbSA9IG5ldyB2c2NvZGUuQ29tcGxldGlvbkl0ZW0oaXRlbS50ZXh0KTtcbiAgICAgICAgY29tcGxldGlvbkl0ZW0ua2luZCA9IGl0ZW0udHlwZTtcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvblNlcnZpY2UgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlKTtcbiAgICAgICAgY29uc3QgcHl0aG9uU2V0dGluZ3MgPSBjb25maWd1cmF0aW9uU2VydmljZS5nZXRTZXR0aW5ncyhyZXNvdXJjZSk7XG4gICAgICAgIGlmIChweXRob25TZXR0aW5ncy5hdXRvQ29tcGxldGUuYWRkQnJhY2tldHMgPT09IHRydWUgJiZcbiAgICAgICAgICAgIChpdGVtLmtpbmQgPT09IHZzY29kZS5TeW1ib2xLaW5kLkZ1bmN0aW9uIHx8IGl0ZW0ua2luZCA9PT0gdnNjb2RlLlN5bWJvbEtpbmQuTWV0aG9kKSkge1xuICAgICAgICAgICAgY29tcGxldGlvbkl0ZW0uaW5zZXJ0VGV4dCA9IG5ldyB2c2NvZGUuU25pcHBldFN0cmluZyhpdGVtLnRleHQpLmFwcGVuZFRleHQoJygnKS5hcHBlbmRUYWJzdG9wKCkuYXBwZW5kVGV4dCgnKScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSB0aGUgYnVpbHQgaW4gbWVtYmVycyBhcmUgYXQgdGhlIGJvdHRvbS5cbiAgICAgICAgY29tcGxldGlvbkl0ZW0uc29ydFRleHQgPSAoY29tcGxldGlvbkl0ZW0ubGFiZWwuc3RhcnRzV2l0aCgnX18nKSA/ICd6JyA6IChjb21wbGV0aW9uSXRlbS5sYWJlbC5zdGFydHNXaXRoKCdfJykgPyAneScgOiAnX18nKSkgKyBjb21wbGV0aW9uSXRlbS5sYWJlbDtcbiAgICAgICAgZG9jdW1lbnRQb3NpdGlvbi5hdHRhY2hUbyhjb21wbGV0aW9uSXRlbSk7XG4gICAgICAgIHJldHVybiBjb21wbGV0aW9uSXRlbTtcbiAgICB9XG59XG5leHBvcnRzLkNvbXBsZXRpb25Tb3VyY2UgPSBDb21wbGV0aW9uU291cmNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcGxldGlvblNvdXJjZS5qcy5tYXAiXX0=