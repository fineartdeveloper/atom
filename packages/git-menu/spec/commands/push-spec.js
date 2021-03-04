/** @babel */

import push from "../../lib/commands/push";
import Notifications from "../../lib/Notifications";
import {getFilePath, statusBar, mockGit, removeGitRoot, createGitRoot, files} from "../mocks";

describe("push", function () {

	beforeEach(async function () {
		await atom.packages.activatePackage("git-menu");
		this.gitRoot = await createGitRoot();

		this.filePaths = getFilePath(this.gitRoot, [files.t1]);
		this.git = mockGit({
			rootDir: Promise.resolve(this.gitRoot),
			push: Promise.resolve("push result"),
		});
	});

	afterEach(async function () {
		await removeGitRoot(this.gitRoot);
	});

	it("should show pushing... in status bar", async function () {
		spyOn(statusBar, "show").and.callThrough();
		await push.command(this.filePaths, statusBar, this.git, Notifications);
		expect(statusBar.show).toHaveBeenCalledWith("Pushing...");
	});

	it("should call git.push", async function () {
		spyOn(this.git, "push").and.callThrough();
		await push.command(this.filePaths, statusBar, this.git, Notifications);
		expect(this.git.push).toHaveBeenCalledWith(this.gitRoot, false);
	});

	it("should show git notification for push results", async function () {
		spyOn(Notifications, "addGit").and.callThrough();
		await push.command(this.filePaths, statusBar, this.git, Notifications);
		expect(Notifications.addGit).toHaveBeenCalledWith("Push", "push result");
	});

	it("should return pushed.'", async function () {
		const ret = await push.command(this.filePaths, statusBar, this.git, Notifications);
		expect(ret.message).toBe("Pushed.");
	});

});
