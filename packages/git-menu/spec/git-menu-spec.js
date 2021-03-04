/** @babel */

import commands from "../lib/commands";
import config from "../lib/config";
import main from "../lib/main";
import {mockGit, createGitRoot, getFilePath, files} from "./mocks";
import fs from "fs";
import path from "path";

describe("Git Menu", function () {
	beforeEach(async function () {
		atom.project.setPaths([__dirname]);
		await atom.packages.activatePackage("git-menu");
		this.configOptions = atom.config.getAll("git-menu")[0].value;
		this.configConfirmationDialogs = Object.keys(this.configOptions.confirmationDialogs);
		this.configContextMenuItems = Object.keys(this.configOptions.contextMenuItems);
		this.allConfig = Object.keys(this.configOptions);
		this.allCommands = atom.commands
			.findCommands({target: atom.views.getView(atom.workspace)})
			.map(cmd => cmd.name)
			.filter(cmd => cmd.startsWith("git-menu:"));
		this.getContextMenuItems = () => atom.contextMenu.itemSets
			.filter(itemSet => itemSet.selector === "atom-workspace, atom-text-editor, .tree-view, .tab-bar")
			.map(itemSet => itemSet.items[0].submenu[0].command);
		this.confirmSpy = spyOn(atom, "confirm");
	});

	describe("Config", function () {
		Object.keys(config).forEach(configOption => {
			it(`has a config option: ${configOption}`, function () {
				expect(this.allConfig).toContain(configOption);
			});
		});
	});

	describe("Commands", function () {
		Object.keys(commands).forEach(command => {
			const cmd = `git-menu:${command}`;
			const {label, confirm, description, command: func} = commands[command];
			const dispatch = main.dispatchCommand(command, commands[command]);
			describe(command, function () {
				beforeEach(function () {
					this.cmdSpy = spyOn(commands[command], "command").and.callFake(() => Promise.reject());
				});
				it("should have a command in the command pallete", function () {
					expect(this.allCommands).toContain(cmd);
				});
				it("should have a command", function () {
					expect(func).toEqual(jasmine.any(Function));
				});
				if (label) {
					it("should have a config option to disable it in the context menu", function () {
						expect(this.configContextMenuItems).toContain(command);
					});
					it("should have a description", function () {
						expect(description).toBeTruthy();
					});
					it("should have a context menu item", function () {
						expect(this.getContextMenuItems()).toContain(cmd);
					});
					it("should not have a context menu item when unchecked", function () {
						atom.config.set(`git-menu.contextMenuItems.${command}`, false);
						expect(this.getContextMenuItems()).not.toContain(cmd);
					});
				} else {
					it("should not have a config option to disable it in the context menu", function () {
						expect(this.configContextMenuItems).not.toContain(command);
					});
					it("should not have a context menu item", function () {
						expect(this.getContextMenuItems()).not.toContain(cmd);
					});
				}

				if (confirm) {
					it("should have a config option to disable the confirm dialog", function () {
						expect(this.configConfirmationDialogs).toContain(command);
					});
					it("should have a confirm message", function () {
						expect(confirm.message).toEqual(jasmine.any(String));
					});
					if (confirm.detail) {
						it("should return a string detail", async function () {
							const gitRoot = await createGitRoot();
							const filePaths = getFilePath(gitRoot, [files.t1]);
							const git = mockGit();
							let {detail} = confirm;
							if (typeof detail === "function") {
								detail = await detail(filePaths, git);
							}
							expect(detail).toEqual(jasmine.any(String));
						});
					}
					it("should be called if atom.confirm returns true", async function () {
						this.confirmSpy.and.callFake((opts, callback) => {
							if (callback) {
								callback(0, false);
							} else {
								return 0;
							}
						});
						await dispatch({target: atom.views.getView(atom.workspace)});
						expect(this.confirmSpy).toHaveBeenCalled();
						expect(this.cmdSpy).toHaveBeenCalled();
					});
					it("should not be called if atom.confirm is canceled", async function () {
						this.confirmSpy.and.callFake((opts, callback) => {
							if (callback) {
								callback(1, false);
							} else {
								return 2;
							}
						});
						await dispatch({target: atom.views.getView(atom.workspace)});
						expect(this.confirmSpy).toHaveBeenCalled();
						expect(this.cmdSpy).not.toHaveBeenCalled();
					});
				} else {
					it("should not have a config option to disable the confirm dialog", function () {
						expect(this.configConfirmationDialogs).not.toContain(command);
					});
					it("should not call atom.confirm but should call the command", async function () {
						await dispatch({target: atom.views.getView(atom.workspace)});
						expect(this.confirmSpy).not.toHaveBeenCalled();
						expect(this.cmdSpy).toHaveBeenCalled();
					});
				}
			});
		});

		describe("command files", function () {
		// eslint-disable-next-line no-sync
			fs.readdirSync(path.resolve(__dirname, "../lib/commands")).map(file => {
				describe(file, function () {
					it("should be in commands.js", function () {
						const command = file.replace(/.js$/, "");
						expect(command in commands).toBe(true);
					});
				});
			});
		});
	});
});
