(function() {
  module.exports = {
    onSave: function(editor) {
      var rangesToWrap;
      rangesToWrap = editor.getSelectedBufferRanges().filter(function(r) {
        return !r.isEmpty();
      });
      return console.log("rangesToWrap");
    },
    onFuck: function(editor) {
      return console.log("FUCK");
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9mdW5jdGlvbnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLE1BQUEsRUFBUSxTQUFDLE1BQUQ7QUFFTixVQUFBO01BQUEsWUFBQSxHQUFlLE1BQU0sQ0FBQyx1QkFBUCxDQUFBLENBQWdDLENBQUMsTUFBakMsQ0FBd0MsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFBO01BQVIsQ0FBeEM7YUFDZixPQUFPLENBQUMsR0FBUixDQUFZLGNBQVo7SUFITSxDQUFSO0lBSUEsTUFBQSxFQUFRLFNBQUMsTUFBRDthQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtJQURNLENBSlI7O0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyIjIH4vLmF0b20vZnVuY3Rpb25zLmNvZmZlZVxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIG9uU2F2ZTogKGVkaXRvcikgLT5cbiAgICAjIGNvbnNvbGUubG9nIFwiU2F2ZWQhICN7ZWRpdG9yLmdldFBhdGgoKX1cIlxuICAgIHJhbmdlc1RvV3JhcCA9IGVkaXRvci5nZXRTZWxlY3RlZEJ1ZmZlclJhbmdlcygpLmZpbHRlcigocikgLT4gIXIuaXNFbXB0eSgpKVxuICAgIGNvbnNvbGUubG9nIFwicmFuZ2VzVG9XcmFwXCJcbiAgb25GdWNrOiAoZWRpdG9yKSAtPlxuICAgIGNvbnNvbGUubG9nIFwiRlVDS1wiXG4iXX0=
