# Obsidian AsciiDoc Blocks Plugin

This is a plugin to render AsciiDoc blocks in Obsidian, initially **focused on tables**. 'Cause markdown tables are so limited!

## Examples

### Headerless table (without grid and frames)

#### Markdown

````markdown
```asciidoc-table
[frame="none", grid="none", cols="^3,^1,^2"]
|===
| 2 × 1 | = | 2
| 2 × 2 | = | 4
| 2 × 3 | = | 6
|===
```
````

#### Result

![](https://raw.githubusercontent.com/juracy/obsidian-asciidoc-blocks/master/images/multiplication-table.png)

### CSV Table

#### Markdown

````markdown
```asciidoc-table
[%header, format=csv]
|===
Artist, Track, Genre
Baauer, Harlem Shake, Hip Hop
The Lumineers, Ho Hey, Folk Rock
|===
```
````

![](https://raw.githubusercontent.com/juracy/obsidian-asciidoc-blocks/master/images/csv-table.png)

### Span lines and columns

#### Markdown

````markdown
```asciidoc-table
|===
| Column 1 | Column 2 | Column 3

3+| colspan="3" - full line

.2+| rowspan="2" - two lines
| Line 2 - Column 2
| Line 2 - Column 3
| Line 3 - Column 2
| Line 3 - Column 3

| Line 4 - Column 1
2.2+| rowspan="2" colspan="2" - two lines and two columns
| Line 5 - Column 1
|===
```
````

![](https://raw.githubusercontent.com/juracy/obsidian-asciidoc-blocks/master/images/span-table.png)

For more information about [AsciiDoc Tables](https://docs.asciidoctor.org/asciidoc/latest/tables/build-a-basic-table/).

## IMPORTANT

At the moment any AsciiDoc feature might work, but there isn't any warranty and support! I hope in the future I could support other features officially!

Maybe I'll restrain `asciidoc-table` for only support tables and create another unsupported block: `asciidoc-raw`.

## Thanks

-   The first inspiration (and some code) came from [Obsidian Admonition](https://github.com/valentine195/obsidian-admonition), thanks @valentine195;
-   So many thanks, @francbreno for introducing me to Obsidian and spending some time discussing the idea of this plugin.
