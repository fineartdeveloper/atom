'use babel';
/*!
 * XAtom Debug
 * Copyright(c) 2017 Williams Medina <williams.medinaa@gmail.com>
 * MIT Licensed
 */
import { parse } from 'path';
import { EventEmitter } from 'events';
import { get } from 'lodash';
const { CompositeDisposable } = require('atom');
import { createGroupButtons, createButton, createIcon, createIconFromPath, createText, createElement, createSelect, createOption, insertElement, attachEventFromObject } from '../element/index';
export class ToolbarView {
    constructor(options) {
        this.subscriptions = new CompositeDisposable();
        this.events = new EventEmitter();
        this.element = createElement('xatom-debug-toolbar');
        // create schemes
        this.scheme = {
            icon: createIconFromPath(''),
            name: createText('')
        };
        // create scheme path
        this.schemePath = {
            name: createText('Current File'),
            select: createSelect({
                change: (value) => this.setPathName(value)
            }, [])
        };
        this.runButton = createButton({
            click: () => {
                this.events.emit('didRun');
            }
        }, [
            createIcon('run')
        ]);
        this.stopButton = createButton({
            disabled: true,
            click: () => {
                this.events.emit('didStop');
            }
        }, [
            createIcon('stop')
        ]);
        this.logoElement = createIcon('logo');
        this.toggleLogo(false);
        atom.config['observe']('xatom-debug.showToolbarIcon', (value) => this.toggleLogo(value));
        insertElement(this.element, this.logoElement);
        insertElement(this.element, this.runButton);
        insertElement(this.element, this.stopButton);
        insertElement(this.element, createGroupButtons([
            createButton({
                className: 'bugs-scheme'
            }, [
                createIcon('atom'),
                this.schemePath.name,
                createIcon('arrow-down'),
                this.schemePath.select,
                createElement('div', {
                    className: 'bugs-scheme-arrow'
                })
            ]),
            createButton({
                click: () => {
                    this.events.emit('didOpenScheme');
                }
            }, [
                this.scheme.icon,
                this.scheme.name
            ])
        ]));
        // status
        this.statusLoadingElement = createElement('div', {
            className: 'bugs-status-loading'
        });
        this.statusTextElement = createElement('span', {
            elements: [createText('Not Started')]
        });
        insertElement(this.element, createElement('bugs-scheme-status', {
            // className: 'form-control',
            elements: [
                this.statusLoadingElement,
                this.statusTextElement
            ]
        }));
        // toggle panes
        let toggleButtons = createGroupButtons([
            createButton({
                tooltip: {
                    subscriptions: this.subscriptions,
                    title: 'Toggle Console'
                },
                click: () => this.events.emit('didToggleConsole')
            }, [createIcon('panel-bottom')]),
            createButton({
                tooltip: {
                    subscriptions: this.subscriptions,
                    title: 'Toggle Debug Area'
                },
                click: () => this.events.emit('didToggleDebugArea')
            }, [createIcon('panel-right')])
        ]);
        toggleButtons.classList.add('bugs-toggle-buttons');
        insertElement(this.element, toggleButtons);
        attachEventFromObject(this.events, [
            'didRun',
            'didStop',
            'didChangePath',
            'didOpenScheme',
            'didToggleDebugArea',
            'didToggleConsole'
        ], options);
    }
    toggleAtomTitleBar(value) {
        let titleBar = document.querySelector('atom-panel .title-bar');
        if (get(titleBar, 'nodeType', false) && titleBar.parentNode) {
            titleBar.parentNode.style.display = value ? null : 'none';
        }
    }
    displayAsTitleBar() {
        this.toggleAtomTitleBar(false);
        this.element.classList.add('bugs-title-bar');
    }
    displayDefault() {
        this.toggleAtomTitleBar(true);
        this.element.classList.remove('bugs-title-bar');
    }
    didRun(cb) {
        this.events.on('didRun', cb);
    }
    didStop(cb) {
        this.events.on('didStop', cb);
    }
    didToggleConsole(cb) {
        this.events.on('didToggleConsole', cb);
    }
    didToggleDebugArea(cb) {
        this.events.on('didToggleDebugArea', cb);
    }
    setStatusLoading(value) {
        this.statusLoadingElement.classList[value ? 'add' : 'remove']('active');
    }
    resetStatus() {
        this.statusTextElement.innerHTML = '';
        return insertElement(this.statusTextElement, createText('Not Started'));
    }
    setStatus(text, iconName) {
        this.statusTextElement.innerHTML = '';
        let schemeName = get(this.scheme, 'name.nodeValue', '');
        if (schemeName.length > 0) {
            schemeName = `${schemeName}:`;
        }
        let contents = [createText(`${schemeName} ${text}`)];
        if (iconName) {
            contents.unshift(createIcon(iconName));
        }
        return insertElement(this.statusTextElement, contents);
    }
    toggleLogo(state) {
        this.logoElement.style.display = state ? null : 'none';
    }
    setPathName(pathName) {
        this.activePath = pathName;
        let baseName = parse(pathName).base;
        this.schemePath.name.nodeValue = ` ${baseName}`;
        // this.setStatusText(`Not Running`)
        this.events.emit('didChangePath', pathName);
    }
    getPathName() {
        return this.activePath;
    }
    toggleRun(status) {
        this.stopButton['disabled'] = status;
        this.runButton['disabled'] = !status;
        this.isRunning = !status;
    }
    setScheme(plugin) {
        // set element icon bg
        this.scheme.icon.style.backgroundImage = `url(${plugin.iconPath})`;
        // set element scheme name
        this.scheme.name.nodeValue = ` ${plugin.name}`;
    }
    setPaths(paths) {
        // clear old list
        this.schemePath.select.innerHTML = '';
        // add new paths
        paths.forEach((p, index) => {
            // activate first
            if (index === 0) {
                this.setPathName(p);
            }
            // insert option to path select
            insertElement(this.schemePath.select, createOption(parse(p).base, p));
        });
    }
    getElement() {
        return this.element;
    }
    destroy() {
        this.toggleAtomTitleBar(true);
        this.element.remove();
        this.subscriptions.dispose();
    }
}
//# sourceMappingURL=toolbar-view.js.map