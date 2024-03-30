/** @babel */

/** @jsx etch.dom */

import Dialog from "./Dialog";
import etch from "etch";
import FileTree from "../widgets/FileTree.js";

export default class CommitDialog extends Dialog {

	initialState(props) {
		const state = {
			files: props.files || [],
			message: localStorage.getItem("git-menu.commit-message") || "",
			lastCommit: props.lastCommit || "",
			amend: false,
			push: false,
			sync: false,
			filesSelectable: props.filesSelectable === false ? false : true,
			treeView: props.treeView,
		};
		return state;
	}

	validate(state) {
		let error = false;
		if (!state.message) {
			error = true;
			this.refs.messageInput.classList.add("error");
		}
		if (error) {
			return;
		}

		const files = this.refs.fileTree.getSelectedFiles();

		return [
			state.message,
			state.amend,
			state.push,
			state.sync,
			files,
		];
	}

	show() {
		this.refs.messageInput.focus();
	}

	messageChange(e) {
		this.refs.messageInput.classList.remove("error");
		localStorage.setItem("git-menu.commit-message", e.target.value);
		this.update({message: e.target.value});
	}

	amendChange(e) {
		let {message} = this.state;
		const amend = e.target.checked;
		if (!message && amend) {
			message = this.state.lastCommit;
		} else if (message === this.state.lastCommit && !amend) {
			message = "";
		}
		this.update({message, amend});
	}

	pushClick() {
		this.update({push: true});
		this.accept();
	}

	syncClick() {
		this.update({push: true, sync: true});
		this.accept();
	}

	body() {
		const messageTooLong = this.state.message.split("\n").some((line, idx) => ((idx === 0 && line.length > 50) || line.length > 80));
		const lastCommitLines = this.state.lastCommit !== null ? this.state.lastCommit.split("\n") : null;
		const firstLineOfLastCommit = lastCommitLines !== null ? lastCommitLines[0] + (lastCommitLines.length > 1 ? "..." : "") : null;

		return (
			<div>
				<FileTree ref="fileTree" files={this.state.files} showCheckboxes={this.state.filesSelectable} tabIndexStart="1" treeView={this.state.treeView} />
				<textarea ref="messageInput" placeholder="Commit Message" tabIndex={1001} className={`${messageTooLong ? "too-long " : ""}input-textarea message native-key-bindings`} on={{input: this.messageChange}} value={this.state.message} />
				<label className="input-label checkbox-label">
					<input className="native-key-bindings input-checkbox" type="checkbox" tabIndex={1002} checked={this.state.amend} on={{change: this.amendChange}} disabled={this.state.lastCommit === null} />
					Amend Last Commit: <span className="last-commit">{firstLineOfLastCommit !== null ? firstLineOfLastCommit : ""}</span>
				</label>
			</div>
		);
	}

	title() {
		return "Commit";
	}

	buttons() {
		return (
			<div>
				<button className="native-key-bindings btn icon icon-git-commit inline-block-tight" tabIndex={1003} on={{click: this.accept}}>
					Commit
				</button>
				<button className="native-key-bindings btn icon icon-repo-push inline-block-tight" tabIndex={1004} on={{click: this.pushClick}}>
					Commit & Push
				</button>
				<button className="native-key-bindings btn icon icon-sync inline-block-tight" tabIndex={1005} on={{click: this.syncClick}}>
					Commit & Sync
				</button>
			</div>
		);
	}
}
