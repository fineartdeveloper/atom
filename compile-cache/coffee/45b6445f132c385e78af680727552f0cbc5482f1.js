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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9pbml0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSOztFQUNMLFFBQVMsT0FBQSxDQUFRLFVBQVI7O0VBQ1YsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUjs7RUFDSixJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBSVAsTUFBTSxDQUFDLFlBQVAsR0FBc0IsU0FBQTtBQUNwQixXQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtFQURhOztFQU10QixJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUFmLENBQXVDLFNBQUE7QUFDckMsUUFBQTtXQUFBLE1BQUEsR0FBUyxZQUFBLENBQUE7RUFENEIsQ0FBdkM7O0VBS0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxlQUF0QyxFQUF1RCxTQUFBO0FBQ3JELFFBQUE7SUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0lBQ1QsYUFBQSxHQUFnQjtJQUNoQixZQUFBLEdBQWU7SUFDZixJQUFHLE1BQU0sQ0FBQyxlQUFQLENBQUEsQ0FBSDtNQUNFLFlBQUEsR0FBZSxNQUFNLENBQUMsZUFBUCxDQUFBLEVBRGpCOztJQUdBLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQUEsQ0FBSDtNQUNFLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQUEsRUFEbEI7O0lBR0EsSUFBRyxDQUFDLFlBQUQsSUFBaUIsQ0FBQyxhQUFyQjtBQUNFLGFBREY7O0lBR0EsUUFBQSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsVUFBL0I7SUFDWCxJQUFJLFFBQUo7TUFDRSxlQUFBLEdBQWtCLFFBQVEsQ0FBQzthQUMzQixlQUFlLENBQUMsTUFBaEIsQ0FBdUIsWUFBQSxHQUFhLGFBQWIsR0FBMkIseUJBQTNCLEdBQW9ELFlBQXBELEdBQWlFLFlBQWpFLEdBQTZFLFlBQTdFLEdBQTBGLFNBQWpILEVBRkY7O0VBZHFELENBQXZEOztFQXFCQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDLGdCQUF0QyxFQUF3RCxTQUFBO0FBQ3RELFFBQUE7SUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO0lBQ1QsWUFBQSxHQUFlLE1BQU0sQ0FBQyxlQUFQLENBQUE7SUFDZixJQUFHLFlBQUg7TUFDRyxXQUFZLEdBQUcsQ0FBQyxLQUFKLENBQVUsWUFBVjtNQUNiLElBQUcsUUFBQSxLQUFZLE9BQVosSUFBdUIsUUFBQSxLQUFZLFFBQXRDO2VBQ0UsS0FBSyxDQUFDLFlBQU4sQ0FBbUIsWUFBbkIsRUFERjtPQUFBLE1BQUE7ZUFHRSxLQUFLLENBQUMsWUFBTixDQUFtQixTQUFBLEdBQVUsWUFBN0IsRUFIRjtPQUZGO0tBQUEsTUFBQTthQU9FLElBQUksQ0FBQyxRQUFMLENBQUEsRUFQRjs7RUFIc0QsQ0FBeEQ7O0VBY0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyw2QkFBdEMsRUFBcUUsU0FBQTtBQUNuRSxRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQTtJQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBdkIsRUFBbUQsd0NBQW5EO0lBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixDQUF2QixFQUFtRCxpQkFBbkQ7V0FDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLE1BQW5CLENBQXZCLEVBQW1ELHdDQUFuRDtFQUptRSxDQUFyRTtBQXJEQSIsInNvdXJjZXNDb250ZW50IjpbInVybCA9IHJlcXVpcmUoJ3VybCcpXG57c2hlbGx9ID0gcmVxdWlyZSgnZWxlY3Ryb24nKVxuXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUtcGx1cycpXG5saW5rID0gcmVxdWlyZSAnbGluaydcbiMgbGluayA9IHJlcXVpcmUgJy4vcGFja2FnZXMvbGluay9saWIvbGluay5qcydcblxuXG5nbG9iYWwuYWN0aXZlRWRpdG9yID0gKCkgLT5cbiAgcmV0dXJuIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuXG4jIyBDdXN0b20gQ29tbWFuZHNcblxuI1xuYXRvbS53b3Jrc3BhY2Uub2JzZXJ2ZUFjdGl2ZVRleHRFZGl0b3IgLT5cbiAgZWRpdG9yID0gYWN0aXZlRWRpdG9yKClcblxuXG4jXG5hdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS10ZXh0LWVkaXRvcicsICduZXJkOmJpby1saW5rJywgLT5cbiAgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpXG4gIGNsaXBib2FyZFRleHQgPSAnJ1xuICBzZWxlY3RlZFRleHQgPSAnJ1xuICBpZiBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcbiAgICBzZWxlY3RlZFRleHQgPSBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KClcblxuICBpZiBhdG9tLmNsaXBib2FyZC5yZWFkKClcbiAgICBjbGlwYm9hcmRUZXh0ID0gYXRvbS5jbGlwYm9hcmQucmVhZCgpXG5cbiAgaWYgIXNlbGVjdGVkVGV4dCB8fCAhY2xpcGJvYXJkVGV4dFxuICAgIHJldHVyblxuXG4gIHNuaXBwZXRzID0gYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCdzbmlwcGV0cycpXG4gIGlmIChzbmlwcGV0cylcbiAgICBzbmlwcGV0c1NlcnZpY2UgPSBzbmlwcGV0cy5tYWluTW9kdWxlXG4gICAgc25pcHBldHNTZXJ2aWNlLmluc2VydCBcIjxhIGhyZWY9XFxcIiN7Y2xpcGJvYXJkVGV4dH1cXFwiJHsxOiAkezI6dGl0bGU9XFxcIiR7Mzoje3NlbGVjdGVkVGV4dH19XFxcIn19PiR7NDoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcbiAgIyBhdG9tLnBhY2thZ2VzLmFjdGl2ZVBhY2thZ2VzLnNuaXBwZXRzPy5tYWluTW9kdWxlPy5pbnNlcnQgXCI8YSBocmVmPVxcXCIje2NsaXBib2FyZFRleHR9XFxcIiB0aXRsZT1cXFwiJHsxOiN7c2VsZWN0ZWRUZXh0fX1cXFwiPiR7Mjoje3NlbGVjdGVkVGV4dH19PC9hPiQwXCJcblxuXG4jIE9wZW4gbGlua1xuYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20tdGV4dC1lZGl0b3InLCAnbmVyZDpsaW5rLW9wZW4nLCAtPlxuICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKClcbiAgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFNlbGVjdGVkVGV4dCgpXG4gIGlmIHNlbGVjdGVkVGV4dFxuICAgIHtwcm90b2NvbH0gPSB1cmwucGFyc2Uoc2VsZWN0ZWRUZXh0KVxuICAgIGlmIHByb3RvY29sID09ICdodHRwOicgfHwgcHJvdG9jb2wgPT0gJ2h0dHBzOidcbiAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbChzZWxlY3RlZFRleHQpXG4gICAgZWxzZVxuICAgICAgc2hlbGwub3BlbkV4dGVybmFsKFwiaHR0cDovLyN7c2VsZWN0ZWRUZXh0fVwiKVxuICBlbHNlXG4gICAgbGluay5vcGVuTGluaygpXG5cblxuIyBzc3NcbmF0b20uY29tbWFuZHMuYWRkICdhdG9tLXRleHQtZWRpdG9yJywgJ25lcmQ6c2VsZWN0LW91dHNpZGUtYnJhY2tldCcsIC0+XG4gIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpLCBcImJyYWNrZXQtbWF0Y2hlcjpzZWxlY3QtaW5zaWRlLWJyYWNrZXRzXCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiY29yZTptb3ZlLXJpZ2h0XCIpXG4gIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksIFwiYnJhY2tldC1tYXRjaGVyOnNlbGVjdC1pbnNpZGUtYnJhY2tldHNcIilcblxuXG4jIEluIGluaXQuY29mZmVlXG4jIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4jICAgY29uc3QgZ2l0UGx1cyA9IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZSgnZ2l0LXBsdXMnKVxuIyAgIGlmIChnaXRQbHVzKSB7XG4jICAgICBjb25zdCBncCA9IGdpdFBsdXMubWFpbk1vZHVsZS5wcm92aWRlU2VydmljZSgpXG4jICAgICAvLyBjb21tYW5kcyBnbyBoZXJlLCBzZWUgYmVsb3dcbiMgICB9XG4jIH0pXG5cbiMgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlSW5pdGlhbFBhY2thZ2VzICgpIC0+XG4jIGlmIGdpdFBsdXMgPSBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ2dpdC1wbHVzJyk/Lm1haW5Nb2R1bGUucHJvdmlkZVNlcnZpY2UoKVxuIyAgIGdpdFBsdXMucmVnaXN0ZXJDb21tYW5kICdhdG9tLXRleHQtZWRpdG9yJywgJ2N1c3RvbS1naXQtY29tbWFuZHM6dW5kby1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgLnRoZW4gKHJlcG8pIC0+IGdpdFBsdXMucnVuIHJlcG8sICdyZXNldCBIRUFEfjEnXG4jXG4jICAgICBnaXRQbHVzLnJlZ2lzdGVyQ29tbWFuZCAnYXRvbS10ZXh0LWVkaXRvcicsICdha29ud2k6dW5zdGFnZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAncmVzZXQgSEVBRH4xJ1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVwZGF0ZS1sYXN0LWNvbW1pdCcsIC0+XG4jICAgICAgIGdpdFBsdXMuZ2V0UmVwbygpICMgSWYgdGhlcmUgYXJlIG11bHRpcGxlIHJlcG9zIGluIHRoZSBwcm9qZWN0LCB5b3Ugd2lsbCBiZSBwcm9tcHRlZCB0byBzZWxlY3Qgd2hpY2ggdG8gdXNlXG4jICAgICAgIC50aGVuIChyZXBvKSAtPiBnaXRQbHVzLnJ1biByZXBvLCAnY29tbWl0IC0tYWxsIC0tYW1lbmQgLS1uby1lZGl0J1xuI1xuIyAgICAgZ2l0UGx1cy5yZWdpc3RlckNvbW1hbmQgJ2F0b20tdGV4dC1lZGl0b3InLCAnYWtvbndpOnVzZS10aGUtZm9yY2UnLCAtPlxuIyAgICAgICBnaXRQbHVzLmdldFJlcG8oKSAjIElmIHRoZXJlIGFyZSBtdWx0aXBsZSByZXBvcyBpbiB0aGUgcHJvamVjdCwgeW91IHdpbGwgYmUgcHJvbXB0ZWQgdG8gc2VsZWN0IHdoaWNoIHRvIHVzZVxuIyAgICAgICAudGhlbiAocmVwbykgLT4gZ2l0UGx1cy5ydW4gcmVwbywgJ3B1c2ggLS1mb3JjZS13aXRoLWxlYXNlJ1xuIl19
