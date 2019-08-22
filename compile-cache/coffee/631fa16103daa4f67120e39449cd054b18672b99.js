(function() {
  module.exports = {
    activate: function() {
      return atom.commands.add("atom-text-editor", "nerd:wrap-block", function() {
        return this.wrapBlock();
      });
    },
    onSave: function(editor) {
      return this.wrapBlock(editor);
    },
    wrapBlock: function(editor) {
      var rangesToWrap;
      atom.commands.add("atom-text-editor", "nerd:wrap-block", function() {
        return console.log("wrapBlock");
      });
      rangesToWrap = editor.getSelectedBufferRanges().filter(function(r) {
        return !r.isEmpty();
      });
      return console.log(rangesToWrap);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9mdW5jdGlvbnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFFBQUEsRUFBVSxTQUFBO2FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxpQkFBdEMsRUFBeUQsU0FBQTtlQUN2RCxJQUFJLENBQUMsU0FBTCxDQUFBO01BRHVELENBQXpEO0lBRFEsQ0FBVjtJQUdBLE1BQUEsRUFBUSxTQUFDLE1BQUQ7YUFFTixJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7SUFGTSxDQUhSO0lBTUEsU0FBQSxFQUFXLFNBQUMsTUFBRDtBQUNULFVBQUE7TUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDLGlCQUF0QyxFQUF5RCxTQUFBO2VBQ3ZELE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjtNQUR1RCxDQUF6RDtNQUdBLFlBQUEsR0FBZSxNQUFNLENBQUMsdUJBQVAsQ0FBQSxDQUFnQyxDQUFDLE1BQWpDLENBQXdDLFNBQUMsQ0FBRDtlQUFPLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBQTtNQUFSLENBQXhDO2FBQ2YsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaO0lBTFMsQ0FOWDs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIiMgfi8uYXRvbS9mdW5jdGlvbnMuY29mZmVlXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgYWN0aXZhdGU6ICgpIC0+XG4gICAgYXRvbS5jb21tYW5kcy5hZGQgXCJhdG9tLXRleHQtZWRpdG9yXCIsIFwibmVyZDp3cmFwLWJsb2NrXCIsICgpIC0+XG4gICAgICB0aGlzLndyYXBCbG9jaygpXG4gIG9uU2F2ZTogKGVkaXRvcikgLT5cbiAgICAjIGNvbnNvbGUubG9nIFwiU2F2ZWQhICN7ZWRpdG9yLmdldFBhdGgoKX1cIlxuICAgIHRoaXMud3JhcEJsb2NrKGVkaXRvcilcbiAgd3JhcEJsb2NrOiAoZWRpdG9yKSAtPlxuICAgIGF0b20uY29tbWFuZHMuYWRkIFwiYXRvbS10ZXh0LWVkaXRvclwiLCBcIm5lcmQ6d3JhcC1ibG9ja1wiLCAoKSAtPlxuICAgICAgY29uc29sZS5sb2cgXCJ3cmFwQmxvY2tcIlxuXG4gICAgcmFuZ2VzVG9XcmFwID0gZWRpdG9yLmdldFNlbGVjdGVkQnVmZmVyUmFuZ2VzKCkuZmlsdGVyKChyKSAtPiAhci5pc0VtcHR5KCkpXG4gICAgY29uc29sZS5sb2cgcmFuZ2VzVG9XcmFwXG4iXX0=
