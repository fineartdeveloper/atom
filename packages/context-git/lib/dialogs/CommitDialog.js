/** @babel */

/** @jsx etch.dom */

import Dialog from "./Dialog";
import etch from "etch";

export default class CommitDialog extends Dialog {

	initialState(props) {
		const state = {
			files: props.files || [],
			message: "",
			lastCommit: props.lastCommit || "",
			amend: false,
			push: false,
			sync: false,
			filesSelectable: props.filesSelectable === false ? false : true
		};
		if (state.filesSelectable) {
			state.files = state.files.map(file => {
				file.selected = true;
				return file;
			});
		}
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

		const files = state.files.filter(file => file.selected).map(file => file.file);

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

	fileChange(idx) {
		return (e) => {
			const files = this.state.files.map((file, i) => {
				if (idx === i) {
					file.selected = e.target.checked;
				}
				return file;
			});
			this.update({files});
		};
	}

	body() {

		const files = this.state.files.map((file, idx) => {
			const classes = ["file"];
			if (file.added) {
				classes.push("added");
			}
			if (file.untracked) {
				classes.push("untracked");
			}
			if (file.deleted) {
				classes.push("deleted");
			}
			if (file.changed) {
				classes.push("changed");
			}
			let checkbox = "";
			if (this.state.filesSelectable) {
				checkbox = (
					<input className="native-key-bindings input-checkbox" type="checkbox" tabIndex={idx + 1} checked={file.selected} onchange={this.fileChange(idx)}/>
				);
			}
			return (
				<div className={classes.join(" ")}>
					<label className="input-label">
						{checkbox}
						{file.file}
					</label>
				</div>
			);
		});

		const messageTooLong = this.state.message.split("\n").some((line, idx) => ((idx === 0 && line.length > 50) || line.length > 80));
		const lastCommitLines = this.state.lastCommit !== null ? this.state.lastCommit.split("\n") : null;
		const firstLineOfLastCommit = lastCommitLines !== null ? lastCommitLines[0] + (lastCommitLines.length > 1 ? "..." : "") : null;

		return (
			<div>
				<div className="files" ref="files">
					{files}
				</div>
				<textarea ref="messageInput" placeholder="Commit Message" tabIndex={this.state.files.length + 1} className={`${messageTooLong ? "too-long " : ""}input-textarea message native-key-bindings`} on={{input: this.messageChange}} value={this.state.message} />
				<label className="input-label checkbox-label">
					<input className="native-key-bindings input-checkbox" type="checkbox" tabIndex={this.state.files.length + 2} checked={this.state.amend} on={{change: this.amendChange}} disabled={this.state.lastCommit === null} />
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
				<button className="native-key-bindings btn icon icon-git-commit inline-block-tight" tabIndex={this.state.files.length + 3} on={{click: this.accept}}>
					Commit
				</button>
				<button className="native-key-bindings btn icon icon-repo-push inline-block-tight" tabIndex={this.state.files.length + 4} on={{click: this.pushClick}}>
					Commit & Push
				</button>
				<button className="native-key-bindings btn icon icon-sync inline-block-tight" tabIndex={this.state.files.length + 5} on={{click: this.syncClick}}>
					Commit & Sync
				</button>
			</div>
		);
	}
}
