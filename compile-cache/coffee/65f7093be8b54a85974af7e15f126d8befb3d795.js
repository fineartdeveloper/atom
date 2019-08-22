(function() {
  module.exports = {
    activate: function() {
      return this.wrapBlock();
    },
    onSave: function(editor) {
      return this.activate();
    },
    wrapBlock: function() {
      var cursors, editor;
      editor = atom.workspace.getActiveTextEditor();
      cursors = editor.getCursors();
      atom.commands.remove("nerd:wrap-block");
      return atom.commands.add("atom-text-editor", "nerd:wrap-block", function() {
        return console.log("wrapBlock");
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9mdW5jdGlvbnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFFBQUEsRUFBVSxTQUFBO2FBQ1IsSUFBSSxDQUFDLFNBQUwsQ0FBQTtJQURRLENBQVY7SUFFQSxNQUFBLEVBQVEsU0FBQyxNQUFEO2FBRU4sSUFBSSxDQUFDLFFBQUwsQ0FBQTtJQUZNLENBRlI7SUFLQSxTQUFBLEVBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBO01BQ1QsT0FBQSxHQUFVLE1BQU0sQ0FBQyxVQUFQLENBQUE7TUFFVixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsQ0FBcUIsaUJBQXJCO2FBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxpQkFBdEMsRUFBeUQsU0FBQTtlQUV2RCxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVo7TUFGdUQsQ0FBekQ7SUFMUyxDQUxYOztBQURGIiwic291cmNlc0NvbnRlbnQiOlsiIyB+Ly5hdG9tL2Z1bmN0aW9ucy5jb2ZmZWVcblxubW9kdWxlLmV4cG9ydHMgPVxuICBhY3RpdmF0ZTogKCkgLT5cbiAgICB0aGlzLndyYXBCbG9jaygpXG4gIG9uU2F2ZTogKGVkaXRvcikgLT5cbiAgICAjIGNvbnNvbGUubG9nIFwiU2F2ZWQhXCJcbiAgICB0aGlzLmFjdGl2YXRlKClcbiAgd3JhcEJsb2NrOiAoKSAtPlxuICAgIGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICAgIGN1cnNvcnMgPSBlZGl0b3IuZ2V0Q3Vyc29ycygpXG4gICAgIyBjb25zb2xlLmxvZyBjdXJzb3JzXG4gICAgYXRvbS5jb21tYW5kcy5yZW1vdmUoXCJuZXJkOndyYXAtYmxvY2tcIilcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCBcImF0b20tdGV4dC1lZGl0b3JcIiwgXCJuZXJkOndyYXAtYmxvY2tcIiwgKCkgLT5cbiAgICAgICMgY29uc29sZS5sb2cgXCJ3cmFwQmxvY2sgeHh4XCJcbiAgICAgIGNvbnNvbGUubG9nIFwid3JhcEJsb2NrXCJcbiJdfQ==
