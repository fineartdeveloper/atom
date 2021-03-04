/** @babel */

import gitCmd from "../git-cmd";
import helper from "../helper";
import Notifications from "../Notifications";

export default {
	label: "Initialize",
	description: "Inizialize a git repo",
	async command(filePaths, statusBar, git = gitCmd, notifications = Notifications, title = "Initialize") {
		const roots = atom.project.getPaths().filter(dir => (!!dir && filePaths.some(filePath => filePath.startsWith(dir))));
		if (roots.length === 0) {
			throw "No project directory.";
		}

		statusBar.show("Initializing...");
		const results = await Promise.all(roots.map(root => git.init(root)));
		notifications.addGit(title, results);
		atom.project.setPaths(atom.project.getPaths());
		roots.forEach(root => {
			helper.refreshAtom(root);
		});
		return {
			title,
			message: `Git folder${results.length > 1 ? "s" : ""} initialized.`,
		};
	},
};
