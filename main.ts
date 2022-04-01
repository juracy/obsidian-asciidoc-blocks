import {
    MarkdownPostProcessor,
    MarkdownPostProcessorContext,
    Plugin,
} from "obsidian";

// Remember to rename these classes and interfaces!

interface AsciiDocBlocksSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: AsciiDocBlocksSettings = {
    mySetting: "default",
};

export default class AsciiDocBlocks extends Plugin {
    settings: AsciiDocBlocksSettings;
    postprocessors: Map<string, MarkdownPostProcessor> = new Map();

    async onload() {
        console.log("Obsidian AsciiDoc Blocks loaded");
        await this.loadSettings();
        this.app.workspace.onLayoutReady(async () => {
            const processor = this.registerMarkdownCodeBlockProcessor(
                "asciidoc-table",
                (src, el, ctx) =>
                    this.postprocessor("asciidoc-table", src, el, ctx)
            );
            this.postprocessors.set("asciidoc-table", processor);
            // TODO: Command?
        });
    }

    async postprocessor(
        type: string,
        src: string,
        el: HTMLElement,
        ctx?: MarkdownPostProcessorContext
    ) {
        console.log(`Obsidian AsciiDoc Blocks: ${type}`);

        try {
            const html = createEl("div");
            // TODO: Temporary hard coded result
            html.innerHTML = `
            <table class="tableblock frame-none grid-none data-line-2" style="width: 20%;">
<colgroup>
<col style="width: 50%;">
<col style="width: 16.6666%;">
<col style="width: 33.3334%;">
</colgroup>
<tbody>
<tr>
<td class="tableblock halign-center valign-top"><p class="tableblock">2 × 1</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">=</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">2</p></td>
</tr>
<tr>
<td class="tableblock halign-center valign-top"><p class="tableblock">2 × 2</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">=</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">4</p></td>
</tr>
<tr>
<td class="tableblock halign-center valign-top"><p class="tableblock">2 × 3</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">=</p></td>
<td class="tableblock halign-center valign-top"><p class="tableblock">6</p></td>
</tr>
</tbody>
</table>`;

            /**
             * Replace the <pre> tag with asciidoc output.
             */
            const parent = el.parentElement;
            if (parent) {
                parent.addClass(
                    "asciidoc-block-parent",
                    `asciidoc-block-${type.replace("asciidoc-", "")}-parent`
                );
            }
            el.replaceWith(html);
            return html;
        } catch (e) {
            console.error(e);
            const pre = createEl("pre");

            pre.createEl("code", {
                attr: {
                    style: `color: var(--text-error) !important`,
                },
            }).createSpan({
                text:
                    "There was an error rendering the asciidoc-block:" +
                    "\n\n" +
                    src,
            });

            el.replaceWith(pre);
        }
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
