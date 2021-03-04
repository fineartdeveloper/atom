{CompositeDisposable} = require 'atom'
CSON = require 'season'
GrammarHelper = require './grammar-helper'

module.exports =

  subscriptions: null
  debug: false

  activate: (state) ->
    # Fix dockerignore conflicts with https://atom.io/packages/language-docker
    languageDockerPackage = atom.packages.getAvailablePackageNames().find (name) -> name is 'language-docker'
    if languageDockerPackage?
      customFileTypes = atom.config.get 'core.customFileTypes'
      if not customFileTypes?
        customFileTypes = 'text.ignore': ['.dockerignore']
        atom.config.set 'core.customFileTypes', customFileTypes
        atom.grammars.removeGrammarForScopeName('source.dockerignore')
        console.log 'Desactivate syntax highlighting for "source.dockerignore" from https://atom.io/packages/language-docker.'
      else if not customFileTypes['text.ignore']?
        customFileTypes['text.ignore'] = ['.dockerignore']
        atom.config.set 'core.customFileTypes', customFileTypes
        atom.grammars.removeGrammarForScopeName('source.dockerignore')
        console.log 'Desactivate syntax highlighting for "source.dockerignore" from https://atom.io/packages/language-docker.'
      else
        dockerIgnoreExtension = customFileTypes['text.ignore'].find (ext) -> ext is '.dockerignore'
        if not dockerIgnoreExtension?
          customFileTypes['text.ignore'].push('.dockerignore')
          atom.config.set 'core.customFileTypes', customFileTypes
          atom.grammars.removeGrammarForScopeName('source.dockerignore')
          console.log 'Desactivate syntax highlighting for "source.dockerignore" from https://atom.io/packages/language-docker.'

    return unless atom.inDevMode() and not atom.inSpecMode()

    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'ignore:compile-grammar-and-reload': => @compileGrammar()

  compileGrammar: ->
    return unless atom.inDevMode() and not atom.inSpecMode()

    helper = new GrammarHelper '../grammars/repositories/', '../grammars/'

    # gitignore base
    promiseIgnore = helper.readGrammarFile 'ignore.cson'
      .then (rootGrammar) ->
        rootGrammar.name = 'Ignore File (gitignore syntax)'
        rootGrammar.scopeName = 'text.ignore'
        rootGrammar.fileTypes = [
          'gitignore'
          'npmignore'
          'coffeelintignore'
          'dockerignore'
          'atomignore'
          'vscodeignore'
          'eslintignore'
          'prettierignore'
        ]
        partialGrammars = [
          '/symbols/negate-symbols.cson'
          '/symbols/basic-symbols.cson'
          '/lines/negate.cson'
          '/lines/directory.cson'
          '/lines/file.cson'
        ]
        helper.appendPartialGrammars rootGrammar, partialGrammars
          .then =>
            if @debug then console.log CSON.stringify rootGrammar
            helper.writeGrammarFile rootGrammar, 'language-ignore.cson'

    # slugignore
    promiseSlugIgnore = helper.readGrammarFile 'ignore.cson'
      .then (rootGrammar) ->
        rootGrammar.name = 'Ignore File for Slug compiler (gitignore syntax)'
        rootGrammar.scopeName = 'text.ignore.slugignore'
        rootGrammar.fileTypes = [
          'slugignore'
        ]
        partialGrammars = [
          '/symbols/negate-illegal-symbols.cson'
          '/symbols/basic-symbols.cson'
          '/lines/negate.cson'
          '/lines/directory.cson'
          '/lines/file.cson'
        ]
        helper.appendPartialGrammars rootGrammar, partialGrammars
          .then =>
            if @debug then console.log CSON.stringify rootGrammar
            helper.writeGrammarFile rootGrammar, 'language-ignore-slug.cson'

    # hgignore
    promiseSlugIgnore = helper.readGrammarFile 'ignore.cson'
      .then (rootGrammar) ->
        rootGrammar.name = 'Ignore File for Mecurial'
        rootGrammar.scopeName = 'text.ignore.hgignore'
        rootGrammar.fileTypes = [
          'hgignore'
        ]
        partialGrammars = [
          '/symbols/negate-illegal-symbols.cson'
          '/symbols/basic-symbols.cson'
          '/lines/negate.cson'
          '/lines/directory.cson'
          '/lines/file.cson'
        ]
        helper.appendPartialGrammars rootGrammar, partialGrammars
          .then =>
            if @debug then console.log CSON.stringify rootGrammar
            helper.writeGrammarFile rootGrammar, 'language-ignore-mercurial.cson'

    Promise.all [promiseIgnore, promiseSlugIgnore]
      .then ->
        atom.commands.dispatch 'body', 'window:reload'

    deactivate: ->
      @subscriptions.dispose()
