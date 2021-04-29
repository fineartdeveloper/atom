import { MAIN_MENU_LABEL, getEventType, isTEventRangeType } from '../utils'
import { PluginManager } from '../plugin-manager'
import { consume, FeatureSet } from './consume'
import * as UPI from 'atom-haskell-upi'
import * as AtomTypes from 'atom'
import CompositeDisposable = AtomTypes.CompositeDisposable
type TextEditor = AtomTypes.TextEditor
type TEventRangeType = UPI.TEventRangeType

export function instance(
  pluginManager: PluginManager,
  options: UPI.IRegistrationOptions,
  featureSet: FeatureSet,
): UPI.IUPIInstance {
  const pluginName = options.name
  const disposables = new CompositeDisposable()
  const messageProvider = pluginManager.resultsDB.registerProvider(
    options.messageTypes !== undefined ? Object.keys(options.messageTypes) : [],
  )
  disposables.add(messageProvider)
  disposables.add(consume(pluginManager, options, featureSet))

  return {
    setMenu(name: string, menu: ReadonlyArray<AtomTypes.MenuOptions>) {
      const menuDisp = atom.menu.add([
        {
          label: MAIN_MENU_LABEL,
          submenu: [{ label: name, submenu: menu }],
        },
      ])
      disposables.add(menuDisp)
      return menuDisp
    },
    setStatus(status: UPI.IStatus) {
      return pluginManager.forceBackendStatus(pluginName, status)
    },
    setMessages(messages: UPI.IResultItem[]) {
      messageProvider.setMessages(messages)
    },
    async addMessageTab(name: string, opts: UPI.ISeverityTabDefinition) {
      return pluginManager.outputPanel.createTab(name, opts)
    },
    async showTooltip({
      editor,
      eventType,
      detail,
      tooltip,
    }: UPI.IShowTooltipParams) {
      if (eventType === undefined) {
        eventType = getEventType(detail)
      }
      return pluginManager.tooltipManager.showTooltip(editor, eventType, {
        pluginName,
        tooltip,
      })
    },
    addPanelControl<T>(def: UPI.TControlDefinition<T>) {
      return pluginManager.outputPanel.addPanelControl(def)
    },
    addConfigParam<T>(paramName: string, spec: UPI.IParamSpec<T>) {
      return pluginManager.configParamManager.add(pluginName, paramName, spec)
    },
    async getConfigParam<T>(name: string): Promise<T | undefined> {
      return pluginManager.configParamManager.get<T>(pluginName, name)
    },
    async getOthersConfigParam<T>(
      plugin: string,
      name: string,
    ): Promise<T | undefined> {
      return pluginManager.configParamManager.get<T>(plugin, name)
    },
    async setConfigParam<T>(name: string, value?: T): Promise<T | undefined> {
      return pluginManager.configParamManager.set<T>(pluginName, name, value)
    },
    getEventRange(editor: TextEditor, typeOrDetail: TEventRangeType | Object) {
      let type: TEventRangeType
      if (isTEventRangeType(typeOrDetail)) {
        type = typeOrDetail
      } else {
        type = getEventType(typeOrDetail)
      }
      const controller = pluginManager.controller(editor)
      if (!controller) {
        return undefined
      }
      return controller.getEventRange(type)
    },
    dispose() {
      disposables.dispose()
    },
  }
}
