'use babel';

var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var jsonfile = require('jsonfile');

const ATOM_PATH = path.dirname(atom.getUserInitScriptPath());

var spawn = require(ATOM_PATH + '/node_modules/spawn-please');

var foopath = lib('classes/CommandManager.js');

async function child_process(command, args = null) {
  const child = await spawn(command, args);

  if (child.stderror) {
    return {
      error: true,
      message: child.stderror,
    };
  }

  return {
    error: false,
    message: child.stdout,
  };
}

function compileFile(editor) {
  var editor = (typeof editor !== 'undefined') ? editor : atom.workspace.getActiveTextEditor();
  var editor_path;

  if (typeof editor !== 'undefined') {
    editor_path = editor.getPath() || false;
    // editor_path = '/Volumes/Storage/www/reproduction-galleries.com/httpdocs/new/resources/scss/app.scss';

    if (editor_path !== false) {
      var child = child_process('cat', [
        editor_path,
      ]).then((e) => {
        if (e.message) {
          var head = e.message.split("\n")[0];
          var head_vars = head;

          head_vars = head_vars.replace(new RegExp(/^\/\/\s+/), '');
          head_vars = head_vars.split(',');
          head_vars = _.map(head_vars, (str) => {
            str = _.map(_.trim(str).split(': '), (str2) => {
              return _.trim(str2);
            });

            var response = {};
            response[str[0]] = str[1];

            return response;
          });

          var is_auto = _.findLast(head_vars, (value) => {
            if (typeof value.auto === 'undefined' || value.auto !== 'true') {
              return false;
            }

            return true;
          });

          if (typeof is_auto !== 'undefined') {
            atom.commands.dispatch(atom.views.getView(editor), 'sass-autocompile:compile-to-file');
          }
        }
      });
    }
  }
}

function requireFresh(filepath) {
  if (typeof require.cache[filepath] !== 'undefined') {
    delete require.cache[filepath];
  }

  module.loaded = false;

  return module.exports = eval(fs.readFileSync(filepath).toString());
  // return module.exports = require(module);
}

Object.assign(global, {
  requireFresh: requireFresh,
});

var CommandManager = requireFresh(foopath);

function lib(...paths) {
  if (typeof paths === 'undefined') {
    return;
  }

  return path.join(ATOM_PATH, 'lib', paths.join('/'));
}

function atom_initialize() {
  console.log(arguments);
  return this;
}

function atom_get_editors(only_active = false) {
  if (only_active) {
    return atom.workspace.getActiveTextEditor();
  }

  return atom.workspace.getTextEditors();
}

function willDispatchReplConsole() {
  var editor = atom.workspace.getActiveTextEditor();

  Object.assign(global, {
    ReplConsole: {
      projectDir: atom.project.resolvePath('./'),
      workingDir: path.dirname(editor.getPath()),
    },
  });
}

Object.assign(global, {
  willDispatchReplConsole,
});


class ProviderManager {
  constructor() {
    atom.commands.add('atom-text-editor', 'awesome:select-line', function() {
      var editor = atom.workspace.getActiveTextEditor();

      editor.mutateSelectedText((selection, index) => {
        if (!selection.isEmpty()) {
          selection.clear();
        }

        atom.commands.dispatch(atom.views.getView(editor), 'editor:select-line');

        var selectedText = selection.getText();
        var selectedLength = selectedText.length;
        var startLength = selectedLength - selectedText.trimLeft().length;
        var endLength = selectedLength - selectedText.trimRight().length;
        var trimLength = startLength + endLength;

        editor.selectLeft();
        editor.moveToFirstCharacterOfLine();
        editor.selectRight(selectedLength - trimLength);
      });
    });

    atom.commands.add('atom-text-editor', 'awesome:cut-select-line', function() {
      var editor = atom.workspace.getActiveTextEditor();

      editor.mutateSelectedText((selection, index) => {
        if (!selection.isEmpty()) {
          selection.clear();
        }

        atom.commands.dispatch(atom.views.getView(selection.cursor.editor), 'editor:select-line');

        var selectedText = selection.getText();
        var selectedLength = selectedText.length;
        var startLength = selectedLength - selectedText.trimLeft().length;
        var endLength = selectedLength - selectedText.trimRight().length;
        var trimLength = startLength + endLength;

        selection.cursor.editor.selectLeft();
        selection.cursor.editor.moveToFirstCharacterOfLine();
        selection.cursor.editor.selectRight(selectedLength - trimLength);

        selection.cursor.editor.cutSelectedText();
        selection.cursor.editor.deleteLine();
      });
    });

    atom.commands.add('atom-text-editor', 'awesome:copy-select-line', function() {
      var editor = atom.workspace.getActiveTextEditor();

      editor.mutateSelectedText((selection, index) => {
        if (!selection.isEmpty()) {
          selection.clear();
        }

        atom.commands.dispatch(atom.views.getView(selection.cursor.editor), 'editor:select-line');

        var selectedText = selection.getText();
        var selectedLength = selectedText.length;
        var startLength = selectedLength - selectedText.trimLeft().length;
        var endLength = selectedLength - selectedText.trimRight().length;
        var trimLength = startLength + endLength;

        selection.cursor.editor.selectLeft();
        selection.cursor.editor.moveToFirstCharacterOfLine();
        selection.cursor.editor.selectRight(selectedLength - trimLength);

        selection.cursor.editor.copySelectedText();
      });
    });
  }

  register(provider) {
    const disposable = new CompositeDisposable();
    const providerId = provider ? provider.id : '';

    if (providerId) {
      disposable.add(operatorConfig.add(providerId, provider));
      disposable.add(
        atom.config.observe(providerId, (value) => {
          return operatorConfig.updateConfigWithAtom(providerId, value);
        })
      );
    }

    // Unregister provider from providerManager
    return disposable;
  }
};

// console.log(new ProviderManager());

var AppModule, ModuleService;

AppModule = (function () {
  ModuleService = function () {
    Object.assign(ModuleService, Properties);
    Object.assign(ModuleService.prototype, Prototype);
  }

  var Properties = {
    activeEditor: null,
    activeEditorBasename: null,
    activeEditorElement: null,
    activeEditorPath: null,
    activeEditorView: null,
    activeProjectPath: null,
    listeners: [],
  };

  var Prototype = {
    getActiveTextEditor: function () {
      var editor = atom.workspace.getActiveTextEditor();

      if (typeof editor === 'undefined') {
        return;
      }

      if (editor.isMini()) {
        return;
      }

      return editor;
    },

    isSCSS: function () {
      if (typeof ModuleService.activeEditorPath !== 'undefined') {
        const extname = path.extname(ModuleService.activeEditorPath).substr(1).toUpperCase();

        return (extname === 'SCSS' || extname === 'SASS' || extname === 'LESS') ? true : false;
      }

      return false;
    },

    registerEditor: function (editor = null) {
      if (typeof editor === 'undefined' || !editor) {
        editor = atom.workspace.getActiveTextEditor();
      }

      if (typeof editor !== 'undefined' && typeof editor.isMini !== 'undefined') {
        var editorElement, editorBasename, editorPath, editorView, projectPath, listeners = [];

        if (!editor.isMini()) {
          if (typeof editor.getPath() === 'undefined') {
            return;
          }

          editorElement = editor.getElement() || undefined;
          editorBasename = path.basename(editor.getPath()) || undefined;
          editorPath = editor.getPath() || undefined;
          editorView = atom.views.getView(editorElement) || undefined;
          projectPath = atom.project.rootDirectories[0] || undefined;
          projectPath = projectPath.getPath() || undefined;

          var packageFilePath = path.resolve(ATOM_PATH, 'package.json');
          var packageJson = jsonfile.readFileSync(packageFilePath);

          if (typeof packageJson !== 'undefined' && _.isObject(packageJson)) {
            packageJson.activeEditorPath = editorPath || null;
            packageJson.activeProjectPath = projectPath || null;

            jsonfile.writeFileSync(packageFilePath, packageJson);
          }

          editor.onDidSave(function (e) {
            const extname = path.extname(e.path).substr(1).toUpperCase();
            is_scss = (extname === 'SCSS' || extname === 'SASS' || extname === 'LESS') ? true : false;
          
            if (is_scss === true) {
              var editor =  atom.workspace.getActiveTextEditor();

              if (typeof editor !== 'undefined') {
                compileFile(editor);
              }
            }
          });

          ModuleService.activeEditor = editor;
          ModuleService.activeEditorBasename = editorBasename;
          ModuleService.activeEditorElement = editorElement;
          ModuleService.activeEditorPath = editorPath;
          ModuleService.activeEditorView = editorView;
          ModuleService.activeProjectPath = projectPath;

          return {
            activeEditor: ModuleService.activeEditor,
            activeEditorBasename: ModuleService.activeEditorBasename,
            activeEditorElement: ModuleService.activeEditorElement,
            activeEditorPath: ModuleService.activeEditorPath,
            activeEditorView: ModuleService.activeEditorView,
            activeProjectPath: ModuleService.activeProjectPath,
          };
        }
      }

      return;
    },
  };

  return new ModuleService();
})();

Object.assign(global, {
  AppModule,
});

// atom.packages.onDidActivateInitialPackages(atom_initialize);

atom.loadState().then(function () {
  return atom.workspace.getActiveTextEditor();
}).then(function (editor) {
  if (typeof editor !== 'undefined') {
    return AppModule.registerEditor(editor);
  }
  return;
}).then(function (data) {
  if (typeof data !== 'undefined') {
    Object.assign(AwesomeEditor, data);
  }
});

atom.workspace.onDidChangeActiveTextEditor(function (e) {
  var data = AppModule.registerEditor(e);

  if (typeof data !== 'undefined') {
    Object.assign(AwesomeEditor, data);
    // console.log(AppModule.isSCSS());
  }
});

module.exports = {
  ProviderManager: new ProviderManager(),
  atom_initialize: new atom_initialize(),
};