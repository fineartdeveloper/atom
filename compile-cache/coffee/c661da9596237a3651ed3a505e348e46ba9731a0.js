(function() {
  module.exports = {
    onSave: function(editor) {
      var rangesToWrap;
      rangesToWrap = editor.getSelectedBufferRanges().filter(function(r) {
        return !r.isEmpty();
      });
      return console.log(rangesToWrap);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL3N1ZHByYXdhdC8uYXRvbS9mdW5jdGlvbnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLE1BQUEsRUFBUSxTQUFDLE1BQUQ7QUFFTixVQUFBO01BQUEsWUFBQSxHQUFlLE1BQU0sQ0FBQyx1QkFBUCxDQUFBLENBQWdDLENBQUMsTUFBakMsQ0FBd0MsU0FBQyxDQUFEO2VBQU8sQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFBO01BQVIsQ0FBeEM7YUFDZixPQUFPLENBQUMsR0FBUixDQUFZLFlBQVo7SUFITSxDQUFSOztBQURGIiwic291cmNlc0NvbnRlbnQiOlsiIyB+Ly5hdG9tL2Z1bmN0aW9ucy5jb2ZmZWVcblxubW9kdWxlLmV4cG9ydHMgPVxuICBvblNhdmU6IChlZGl0b3IpIC0+XG4gICAgIyBjb25zb2xlLmxvZyBcIlNhdmVkISAje2VkaXRvci5nZXRQYXRoKCl9XCJcbiAgICByYW5nZXNUb1dyYXAgPSBlZGl0b3IuZ2V0U2VsZWN0ZWRCdWZmZXJSYW5nZXMoKS5maWx0ZXIoKHIpIC0+ICFyLmlzRW1wdHkoKSlcbiAgICBjb25zb2xlLmxvZyByYW5nZXNUb1dyYXBcbiJdfQ==
