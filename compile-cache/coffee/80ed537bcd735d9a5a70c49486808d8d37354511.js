(function() {
  var _, exec, link, mergeObject, mutateSelectedText, shell, url;

  url = require('url');

  shell = require('electron').shell;

  _ = require('underscore-plus');

  link = require('link');

  exec = require('child_process').exec;

  global.activeEditor = function() {
    return atom.workspace.getActiveTextEditor();
  };

  global.exec = exec;

  mergeObject = function(obj, source) {
    var key, value;
    if (obj == null) {
      obj = {};
    }
    if (source == null) {
      source = {};
    }
    if (source && Object.getOwnPropertyNames(source).length > 0) {
      for (key in source) {
        value = source[key];
        obj[key] = value;
      }
    }
    return obj;
  };

  mutateSelectedText = function(selections, options) {
    var i, insertText, len, results, selectedText, selection;
    if (options == null) {
      options = {};
    }
    options = mergeObject({
      select: true,
      skip: false,
      undo: ''
    }, options);
    results = [];
    for (i = 0, len = selections.length; i < len; i++) {
      selection = selections[i];
      insertText = "/*{{replacement}}*/";
      selectedText = selection.getText();
      insertText = insertText.replace("{{replacement}}", "" + selectedText);
      selection.retainSelection = true;
      selection.plantTail();
      selection.insertText(insertText, options);
      results.push(selection.retainSelection = false);
    }
    return results;
  };

  atom.workspace.observeActiveTextEditor(function() {
    var editor;
    return editor = activeEditor();
  });

  atom.commands.add("atom-text-editor", "nerd:wrap-inline-comment", function() {
    var editor, options, selections;
    options = {
      select: true,
      undo: 'skip',
      skip: true
    };
    editor = atom.workspace.getActiveTextEditor();
    selections = editor.getSelections();
    if (selections && selections.length > 0) {
      return mutateSelectedText(selections, options);
    }
  });

  atom.commands.add('atom-text-editor', 'nerd:bio-link', function() {
    var clipboardText, editor, selectedText, snippets, snippetsService;
    editor = atom.workspace.getActiveTextEditor();
    clipboardText = '';
    selectedText = '';
    if (editor.getSelectedText()) {
      selectedText = editor.getSelectedText();
    }
    if (atom.clipboard.read()) {
      clipboardText = atom.clipboard.read();
    }
    if (!selectedText || !clipboardText) {
      return;
    }
    snippets = atom.packages.getActivePackage('snippets');
    if (snippets) {
      snippetsService = snippets.mainModule;
      return snippetsService.insert("<a href=\"" + clipboardText + "\"${1: ${2:title=\"${3:" + selectedText + "}\"}}>${4:" + selectedText + "}</a>$0");
    }
  });

  atom.commands.add('atom-text-editor', 'nerd:link-open', function() {
    var editor, protocol, selectedText;
    editor = atom.workspace.getActiveTextEditor();
    selectedText = editor.getSelectedText();
    if (selectedText) {
      protocol = url.parse(selectedText).protocol;
      if (protocol === 'http:' || protocol === 'https:') {
        return shell.openExternal(selectedText);
      } else {
        return shell.openExternal("http://" + selectedText);
      }
    } else {
      return link.openLink();
    }
  });

  atom.commands.add('atom-text-editor', 'nerd:select-outside-bracket', function() {
    var editor;
    editor = atom.workspace.getActiveTextEditor();
    atom.commands.dispatch(atom.views.getView(editor), "bracket-matcher:select-inside-brackets");
    atom.commands.dispatch(atom.views.getView(editor), "core:move-right");
    return atom.commands.dispatch(atom.views.getView(editor), "bracket-matcher:select-inside-brackets");
  });

  atom.commands.add('atom-text-editor', 'nerd:reveal-in-finder', function() {
    var editor, filepath, treeView, treeViewService;
    editor = atom.workspace.getActiveTextEditor();
    filepath = editor.getPath();
    if (filepath) {
      treeView = atom.packages.getActivePackage("tree-view");
      if (treeView) {
        treeViewService = treeView.mainModule;
        return treeViewService.treeView.showCurrentFileInFileManager();
      }
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSOztFQUNMLFFBQVMsT0FBQSxDQUFRLFVBQVI7O0VBQ1YsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUjs7RUFDSixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ04sT0FBUSxPQUFBLENBQVEsZUFBUjs7RUFJVCxNQUFNLENBQUMsWUFBUCxHQUFzQixTQUFBO0FBQ3BCLFdBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0VBRGE7O0VBR3RCLE1BQU0sQ0FBQyxJQUFQLEdBQWM7O0VBZ0JkLFdBQUEsR0FBYyxTQUFDLEdBQUQsRUFBVyxNQUFYO0FBQ1osUUFBQTs7TUFEYSxNQUFNOzs7TUFBSSxTQUFTOztJQUNoQyxJQUFHLE1BQUEsSUFBVSxNQUFNLENBQUMsbUJBQVAsQ0FBMkIsTUFBM0IsQ0FBa0MsQ0FBQyxNQUFuQyxHQUE0QyxDQUF6RDtBQUNFLFdBQUEsYUFBQTs7UUFDRSxHQUFJLENBQUEsR0FBQSxDQUFKLEdBQVc7QUFEYixPQURGOztBQUlBLFdBQU87RUFMSzs7RUFRZCxrQkFBQSxHQUFxQixTQUFDLFVBQUQsRUFBYSxPQUFiO0FBQ25CLFFBQUE7O01BRGdDLFVBQVU7O0lBQzFDLE9BQUEsR0FBVSxXQUFBLENBQVk7TUFDcEIsTUFBQSxFQUFRLElBRFk7TUFFcEIsSUFBQSxFQUFNLEtBRmM7TUFHcEIsSUFBQSxFQUFNLEVBSGM7S0FBWixFQUlQLE9BSk87QUFNVjtTQUFBLDRDQUFBOztNQUNFLFVBQUEsR0FBYTtNQUNiLFlBQUEsR0FBZSxTQUFTLENBQUMsT0FBVixDQUFBO01BQ2YsVUFBQSxHQUFhLFVBQVUsQ0FBQyxPQUFYLENBQW1CLGlCQUFuQixFQUFzQyxFQUFBLEdBQUcsWUFBekM7TUFFYixTQUFTLENBQUMsZUFBVixHQUE0QjtNQUM1QixTQUFTLENBQUMsU0FBVixDQUFBO01BQ0EsU0FBUyxDQUFDLFVBQVYsQ0FBcUIsVUFBckIsRUFBaUMsT0FBakM7bUJBQ0EsU0FBUyxDQUFDLGVBQVYsR0FBNEI7QUFSOUI7O0VBUG1COztFQXFCckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBZixDQUF1QyxTQUFBO0FBQ3JDLFFBQUE7V0FBQSxNQUFBLEdBQVMsWUFBQSxDQUFBO0VBRDRCLENBQXZDOztFQUtBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsMEJBQXRDLEVBQWtFLFNBQUE7QUFHaEUsUUFBQTtJQUFBLE9BQUEsR0FBVTtNQUNSLE1BQUEsRUFBUSxJQURBO01BRVIsSUFBQSxFQUFNLE1BRkU7TUFHUixJQUFBLEVBQU0sSUFIRTs7SUFLVixNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0lBQ1QsVUFBQSxHQUFhLE1BQU0sQ0FBQyxhQUFQLENBQUE7SUFFYixJQUFHLFVBQUEsSUFBYyxVQUFVLENBQUMsTUFBWCxHQUFvQixDQUFyQzthQUNFLGtCQUFBLENBQW1CLFVBQW5CLEVBQStCLE9BQS9CLEVBREY7O0VBWGdFLENBQWxFOztFQWdCQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDLGVBQXRDLEVBQXVELFNBQUE7QUFDckQsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7SUFDVCxhQUFBLEdBQWdCO0lBQ2hCLFlBQUEsR0FBZTtJQUNmLElBQUcsTUFBTSxDQUFDLGVBQVAsQ0FBQSxDQUFIO01BQ0UsWUFBQSxHQUFlLE1BQU0sQ0FBQyxlQUFQLENBQUEsRUFEakI7O0lBR0EsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBQSxDQUFIO01BQ0UsYUFBQSxHQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBQSxFQURsQjs7SUFHQSxJQUFHLENBQUMsWUFBRCxJQUFpQixDQUFDLGFBQXJCO0FBQ0UsYUFERjs7SUFHQSxRQUFBLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixVQUEvQjtJQUNYLElBQUksUUFBSjtNQUNFLGVBQUEsR0FBa0IsUUFBUSxDQUFDO2FBQzNCLGVBQWUsQ0FBQyxNQUFoQixDQUF1QixZQUFBLEdBQWEsYUFBYixHQUEyQix5QkFBM0IsR0FBb0QsWUFBcEQsR0FBaUUsWUFBakUsR0FBNkUsWUFBN0UsR0FBMEYsU0FBakgsRUFGRjs7RUFkcUQsQ0FBdkQ7O0VBcUJBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsZ0JBQXRDLEVBQXdELFNBQUE7QUFDdEQsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7SUFDVCxZQUFBLEdBQWUsTUFBTSxDQUFDLGVBQVAsQ0FBQTtJQUNmLElBQUcsWUFBSDtNQUNHLFdBQVksR0FBRyxDQUFDLEtBQUosQ0FBVSxZQUFWO01BQ2IsSUFBRyxRQUFBLEtBQVksT0FBWixJQUF1QixRQUFBLEtBQVksUUFBdEM7ZUFDRSxLQUFLLENBQUMsWUFBTixDQUFtQixZQUFuQixFQURGO09BQUEsTUFBQTtlQUdFLEtBQUssQ0FBQyxZQUFOLENBQW1CLFNBQUEsR0FBVSxZQUE3QixFQUhGO09BRkY7S0FBQSxNQUFBO2FBT0UsSUFBSSxDQUFDLFFBQUwsQ0FBQSxFQVBGOztFQUhzRCxDQUF4RDs7RUFjQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDLDZCQUF0QyxFQUFxRSxTQUFBO0FBQ25FLFFBQUE7SUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixDQUF2QixFQUFtRCx3Q0FBbkQ7SUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLE1BQW5CLENBQXZCLEVBQW1ELGlCQUFuRDtXQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBdkIsRUFBbUQsd0NBQW5EO0VBSm1FLENBQXJFOztFQVFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsdUJBQXRDLEVBQStELFNBQUE7QUFDN0QsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7SUFDVCxRQUFBLEdBQVcsTUFBTSxDQUFDLE9BQVAsQ0FBQTtJQUNYLElBQUcsUUFBSDtNQUNFLFFBQUEsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFkLENBQStCLFdBQS9CO01BQ1gsSUFBRyxRQUFIO1FBQ0UsZUFBQSxHQUFrQixRQUFRLENBQUM7ZUFDM0IsZUFBZSxDQUFDLFFBQVEsQ0FBQyw0QkFBekIsQ0FBQSxFQUZGO09BRkY7O0VBSDZELENBQS9EO0FBeEhBIiwic291cmNlc0NvbnRlbnQiOlsidXJsID0gcmVxdWlyZSgndXJsJylcbntzaGVsbH0gPSByZXF1aXJlKCdlbGVjdHJvbicpXG5fID0gcmVxdWlyZSgndW5kZXJzY29yZS1wbHVzJylcbmxpbmsgPSByZXF1aXJlICdsaW5rJ1xue2V4ZWN9ID0gcmVxdWlyZSAnY2hpbGRfcHJvY2VzcydcbiMgbGluayA9IHJlcXVpcmUgJy4vcGFja2FnZXMvbGluay9saWIvbGluay5qcydcblxuXG5nbG9iYWwuYWN0aXZlRWRpdG9yID0gKCkgLT5cbiAgcmV0dXJuIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuXG5nbG9iYWwuZXhlYyA9IGV4ZWNcblxuXG4jIGFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuIyAgIGV2ZW50LnJlc3BvbmRXaXRoKGhhbmRsZVJlcXVlc3QoZXZlbnQucmVxdWVzdCkpXG4jIH0pXG4jXG4jICMgUmVzcG9uZCB0byB0aGUgcmVxdWVzdFxuIyAjIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdFxuIyBhc3luYyBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KHJlcXVlc3QpIHtcbiMgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdoZWxsbyB3b3JsZCcsIHtcbiMgICAgIHN0YXR1czogMjAwLFxuIyAgIH0pXG4jIH1cblxuXG5tZXJnZU9iamVjdCA9IChvYmogPSB7fSwgc291cmNlID0ge30pIC0+XG4gIGlmIHNvdXJjZSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2UpLmxlbmd0aCA+IDBcbiAgICBmb3Iga2V5LCB2YWx1ZSBvZiBzb3VyY2VcbiAgICAgIG9ialtrZXldID0gdmFsdWVcblxuICByZXR1cm4gb2JqXG5cblxubXV0YXRlU2VsZWN0ZWRUZXh0ID0gKHNlbGVjdGlvbnMsIG9wdGlvbnMgPSB7fSkgLT5cbiAgb3B0aW9ucyA9IG1lcmdlT2JqZWN0KHtcbiAgICBzZWxlY3Q6IHRydWUsXG4gICAgc2tpcDogZmFsc2UsXG4gICAgdW5kbzogJycsXG4gIH0sIG9wdGlvbnMpXG5cbiAgZm9yIHNlbGVjdGlvbiBpbiBzZWxlY3Rpb25zXG4gICAgaW5zZXJ0VGV4dCA9IFwiLyp7e3JlcGxhY2VtZW50fX0qL1wiXG4gICAgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0aW9uLmdldFRleHQoKVxuICAgIGluc2VydFRleHQgPSBpbnNlcnRUZXh0LnJlcGxhY2UoXCJ7e3JlcGxhY2VtZW50fX1cIiwgXCIje3NlbGVjdGVkVGV4dH1cIilcblxuICAgIHNlbGVjdGlvbi5yZXRhaW5TZWxlY3Rpb24gPSB0cnVlXG4gICAgc2VsZWN0aW9uLnBsYW50VGFpbCgpXG4gICAgc2VsZWN0aW9uLmluc2VydFRleHQoaW5zZXJ0VGV4dCwgb3B0aW9ucylcbiAgICBzZWxlY3Rpb24ucmV0YWluU2VsZWN0aW9uID0gZmFsc2VcblxuXG4jIyBDdXN0b20gQ29tbWFuZHNcblxuI1xuYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZUFjdGl2ZVRleHRFZGl0b3IgLT5cbiAgZWRpdG9yID0gYWN0aXZlRWRpdG9yKClcblxuXG4jIENvbW1lbnQgd3JhcCB3aXRoIC8qIC4uLiAqL1xuYXRvbS5jb21tYW5kcy5hZGQgXCJhdG9tLXRleHQtZWRpdG9yXCIsIFwibmVyZDp3cmFwLWlubGluZS1jb21tZW50XCIsIC0+XG4gICMgZWRpdG9yLmF1dG9JbmRlbnRTZWxlY3RlZFJvd3MoKVxuXG4gIG9wdGlvbnMgPSB7XG4gICAgc2VsZWN0OiB0cnVlLFxuICAgIHVuZG86ICdza2lwJyxcbiAgICBza2lwOiB0cnVlLFxuICB9XG4gIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBzZWxlY3Rpb25zID0gZWRpdG9yLmdldFNlbGVjdGlvbnMoKVxuICAjIGNvbnNvbGUubG9nIHNlbGVjdGlvbnNcbiAgaWYgc2VsZWN0aW9ucyAmJiBzZWxlY3Rpb25zLmxlbmd0aCA+IDBcbiAgICBtdXRhdGVTZWxlY3RlZFRleHQoc2VsZWN0aW9ucywgb3B0aW9ucylcblxuXG4jXG5hdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS10ZXh0LWVkaXRvcicsICduZXJkOmJpby1saW5rJywgLT5cbiAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gIGNsaXBib2FyZFRleHQgPSAnJ1xuICBzZWxlY3RlZFRleHQgPSAnJ1xuICBpZiBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcbiAgICBzZWxlY3RlZFRleHQgPSBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcblxuICBpZiBhdG9tLmNsaXBib2FyZC5yZWFkKClcbiAgICBjbGlwYm9hcmRUZXh0ID0gYXRvbS5jbGlwYm9hcmQucmVhZCgpXG5cbiAgaWYgIXNlbGVjdGVkVGV4dCB8fCAhY2xpcGJvYXJkVGV4dFxuICAgIHJldHVyblxuXG4gIHNuaXBwZXRzID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdzbmlwcGV0cycpXG4gIGlmIChzbmlwcGV0cylcbiAgICBzbmlwcGV0c1NlcnZpY2UgPSBzbmlwcGV0cy5tYWluTW9kdWxlXG4gICAgc25pcHBldHNTZXJ2aWNlLmluc2VydCBcIjxhIGhyZWY9XFxcIiN7Y2xpcGJvYXJkVGV4dH1cXFwiJHsxOiAkezI6dGl0bGU9XFxcIiR7Mzoje3NlbGVjdGVkVGV4dH19XFxcIn19PiR7NDoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcbiAgIyBhdG9tLnBhY2thZ2VzLmFjdGl2ZVBhY2thZ2VzLnNuaXBwZXRzPy5tYWluTW9kdWxlPy5pbnNlcnQgXCI8YSBocmVmPVxcXCIje2NsaXBib2FyZFRleHR9XFxcIiB0aXRsZT1cXFwiJHsxOiN7c2VsZWN0ZWRUZXh0fX1cXFwiPiR7Mjoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcblxuXG4jIE9wZW4gbGlua1xuYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20tdGV4dC1lZGl0b3InLCAnbmVyZDpsaW5rLW9wZW4nLCAtPlxuICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFNlbGVjdGVkVGV4dCgpXG4gIGlmIHNlbGVjdGVkVGV4dFxuICAgIHtwcm90b2NvbH0gPSB1cmwucGFyc2Uoc2VsZWN0ZWRUZXh0KVxuICAgIGlmIHByb3RvY29sID09ICdodHRwOicgfHwgcHJvdG9jb2wgPT0gJ2h0dHBzOidcbiAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbChzZWxlY3RlZFRleHQpXG4gICAgZWxzZVxuICAgICAgc2hlbGwub3BlbkV4dGVybmFsKFwiaHR0cDovLyN7c2VsZWN0ZWRUZXh0fVwiKVxuICBlbHNlXG4gICAgbGluay5vcGVuTGluaygpXG5cblxuIyBzc3NcbmF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ25lcmQ6c2VsZWN0LW91dHNpZGUtYnJhY2tldCcsIC0+XG4gIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpLCBcImJyYWNrZXQtbWF0Y2hlcjpzZWxlY3QtaW5zaWRlLWJyYWNrZXRzXCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiY29yZTptb3ZlLXJpZ2h0XCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiYnJhY2tldC1tYXRjaGVyOnNlbGVjdC1pbnNpZGUtYnJhY2tldHNcIilcblxuXG4jIFJldmVhbCBhY3RpdmUgZmlsZSBpbiBGaW5kZXJcbmF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ25lcmQ6cmV2ZWFsLWluLWZpbmRlcicsIC0+XG4gIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBmaWxlcGF0aCA9IGVkaXRvci5nZXRQYXRoKClcbiAgaWYgZmlsZXBhdGhcbiAgICB0cmVlVmlldyA9IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShcInRyZWUtdmlld1wiKVxuICAgIGlmIHRyZWVWaWV3XG4gICAgICB0cmVlVmlld1NlcnZpY2UgPSB0cmVlVmlldy5tYWluTW9kdWxlXG4gICAgICB0cmVlVmlld1NlcnZpY2UudHJlZVZpZXcuc2hvd0N1cnJlbnRGaWxlSW5GaWxlTWFuYWdlcigpXG5cbiAgICAjIGV4ZWMgXCJscyBcXFwiI3tmaWxlcGF0aH1cXFwiIDI+L2Rldi9udWxsXCIsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+XG4gICAgIyAgIGlmIGVycm9yXG4gICAgIyAgICAgZXJyb3IgPSBlcnJvci50b1N0cmluZygpLnJlcGxhY2UoXCJFcnJvcjogXCIsIFwiXCIpXG4gICAgIyAgICAgY29uc29sZS5lcnJvciBcImV4ZWMgZXJyb3I6ICN7ZXJyb3J9XCJcbiAgICAjICAgZWxzZVxuICAgICMgICAgIHRyZWVWaWV3ID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFwidHJlZS12aWV3XCIpXG4gICAgIyAgICAgaWYgdHJlZVZpZXdcbiAgICAjICAgICAgIHRyZWVWaWV3U2VydmljZSA9IHRyZWVWaWV3Lm1haW5Nb2R1bGVcbiAgICAjICAgICAgIHRyZWVWaWV3U2VydmljZS50cmVlVmlldy5zaG93Q3VycmVudEZpbGVJbkZpbGVNYW5hZ2VyKClcblxuXG4jIEluIGluaXQuY29mZmVlXG4jIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4jICAgY29uc3QgZ2l0UGx1cyA9IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnZ2l0LXBsdXMnKVxuIyAgIGlmIChnaXRQbHVzKSB7XG4jICAgICBjb25zdCBncCA9IGdpdFBsdXMubWFpbk1vZHVsZS5wcm92aWRlU2VydmljZSgpXG4jICAgICAvLyBjb21tYW5kcyBnbyBoZXJlLCBzZWUgYmVsb3dcbiMgICB9XG4jIH0pXG5cbiMgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlSW5pdGlhbFBhY2thZ2VzICgpIC0+XG4jIGlmIGdpdFBsdXMgPSBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ2dpdC1wbHVzJyk/Lm1haW5Nb2R1bGUucHJvdmlkZVNlcnZpY2UoKVxuIyAgIGdpdFBsdXMucmVnaXN0ZXJDb21tYW5kICdhdG9tLXRleHQtZWRpdG9yJywgJ2N1c3RvbS1naXQtY29tbWFuZHM6dW5kby1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgLnRoZW4gKHJlcG8pIC0+IGdpdFBsdXMucnVuIHJlcG8sICdyZXNldCBIRUFEfjEnXG4jXG4jICAgICBnaXRQbHVzLnJlZ2lzdGVyQ29tbWFuZCAnYXRvbS10ZXh0LWVkaXRvcicsICdha29ud2k6dW5zdGFnZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAncmVzZXQgSEVBRH4xJ1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVwZGF0ZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAnY29tbWl0IC0tYWxsIC0tYW1lbmQgLS1uby1lZGl0J1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVzZS10aGUtZm9yY2UnLCAtPlxuIyAgICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgICAudGhlbiAocmVwbykgLT4gZ2l0UGx1cy5ydW4gcmVwbywgJ3B1c2ggLS1mb3JjZS13aXRoLWxlYXNlJ1xuXG5cblxuIyB3cmFwQmxvY2sgPSAoKSAtPlxuIyAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuIyAgIHJhbmdlc1RvV3JhcCA9IGVkaXRvci5nZXRTZWxlY3RlZEJ1ZmZlclJhbmdlcygpLmZpbHRlcigocikgLT4gIXIuaXNFbXB0eSgpKVxuIyAgIGlmIHJhbmdlc1RvV3JhcC5sZW5ndGhcbiMgICAgIHJhbmdlc1RvV3JhcC5zb3J0KChhLCBiKSAtPlxuIyAgICAgICByZXR1cm4gaWYgYS5zdGFydC5yb3cgPiBiLnN0YXJ0LnJvdyB0aGVuIC0xIGVsc2UgMVxuIyAgICAgKS5mb3JFYWNoKChyYW5nZSkgLT5cbiMgICAgICAgdGV4dCA9IGVkaXRvci5nZXRUZXh0SW5CdWZmZXJSYW5nZShyYW5nZSlcbiMgICAgICAgaWYgKC9eXFxzKlxce1xccyovLnRlc3QodGV4dCkgJiYgL1xccypcXH1cXHMqLy50ZXN0KHRleHQpKVxuIyAgICAgICAgICMgdW53cmFwIGVhY2ggc2VsZWN0aW9uIGZyb20gaXRzIGJsb2NrXG4jICAgICAgICAgZWRpdG9yLnNldFRleHRJbkJ1ZmZlclJhbmdlKHJhbmdlLCB0ZXh0LnJlcGxhY2UoL1xce1xccyovLCAnJykucmVwbGFjZSgvXFxzKlxcfS8sICcnKSlcbiMgICAgICAgZWxzZVxuIyAgICAgICAgICMgd3JhcCBlYWNoIHNlbGVjdGlvbiBpbiBhIGJsb2NrXG4jICAgICAgICAgZWRpdG9yLnNldFRleHRJbkJ1ZmZlclJhbmdlKHJhbmdlLCAne1xcbicgKyB0ZXh0ICsgJ1xcbn0nKVxuIyAgICAgKVxuIyAgICAgZWRpdG9yLmF1dG9JbmRlbnRTZWxlY3RlZFJvd3MoKVxuIyAgIGVsc2VcbiMgICAgICMgY3JlYXRlIGFuIGVtcHR5IGJsb2NrIGF0IGVhY2ggY3Vyc29yXG4jICAgICBlZGl0b3IuaW5zZXJ0VGV4dCgne1xcblxcbn0nKVxuIyAgICAgZWRpdG9yLnNlbGVjdFVwKDIpXG4jICAgICBlZGl0b3IuYXV0b0luZGVudFNlbGVjdGVkUm93cygpXG4jICAgICBlZGl0b3IubW92ZVJpZ2h0KClcbiMgICAgIGVkaXRvci5tb3ZlVXAoKVxuIyAgICAgZWRpdG9yLm1vdmVUb0VuZE9mTGluZSgpXG4iXX0=
