(function() {
  var TagListView, git;

  git = require('../git');

  TagListView = require('../views/tag-list-view');

  module.exports = function(repo) {
    return git.cmd(['tag', '-ln'], {
      cwd: repo.getWorkingDirectory()
    }).then(function(data) {
      return new TagListView(repo, data);
    })["catch"](function() {
      return new TagListView(repo);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9saWIvbW9kZWxzL2dpdC10YWdzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSOztFQUNOLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVI7O0VBRWQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFEO1dBQ2YsR0FBRyxDQUFDLEdBQUosQ0FBUSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQVIsRUFBd0I7TUFBQSxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FBTDtLQUF4QixDQUNBLENBQUMsSUFERCxDQUNNLFNBQUMsSUFBRDthQUFVLElBQUksV0FBSixDQUFnQixJQUFoQixFQUFzQixJQUF0QjtJQUFWLENBRE4sQ0FFQSxFQUFDLEtBQUQsRUFGQSxDQUVPLFNBQUE7YUFBRyxJQUFJLFdBQUosQ0FBZ0IsSUFBaEI7SUFBSCxDQUZQO0VBRGU7QUFIakIiLCJzb3VyY2VzQ29udGVudCI6WyJnaXQgPSByZXF1aXJlICcuLi9naXQnXG5UYWdMaXN0VmlldyA9IHJlcXVpcmUgJy4uL3ZpZXdzL3RhZy1saXN0LXZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcG8pIC0+XG4gIGdpdC5jbWQoWyd0YWcnLCAnLWxuJ10sIGN3ZDogcmVwby5nZXRXb3JraW5nRGlyZWN0b3J5KCkpXG4gIC50aGVuIChkYXRhKSAtPiBuZXcgVGFnTGlzdFZpZXcocmVwbywgZGF0YSlcbiAgLmNhdGNoIC0+IG5ldyBUYWdMaXN0VmlldyhyZXBvKVxuIl19
