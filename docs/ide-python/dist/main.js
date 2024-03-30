"use strict";

var _main = require("./debugger/main");

const cp = require("child_process");

const {
  shell
} = require("electron");

const {
  AutoLanguageClient
} = require("atom-languageclient");

const {
  detectVirtualEnv,
  detectPipEnv,
  replacePipEnvPathVar,
  sanitizeConfig
} = require("./utils");

// Ref: https://github.com/nteract/hydrogen/blob/master/lib/autocomplete-provider.js#L33
// adapted from http://stackoverflow.com/q/5474008
const PYTHON_REGEX = /(([^\d\W]|[\u00A0-\uFFFF])[\w.\u00A0-\uFFFF]*)|\.$/;

class PythonLanguageClient extends AutoLanguageClient {
  getGrammarScopes() {
    return ["source.python", "python"];
  }

  getLanguageName() {
    return "Python";
  }

  getServerName() {
    return "pyls";
  }

  getRootConfigurationKey() {
    return "ide-python";
  }

  activate() {
    // Remove deprecated option
    atom.config.unset("ide-python.pylsPath");
    super.activate();
    (0, _main.activate)();
  }

  mapConfigurationObject(configuration) {
    return {
      pyls: {
        configurationSources: configuration.pylsConfigurationSources,
        rope: sanitizeConfig(configuration.rope),
        plugins: configuration.pylsPlugins
      }
    };
  }

  async startServerProcess(projectPath) {
    const venvPath = (await detectPipEnv(projectPath)) || (await detectVirtualEnv(projectPath));
    const pylsEnvironment = Object.assign({}, process.env);

    if (venvPath) {
      pylsEnvironment["VIRTUAL_ENV"] = venvPath;
    }

    const python = replacePipEnvPathVar(atom.config.get("ide-python.python"), venvPath);
    const childProcess = cp.spawn(python, ["-m", "pyls"], {
      cwd: projectPath,
      env: pylsEnvironment
    });
    childProcess.on("error", err => {
      const description = err.code == "ENOENT" ? `No Python interpreter found at \`${python}\`.` : `Could not spawn the Python interpreter \`${python}\`.`;
      atom.notifications.addError("`ide-python` could not launch your Python runtime.", {
        dismissable: true,
        description: `${description}<p>If you have Python installed please set "Python Executable" setting correctly. If you do not please install Python.</p>`
      });
    });
    childProcess.on("close", (code, signal) => {
      if (code !== 0 && signal == null) {
        atom.notifications.addError("Unable to start the Python language server.", {
          dismissable: true,
          buttons: [{
            text: "Install Instructions",
            onDidClick: () => atom.workspace.open("atom://config/packages/ide-python")
          }, {
            text: "Download Python",
            onDidClick: () => shell.openExternal("https://www.python.org/downloads/")
          }],
          description: "Make sure to install `pyls` 0.19 or newer by running:\n" + "```\n" + `${python} -m pip install 'python-language-server[all]'\n` + `${python} -m pip install git+https://github.com/tomv564/pyls-mypy.git\n` + "```"
        });
      }
    });
    return childProcess;
  }

  async getSuggestions(request) {
    if (!PYTHON_REGEX.test(request.prefix)) return null;
    return super.getSuggestions(request);
  }

  deactivate() {
    (0, _main.dispose)();
    return Promise.race([super.deactivate(), this.createTimeoutPromise(2000)]);
  }

  createTimeoutPromise(milliseconds) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.logger.error(`Server failed to shutdown in ${milliseconds}ms, forcing termination`);
        resolve();
      }, milliseconds);
    });
  }

}

const pythonClient = new PythonLanguageClient();
pythonClient.createDebuggerProvider = _main.createDebuggerProvider; // add the debugger

module.exports = pythonClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3AiLCJyZXF1aXJlIiwic2hlbGwiLCJBdXRvTGFuZ3VhZ2VDbGllbnQiLCJkZXRlY3RWaXJ0dWFsRW52IiwiZGV0ZWN0UGlwRW52IiwicmVwbGFjZVBpcEVudlBhdGhWYXIiLCJzYW5pdGl6ZUNvbmZpZyIsIlBZVEhPTl9SRUdFWCIsIlB5dGhvbkxhbmd1YWdlQ2xpZW50IiwiZ2V0R3JhbW1hclNjb3BlcyIsImdldExhbmd1YWdlTmFtZSIsImdldFNlcnZlck5hbWUiLCJnZXRSb290Q29uZmlndXJhdGlvbktleSIsImFjdGl2YXRlIiwiYXRvbSIsImNvbmZpZyIsInVuc2V0IiwibWFwQ29uZmlndXJhdGlvbk9iamVjdCIsImNvbmZpZ3VyYXRpb24iLCJweWxzIiwiY29uZmlndXJhdGlvblNvdXJjZXMiLCJweWxzQ29uZmlndXJhdGlvblNvdXJjZXMiLCJyb3BlIiwicGx1Z2lucyIsInB5bHNQbHVnaW5zIiwic3RhcnRTZXJ2ZXJQcm9jZXNzIiwicHJvamVjdFBhdGgiLCJ2ZW52UGF0aCIsInB5bHNFbnZpcm9ubWVudCIsIk9iamVjdCIsImFzc2lnbiIsInByb2Nlc3MiLCJlbnYiLCJweXRob24iLCJnZXQiLCJjaGlsZFByb2Nlc3MiLCJzcGF3biIsImN3ZCIsIm9uIiwiZXJyIiwiZGVzY3JpcHRpb24iLCJjb2RlIiwibm90aWZpY2F0aW9ucyIsImFkZEVycm9yIiwiZGlzbWlzc2FibGUiLCJzaWduYWwiLCJidXR0b25zIiwidGV4dCIsIm9uRGlkQ2xpY2siLCJ3b3Jrc3BhY2UiLCJvcGVuIiwib3BlbkV4dGVybmFsIiwiZ2V0U3VnZ2VzdGlvbnMiLCJyZXF1ZXN0IiwidGVzdCIsInByZWZpeCIsImRlYWN0aXZhdGUiLCJQcm9taXNlIiwicmFjZSIsImNyZWF0ZVRpbWVvdXRQcm9taXNlIiwibWlsbGlzZWNvbmRzIiwicmVzb2x2ZSIsInJlamVjdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwibG9nZ2VyIiwiZXJyb3IiLCJweXRob25DbGllbnQiLCJjcmVhdGVEZWJ1Z2dlclByb3ZpZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFMQSxNQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQWxCOztBQUNBLE1BQU07QUFBRUMsRUFBQUE7QUFBRixJQUFZRCxPQUFPLENBQUMsVUFBRCxDQUF6Qjs7QUFDQSxNQUFNO0FBQUVFLEVBQUFBO0FBQUYsSUFBeUJGLE9BQU8sQ0FBQyxxQkFBRCxDQUF0Qzs7QUFDQSxNQUFNO0FBQUVHLEVBQUFBLGdCQUFGO0FBQW9CQyxFQUFBQSxZQUFwQjtBQUFrQ0MsRUFBQUEsb0JBQWxDO0FBQXdEQyxFQUFBQTtBQUF4RCxJQUEyRU4sT0FBTyxDQUFDLFNBQUQsQ0FBeEY7O0FBSUE7QUFDQTtBQUNBLE1BQU1PLFlBQVksR0FBRyxvREFBckI7O0FBRUEsTUFBTUMsb0JBQU4sU0FBbUNOLGtCQUFuQyxDQUFzRDtBQUNwRE8sRUFBQUEsZ0JBQWdCLEdBQUc7QUFDakIsV0FBTyxDQUFDLGVBQUQsRUFBa0IsUUFBbEIsQ0FBUDtBQUNEOztBQUVEQyxFQUFBQSxlQUFlLEdBQUc7QUFDaEIsV0FBTyxRQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLGFBQWEsR0FBRztBQUNkLFdBQU8sTUFBUDtBQUNEOztBQUVEQyxFQUFBQSx1QkFBdUIsR0FBRztBQUN4QixXQUFPLFlBQVA7QUFDRDs7QUFFREMsRUFBQUEsUUFBUSxHQUFHO0FBQ1Q7QUFDQUMsSUFBQUEsSUFBSSxDQUFDQyxNQUFMLENBQVlDLEtBQVosQ0FBa0IscUJBQWxCO0FBQ0EsVUFBTUgsUUFBTjtBQUNBO0FBQ0Q7O0FBRURJLEVBQUFBLHNCQUFzQixDQUFDQyxhQUFELEVBQWdCO0FBQ3BDLFdBQU87QUFDTEMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLG9CQUFvQixFQUFFRixhQUFhLENBQUNHLHdCQURoQztBQUVKQyxRQUFBQSxJQUFJLEVBQUVoQixjQUFjLENBQUNZLGFB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Q0FBckIsQ0FBYixDQUFQO0FBQ0Q7O0FBRURBLEVBQUFBLG9CQUFvQixDQUFDQyxZQUFELEVBQWU7QUFDakMsV0FBTyxJQUFJSCxPQUFKLENBQVksQ0FBQ0ksT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDLFVBQUlDLE9BQU8sR0FBR0MsVUFBVSxDQUFDLE1BQU07QUFDN0JDLFFBQUFBLFlBQVksQ0FBQ0YsT0FBRCxDQUFaO0FBQ0EsYUFBS0csTUFBTCxDQUFZQyxLQUFaLENBQW1CLGdDQUErQlAsWUFBYSx5QkFBL0Q7QUFDQUMsUUFBQUEsT0FBTztBQUNSLE9BSnVCLEVBSXJCRCxZQUpxQixDQUF4QjtBQUtELEtBTk0sQ0FBUDtBQU9EOztBQXBHbUQ7O0FBdUd0RCxNQUFNUSxZQUFZLEdBQUcsSUFBSTVELG9CQUFKLEVBQXJCO0FBQ0E0RCxZQUFZLENBQUNDLHNCQUFiLEdBQXNDQSw0QkFBdEMsQyxDQUE2RDs7QUFDN0RDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkgsWUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcCA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpXG5jb25zdCB7IHNoZWxsIH0gPSByZXF1aXJlKFwiZWxlY3Ryb25cIilcbmNvbnN0IHsgQXV0b0xhbmd1YWdlQ2xpZW50IH0gPSByZXF1aXJlKFwiYXRvbS1sYW5ndWFnZWNsaWVudFwiKVxuY29uc3QgeyBkZXRlY3RWaXJ0dWFsRW52LCBkZXRlY3RQaXBFbnYsIHJlcGxhY2VQaXBFbnZQYXRoVmFyLCBzYW5pdGl6ZUNvbmZpZyB9ID0gcmVxdWlyZShcIi4vdXRpbHNcIilcblxuaW1wb3J0IHsgY3JlYXRlRGVidWdnZXJQcm92aWRlciwgYWN0aXZhdGUgYXMgZGVidWdnZXJBY3RpdmF0ZSwgZGlzcG9zZSBhcyBkZWJ1Z2dlckRpc3Bvc2UgfSBmcm9tIFwiLi9kZWJ1Z2dlci9tYWluXCJcblxuLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbnRlcmFjdC9oeWRyb2dlbi9ibG9iL21hc3Rlci9saWIvYXV0b2NvbXBsZXRlLXByb3ZpZGVyLmpzI0wzM1xuLy8gYWRhcHRlZCBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xLzU0NzQwMDhcbmNvbnN0IFBZVEhPTl9SRUdFWCA9IC8oKFteXFxkXFxXXXxbXFx1MDBBMC1cXHVGRkZGXSlbXFx3LlxcdTAwQTAtXFx1RkZGRl0qKXxcXC4kL1xuXG5jbGFzcyBQeXRob25MYW5ndWFnZUNsaWVudCBleHRlbmRzIEF1dG9MYW5ndWFnZUNsaWVudCB7XG4gIGdldEdyYW1tYXJTY29wZXMoKSB7XG4gICAgcmV0dXJuIFtcInNvdXJjZS5weXRob25cIiwgXCJweXRob25cIl1cbiAgfVxuXG4gIGdldExhbmd1YWdlTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQeXRob25cIlxuICB9XG5cbiAgZ2V0U2VydmVyTmFtZSgpIHtcbiAgICByZXR1cm4gXCJweWxzXCJcbiAgfVxuXG4gIGdldFJvb3RDb25maWd1cmF0aW9uS2V5KCkge1xuICAgIHJldHVybiBcImlkZS1weXRob25cIlxuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgLy8gUmVtb3ZlIGRlcHJlY2F0ZWQgb3B0aW9uXG4gICAgYXRvbS5jb25maWcudW5zZXQoXCJpZGUtcHl0aG9uLnB5bHNQYXRoXCIpXG4gICAgc3VwZXIuYWN0aXZhdGUoKVxuICAgIGRlYnVnZ2VyQWN0aXZhdGUoKVxuICB9XG5cbiAgbWFwQ29uZmlndXJhdGlvbk9iamVjdChjb25maWd1cmF0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHB5bHM6IHtcbiAgICAgICAgY29uZmlndXJhdGlvblNvdXJjZXM6IGNvbmZpZ3VyYXRpb24ucHlsc0NvbmZpZ3VyYXRpb25Tb3VyY2VzLFxuICAgICAgICByb3BlOiBzYW5pdGl6ZUNvbmZpZyhjb25maWd1cmF0aW9uLnJvcGUpLFxuICAgICAgICBwbHVnaW5zOiBjb25maWd1cmF0aW9uLnB5bHNQbHVnaW5zLFxuICAgICAgfSxcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydFNlcnZlclByb2Nlc3MocHJvamVjdFBhdGgpIHtcbiAgICBjb25zdCB2ZW52UGF0aCA9IChhd2FpdCBkZXRlY3RQaXBFbnYocHJvamVjdFBhdGgpKSB8fCAoYXdhaXQgZGV0ZWN0VmlydHVhbEVudihwcm9qZWN0UGF0aCkpXG4gICAgY29uc3QgcHlsc0Vudmlyb25tZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvY2Vzcy5lbnYpXG4gICAgaWYgKHZlbnZQYXRoKSB7XG4gICAgICBweWxzRW52aXJvbm1lbnRbXCJWSVJUVUFMX0VOVlwiXSA9IHZlbnZQYXRoXG4gICAgfVxuICAgIGNvbnN0IHB5dGhvbiA9IHJlcGxhY2VQaXBFbnZQYXRoVmFyKGF0b20uY29uZmlnLmdldChcImlkZS1weXRob24ucHl0aG9uXCIpLCB2ZW52UGF0aClcbiAgICBjb25zdCBjaGlsZFByb2Nlc3MgPSBjcC5zcGF3bihweXRob24sIFtcIi1tXCIsIFwicHlsc1wiXSwge1xuICAgICAgY3dkOiBwcm9qZWN0UGF0aCxcbiAgICAgIGVudjogcHlsc0Vudmlyb25tZW50LFxuICAgIH0pXG4gICAgY2hpbGRQcm9jZXNzLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPVxuICAgICAgICBlcnIuY29kZSA9PSBcIkVOT0VOVFwiXG4gICAgICAgICAgPyBgTm8gUHl0aG9uIGludGVycHJldGVyIGZvdW5kIGF0IFxcYCR7cHl0aG9ufVxcYC5gXG4gICAgICAgICAgOiBgQ291bGQgbm90IHNwYXduIHRoZSBQeXRob24gaW50ZXJwcmV0ZXIgXFxgJHtweXRob259XFxgLmBcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcImBpZGUtcHl0aG9uYCBjb3VsZCBub3QgbGF1bmNoIHlvdXIgUHl0aG9uIHJ1bnRpbWUuXCIsIHtcbiAgICAgICAgZGlzbWlzc2FibGU6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgJHtkZXNjcmlwdGlvbn08cD5JZiB5b3UgaGF2ZSBQeXRob24gaW5zdGFsbGVkIHBsZWFzZSBzZXQgXCJQeXRob24gRXhlY3V0YWJsZVwiIHNldHRpbmcgY29ycmVjdGx5LiBJZiB5b3UgZG8gbm90IHBsZWFzZSBpbnN0YWxsIFB5dGhvbi48L3A+YCxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNoaWxkUHJvY2Vzcy5vbihcImNsb3NlXCIsIChjb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIGlmIChjb2RlICE9PSAwICYmIHNpZ25hbCA9PSBudWxsKSB7XG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcIlVuYWJsZSB0byBzdGFydCB0aGUgUHl0aG9uIGxhbmd1YWdlIHNlcnZlci5cIiwge1xuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJJbnN0YWxsIEluc3RydWN0aW9uc1wiLFxuICAgICAgICAgICAgICBvbkRpZENsaWNrOiAoKSA9PiBhdG9tLndvcmtzcGFjZS5vcGVuKFwiYXRvbTovL2NvbmZpZy9wYWNrYWdlcy9pZGUtcHl0aG9uXCIpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogXCJEb3dubG9hZCBQeXRob25cIixcbiAgICAgICAgICAgICAgb25EaWRDbGljazogKCkgPT4gc2hlbGwub3BlbkV4dGVybmFsKFwiaHR0cHM6Ly93d3cucHl0aG9uLm9yZy9kb3dubG9hZHMvXCIpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgXCJNYWtlIHN1cmUgdG8gaW5zdGFsbCBgcHlsc2AgMC4xOSBvciBuZXdlciBieSBydW5uaW5nOlxcblwiICtcbiAgICAgICAgICAgIFwiYGBgXFxuXCIgK1xuICAgICAgICAgICAgYCR7cHl0aG9ufSAtbSBwaXAgaW5zdGFsbCAncHl0aG9uLWxhbmd1YWdlLXNlcnZlclthbGxdJ1xcbmAgK1xuICAgICAgICAgICAgYCR7cHl0aG9ufSAtbSBwaXAgaW5zdGFsbCBnaXQraHR0cHM6Ly9naXRodWIuY29tL3RvbXY1NjQvcHlscy1teXB5LmdpdFxcbmAgK1xuICAgICAgICAgICAgXCJgYGBcIixcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjaGlsZFByb2Nlc3NcbiAgfVxuXG4gIGFzeW5jIGdldFN1Z2dlc3Rpb25zKHJlcXVlc3QpIHtcbiAgICBpZiAoIVBZVEhPTl9SRUdFWC50ZXN0KHJlcXVlc3QucHJlZml4KSkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gc3VwZXIuZ2V0U3VnZ2VzdGlvbnMocmVxdWVzdClcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgZGVidWdnZXJEaXNwb3NlKClcbiAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtzdXBlci5kZWFjdGl2YXRlKCksIHRoaXMuY3JlYXRlVGltZW91dFByb21pc2UoMjAwMCldKVxuICB9XG5cbiAgY3JlYXRlVGltZW91dFByb21pc2UobWlsbGlzZWNvbmRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgU2VydmVyIGZhaWxlZCB0byBzaHV0ZG93biBpbiAke21pbGxpc2Vjb25kc31tcywgZm9yY2luZyB0ZXJtaW5hdGlvbmApXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfSwgbWlsbGlzZWNvbmRzKVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgcHl0aG9uQ2xpZW50ID0gbmV3IFB5dGhvbkxhbmd1YWdlQ2xpZW50KClcbnB5dGhvbkNsaWVudC5jcmVhdGVEZWJ1Z2dlclByb3ZpZGVyID0gY3JlYXRlRGVidWdnZXJQcm92aWRlciAvLyBhZGQgdGhlIGRlYnVnZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IHB5dGhvbkNsaWVudFxuIl19