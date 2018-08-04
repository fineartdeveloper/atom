/** @babel */

import gitCmd from "../git-cmd";
import helper from "../helper";
import Notifications from "../Notifications";

export default {
	label: "Add To Last Commit",
	description: "Amend the last commit with the changes",
	confirm: {
		message: "Are you sure you want to add these changes to the last commit?",
		detail: async (filePaths, git = gitCmd) => {
			const root = await helper.getRoot(filePaths, git);
			const lastCommit = await git.lastCommit(root);
			return `You are adding these files:\n${filePaths.join("\n")}\n\nTo this commit:\n${lastCommit}`;
		}
	},
	async command(filePaths, statusBar, git = gitCmd, notifications = Notifications, title = "Add To Last Commit") {
		const [files, root] = await helper.getRootAndFiles(filePaths, git);
		await helper.checkGitLock(root);
		const lastCommit = await git.lastCommit(root);

		if (lastCommit === null) {
			throw "No commits yet";
		}

		// commit files
		statusBar.show("Committing...", null);
		const numFiles = `${files.length} File${files.length !== 1 ? "s" : ""}`;
		const results = [];
		results.push(await git.unstage(root));
		results.push(await git.add(root, filePaths));
		results.push(await git.commit(root, lastCommit, true, filePaths));
		notifications.addGit(title, results);
		helper.refreshAtom(root);
		return {
			title,
			message: `${numFiles} committed.`,
		};
	},
};
