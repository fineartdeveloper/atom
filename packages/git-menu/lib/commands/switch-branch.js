/** @babel */

import gitCmd from "../git-cmd";
import helper from "../helper";
import Notifications from "../Notifications";
import SwitchBranchDialog from "../dialogs/SwitchBranchDialog";

export default {
	label: "Switch Branch...",
	description: "Checkout a different branch",
	async command(filePaths, statusBar, git = gitCmd, notifications = Notifications, dialog = SwitchBranchDialog, title = "Switch Branch") {
		const root = await helper.getRoot(filePaths, git);
		await helper.checkGitLock(root);

		const branches = await git.branches(root);
		const [branchName, remote] = await new dialog({branches, root}).activate();

		statusBar.show("Switching Branch...");

		await helper.checkGitLock(root);
		const result = remote
			? await git.createBranch(root, branchName, remote)
			: await git.checkoutBranch(root, branchName);
		notifications.addGit(title, result);

		helper.refreshAtom(root);
		return {
			title,
			message: `Switched to ${branchName}.`,
		};
	},
};
