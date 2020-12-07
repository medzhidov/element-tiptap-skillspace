// TODO: tiptap extensions

interface defaultOptions {
  floating: boolean,
  bubble: boolean
}

declare class ElementTiptapExtension {
  constructor(options: defaultOptions)
}

export class Doc extends ElementTiptapExtension {}
export class Paragraph extends ElementTiptapExtension {}
export class Text extends ElementTiptapExtension {}
export class Heading extends ElementTiptapExtension {}
export class Bold extends ElementTiptapExtension {}
export class Underline extends ElementTiptapExtension {}
export class Italic extends ElementTiptapExtension {}
export class Strike extends ElementTiptapExtension {}
export class Link extends ElementTiptapExtension {}
export class Blockquote extends ElementTiptapExtension {}
export class CodeBlock extends ElementTiptapExtension {}
export class Code extends ElementTiptapExtension {}
export class Image extends ElementTiptapExtension {}
export class Iframe extends ElementTiptapExtension {}
export class ListItem extends ElementTiptapExtension {}
export class BulletList extends ElementTiptapExtension {}
export class OrderedList extends ElementTiptapExtension {}
export class TodoItem extends ElementTiptapExtension {}
export class TodoList extends ElementTiptapExtension {}
export class Table extends ElementTiptapExtension {}
export class TableHeader extends ElementTiptapExtension {}
export class TableCell extends ElementTiptapExtension {}
export class TableRow extends ElementTiptapExtension {}
export class HardBreak extends ElementTiptapExtension {}
export class TrailingNode extends ElementTiptapExtension {}
export class TextAlign extends ElementTiptapExtension {}
export class Indent extends ElementTiptapExtension {}
export class LineHeight extends ElementTiptapExtension {}
export class HorizontalRule extends ElementTiptapExtension {}
export class History extends ElementTiptapExtension {}
export class TextColor extends ElementTiptapExtension {}
export class TextHighlight extends ElementTiptapExtension {}
export class FontType extends ElementTiptapExtension {}
export class FontSize extends ElementTiptapExtension {}
export class FormatClear extends ElementTiptapExtension {}
export class Fullscreen extends ElementTiptapExtension {}
export class Print extends ElementTiptapExtension {}
export class Preview extends ElementTiptapExtension {}
export class SelectAll extends ElementTiptapExtension {}
export class CodeView extends ElementTiptapExtension {}
