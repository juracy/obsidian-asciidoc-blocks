import { Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

interface AsciiDocBlocksSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: AsciiDocBlocksSettings = {
	mySetting: "default",
};

export default class AsciiDocBlocks extends Plugin {
	settings: AsciiDocBlocksSettings;

	async onload() {
		await this.loadSettings();
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
