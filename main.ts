import asciidoctor from "@asciidoctor/core";
import {
    MarkdownPostProcessor,
    MarkdownPostProcessorContext,
    Plugin,
} from "obsidian";

export default class AsciiDocBlocks extends Plugin {
    postprocessors: Map<string, MarkdownPostProcessor> = new Map();
    // TODO: Research about @asciidoctor/core types
    converter: any;

    async onload() {
        console.log("Obsidian AsciiDoc Blocks loaded");
        this.converter = asciidoctor();

        const processor = this.registerMarkdownCodeBlockProcessor(
            "asciidoc-table",
            (src, el, ctx) => this.postprocessor("asciidoc-table", src, el, ctx)
        );
        this.postprocessors.set("asciidoc-table", processor);
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
            const output = this.converter.convert(src);
            html.innerHTML = output.toString();

            /**
             * Replace the <pre> tag with asciidoc output.
             */
            const parent = el.parentElement;
            if (parent) {
                parent.addClass(
                    "asciidoc-blocks-parent",
                    `asciidoc-blocks-${type.replace("asciidoc-", "")}-parent`
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
}
