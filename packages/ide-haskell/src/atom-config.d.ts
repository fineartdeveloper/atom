export {}
// generated by typed-config.js
declare module 'atom' {
  interface ConfigValues {
    'ide-haskell.onSavePrettify': boolean
    'ide-haskell.onSavePrettifyFormats.source*c2hs': boolean
    'ide-haskell.onSavePrettifyFormats.source*cabal': boolean
    'ide-haskell.onSavePrettifyFormats.source*hsc2hs': boolean
    'ide-haskell.onSavePrettifyFormats.source*haskell': boolean
    'ide-haskell.onSavePrettifyFormats.text*tex*latex*haskell': boolean
    'ide-haskell.onSavePrettifyFormats.source*hsig': boolean
    'ide-haskell.onSavePrettifyFormats': {
      'source*c2hs': boolean
      'source*cabal': boolean
      'source*hsc2hs': boolean
      'source*haskell': boolean
      'text*tex*latex*haskell': boolean
      'source*hsig': boolean
    }
    'ide-haskell.switchTabOnCheck': boolean
    'ide-haskell.switchTabOnCheckInterval': number
    'ide-haskell.expressionTypeInterval': number
    'ide-haskell.onCursorMove': 'Show Tooltip' | 'Hide Tooltip' | 'Nothing'
    'ide-haskell.messageDisplayFrontend': 'builtin' | 'linter'
    'ide-haskell.stylishHaskellPath': string
    'ide-haskell.stylishHaskellArguments': string[]
    'ide-haskell.cabalPath': string
    'ide-haskell.startupMessageIdeBackend': boolean
    'ide-haskell.panelPosition': 'bottom' | 'left' | 'right' | 'center'
    'ide-haskell.buttonsPosition': 'top' | 'left'
    'ide-haskell.hideParameterValues': boolean
    'ide-haskell.autoHideOutput': boolean
    'ide-haskell': {
      onSavePrettify: boolean
      'onSavePrettifyFormats.source*c2hs': boolean
      'onSavePrettifyFormats.source*cabal': boolean
      'onSavePrettifyFormats.source*hsc2hs': boolean
      'onSavePrettifyFormats.source*haskell': boolean
      'onSavePrettifyFormats.text*tex*latex*haskell': boolean
      'onSavePrettifyFormats.source*hsig': boolean
      onSavePrettifyFormats: {
        'source*c2hs': boolean
        'source*cabal': boolean
        'source*hsc2hs': boolean
        'source*haskell': boolean
        'text*tex*latex*haskell': boolean
        'source*hsig': boolean
      }
      switchTabOnCheck: boolean
      switchTabOnCheckInterval: number
      expressionTypeInterval: number
      onCursorMove: 'Show Tooltip' | 'Hide Tooltip' | 'Nothing'
      messageDisplayFrontend: 'builtin' | 'linter'
      stylishHaskellPath: string
      stylishHaskellArguments: string[]
      cabalPath: string
      startupMessageIdeBackend: boolean
      panelPosition: 'bottom' | 'left' | 'right' | 'center'
      buttonsPosition: 'top' | 'left'
      hideParameterValues: boolean
      autoHideOutput: boolean
    }
  }
}
