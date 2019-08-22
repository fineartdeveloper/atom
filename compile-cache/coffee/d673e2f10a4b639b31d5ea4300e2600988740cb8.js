(function() {
  var _, link, shell, url;

  url = require('url');

  shell = require('electron').shell;

  _ = require('underscore-plus');

  link = require('link');

  global.activeEditor = function() {
    return atom.workspace.getActiveTextEditor();
  };

  atom.workspace.observeActiveTextEditor(function() {
    var editor;
    return editor = activeEditor();
  });

  atom.commands.add("atom-text-editor", "nerd:wrap-inline-comment", function() {
    var editor, results, selection, selectionIndex, selections;
    editor = atom.workspace.getActiveTextEditor();
    selections = editor.getSelections();
    console.log(selections);
    if (selections.length > 0) {
      results = [];
      for (selectionIndex in selections) {
        selection = selections[selectionIndex];
        console.log(selection.getText());
        results.push(console.log(selection));
      }
      return results;
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

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSOztFQUNMLFFBQVMsT0FBQSxDQUFRLFVBQVI7O0VBQ1YsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUjs7RUFDSixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBSVAsTUFBTSxDQUFDLFlBQVAsR0FBc0IsU0FBQTtBQUNwQixXQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtFQURhOztFQU10QixJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFmLENBQXVDLFNBQUE7QUFDckMsUUFBQTtXQUFBLE1BQUEsR0FBUyxZQUFBLENBQUE7RUFENEIsQ0FBdkM7O0VBS0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQywwQkFBdEMsRUFBa0UsU0FBQTtBQUNoRSxRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtJQUNULFVBQUEsR0FBYSxNQUFNLENBQUMsYUFBUCxDQUFBO0lBQ2IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaO0lBQ0EsSUFBRyxVQUFVLENBQUMsTUFBWCxHQUFvQixDQUF2QjtBQUNFO1dBQUEsNEJBQUE7O1FBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFTLENBQUMsT0FBVixDQUFBLENBQVo7cUJBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO0FBRkY7cUJBREY7O0VBSmdFLENBQWxFOztFQVdBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsZUFBdEMsRUFBdUQsU0FBQTtBQUNyRCxRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtJQUNULGFBQUEsR0FBZ0I7SUFDaEIsWUFBQSxHQUFlO0lBQ2YsSUFBRyxNQUFNLENBQUMsZUFBUCxDQUFBLENBQUg7TUFDRSxZQUFBLEdBQWUsTUFBTSxDQUFDLGVBQVAsQ0FBQSxFQURqQjs7SUFHQSxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFBLENBQUg7TUFDRSxhQUFBLEdBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFBLEVBRGxCOztJQUdBLElBQUcsQ0FBQyxZQUFELElBQWlCLENBQUMsYUFBckI7QUFDRSxhQURGOztJQUdBLFFBQUEsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFkLENBQStCLFVBQS9CO0lBQ1gsSUFBSSxRQUFKO01BQ0UsZUFBQSxHQUFrQixRQUFRLENBQUM7YUFDM0IsZUFBZSxDQUFDLE1BQWhCLENBQXVCLFlBQUEsR0FBYSxhQUFiLEdBQTJCLHlCQUEzQixHQUFvRCxZQUFwRCxHQUFpRSxZQUFqRSxHQUE2RSxZQUE3RSxHQUEwRixTQUFqSCxFQUZGOztFQWRxRCxDQUF2RDs7RUFxQkEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxnQkFBdEMsRUFBd0QsU0FBQTtBQUN0RCxRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtJQUNULFlBQUEsR0FBZSxNQUFNLENBQUMsZUFBUCxDQUFBO0lBQ2YsSUFBRyxZQUFIO01BQ0csV0FBWSxHQUFHLENBQUMsS0FBSixDQUFVLFlBQVY7TUFDYixJQUFHLFFBQUEsS0FBWSxPQUFaLElBQXVCLFFBQUEsS0FBWSxRQUF0QztlQUNFLEtBQUssQ0FBQyxZQUFOLENBQW1CLFlBQW5CLEVBREY7T0FBQSxNQUFBO2VBR0UsS0FBSyxDQUFDLFlBQU4sQ0FBbUIsU0FBQSxHQUFVLFlBQTdCLEVBSEY7T0FGRjtLQUFBLE1BQUE7YUFPRSxJQUFJLENBQUMsUUFBTCxDQUFBLEVBUEY7O0VBSHNELENBQXhEOztFQWNBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsNkJBQXRDLEVBQXFFLFNBQUE7QUFDbkUsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUE7SUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLE1BQW5CLENBQXZCLEVBQW1ELHdDQUFuRDtJQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBdkIsRUFBbUQsaUJBQW5EO1dBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixDQUF2QixFQUFtRCx3Q0FBbkQ7RUFKbUUsQ0FBckU7QUFoRUEiLCJzb3VyY2VzQ29udGVudCI6WyJ1cmwgPSByZXF1aXJlKCd1cmwnKVxue3NoZWxsfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJylcbl8gPSByZXF1aXJlKCd1bmRlcnNjb3JlLXBsdXMnKVxubGluayA9IHJlcXVpcmUgJ2xpbmsnXG4jIGxpbmsgPSByZXF1aXJlICcuL3BhY2thZ2VzL2xpbmsvbGliL2xpbmsuanMnXG5cblxuZ2xvYmFsLmFjdGl2ZUVkaXRvciA9ICgpIC0+XG4gIHJldHVybiBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcblxuIyMgQ3VzdG9tIENvbW1hbmRzXG5cbiNcbmF0b20ud29ya3NwYWNlLm9ic2VydmVBY3RpdmVUZXh0RWRpdG9yIC0+XG4gIGVkaXRvciA9IGFjdGl2ZUVkaXRvcigpXG5cblxuIyBDb21tZW50IHdyYXAgd2l0aCAvKiAuLi4gKi9cbmF0b20uY29tbWFuZHMuYWRkIFwiYXRvbS10ZXh0LWVkaXRvclwiLCBcIm5lcmQ6d3JhcC1pbmxpbmUtY29tbWVudFwiLCAtPlxuICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgc2VsZWN0aW9ucyA9IGVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgY29uc29sZS5sb2cgc2VsZWN0aW9uc1xuICBpZiBzZWxlY3Rpb25zLmxlbmd0aCA+IDBcbiAgICBmb3Igc2VsZWN0aW9uSW5kZXgsIHNlbGVjdGlvbiBvZiBzZWxlY3Rpb25zXG4gICAgICBjb25zb2xlLmxvZyBzZWxlY3Rpb24uZ2V0VGV4dCgpXG4gICAgICBjb25zb2xlLmxvZyBzZWxlY3Rpb25cblxuXG4jXG5hdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS10ZXh0LWVkaXRvcicsICduZXJkOmJpby1saW5rJywgLT5cbiAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gIGNsaXBib2FyZFRleHQgPSAnJ1xuICBzZWxlY3RlZFRleHQgPSAnJ1xuICBpZiBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcbiAgICBzZWxlY3RlZFRleHQgPSBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcblxuICBpZiBhdG9tLmNsaXBib2FyZC5yZWFkKClcbiAgICBjbGlwYm9hcmRUZXh0ID0gYXRvbS5jbGlwYm9hcmQucmVhZCgpXG5cbiAgaWYgIXNlbGVjdGVkVGV4dCB8fCAhY2xpcGJvYXJkVGV4dFxuICAgIHJldHVyblxuXG4gIHNuaXBwZXRzID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdzbmlwcGV0cycpXG4gIGlmIChzbmlwcGV0cylcbiAgICBzbmlwcGV0c1NlcnZpY2UgPSBzbmlwcGV0cy5tYWluTW9kdWxlXG4gICAgc25pcHBldHNTZXJ2aWNlLmluc2VydCBcIjxhIGhyZWY9XFxcIiN7Y2xpcGJvYXJkVGV4dH1cXFwiJHsxOiAkezI6dGl0bGU9XFxcIiR7Mzoje3NlbGVjdGVkVGV4dH19XFxcIn19PiR7NDoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcbiAgIyBhdG9tLnBhY2thZ2VzLmFjdGl2ZVBhY2thZ2VzLnNuaXBwZXRzPy5tYWluTW9kdWxlPy5pbnNlcnQgXCI8YSBocmVmPVxcXCIje2NsaXBib2FyZFRleHR9XFxcIiB0aXRsZT1cXFwiJHsxOiN7c2VsZWN0ZWRUZXh0fX1cXFwiPiR7Mjoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcblxuXG4jIE9wZW4gbGlua1xuYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20tdGV4dC1lZGl0b3InLCAnbmVyZDpsaW5rLW9wZW4nLCAtPlxuICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFNlbGVjdGVkVGV4dCgpXG4gIGlmIHNlbGVjdGVkVGV4dFxuICAgIHtwcm90b2NvbH0gPSB1cmwucGFyc2Uoc2VsZWN0ZWRUZXh0KVxuICAgIGlmIHByb3RvY29sID09ICdodHRwOicgfHwgcHJvdG9jb2wgPT0gJ2h0dHBzOidcbiAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbChzZWxlY3RlZFRleHQpXG4gICAgZWxzZVxuICAgICAgc2hlbGwub3BlbkV4dGVybmFsKFwiaHR0cDovLyN7c2VsZWN0ZWRUZXh0fVwiKVxuICBlbHNlXG4gICAgbGluay5vcGVuTGluaygpXG5cblxuIyBzc3NcbmF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ25lcmQ6c2VsZWN0LW91dHNpZGUtYnJhY2tldCcsIC0+XG4gIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpLCBcImJyYWNrZXQtbWF0Y2hlcjpzZWxlY3QtaW5zaWRlLWJyYWNrZXRzXCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiY29yZTptb3ZlLXJpZ2h0XCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiYnJhY2tldC1tYXRjaGVyOnNlbGVjdC1pbnNpZGUtYnJhY2tldHNcIilcblxuXG4jIEluIGluaXQuY29mZmVlXG4jIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4jICAgY29uc3QgZ2l0UGx1cyA9IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnZ2l0LXBsdXMnKVxuIyAgIGlmIChnaXRQbHVzKSB7XG4jICAgICBjb25zdCBncCA9IGdpdFBsdXMubWFpbk1vZHVsZS5wcm92aWRlU2VydmljZSgpXG4jICAgICAvLyBjb21tYW5kcyBnbyBoZXJlLCBzZWUgYmVsb3dcbiMgICB9XG4jIH0pXG5cbiMgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlSW5pdGlhbFBhY2thZ2VzICgpIC0+XG4jIGlmIGdpdFBsdXMgPSBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ2dpdC1wbHVzJyk/Lm1haW5Nb2R1bGUucHJvdmlkZVNlcnZpY2UoKVxuIyAgIGdpdFBsdXMucmVnaXN0ZXJDb21tYW5kICdhdG9tLXRleHQtZWRpdG9yJywgJ2N1c3RvbS1naXQtY29tbWFuZHM6dW5kby1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgLnRoZW4gKHJlcG8pIC0+IGdpdFBsdXMucnVuIHJlcG8sICdyZXNldCBIRUFEfjEnXG4jXG4jICAgICBnaXRQbHVzLnJlZ2lzdGVyQ29tbWFuZCAnYXRvbS10ZXh0LWVkaXRvcicsICdha29ud2k6dW5zdGFnZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAncmVzZXQgSEVBRH4xJ1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVwZGF0ZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAnY29tbWl0IC0tYWxsIC0tYW1lbmQgLS1uby1lZGl0J1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVzZS10aGUtZm9yY2UnLCAtPlxuIyAgICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgICAudGhlbiAocmVwbykgLT4gZ2l0UGx1cy5ydW4gcmVwbywgJ3B1c2ggLS1mb3JjZS13aXRoLWxlYXNlJ1xuIl19
