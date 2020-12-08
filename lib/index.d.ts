import { VueConstructor } from 'vue';

// TODO: tiptap extensions

interface defaultOptions {
  floating: boolean,
  bubble: boolean
}

declare class ElementTiptapExtension {
  constructor(options: defaultOptions)
}

declare class Doc extends ElementTiptapExtension {}
declare class Paragraph extends ElementTiptapExtension {}
declare class Text extends ElementTiptapExtension {}
declare class Heading extends ElementTiptapExtension {}
declare class Bold extends ElementTiptapExtension {}
declare class Underline extends ElementTiptapExtension {}
declare class Italic extends ElementTiptapExtension {}
declare class Strike extends ElementTiptapExtension {}
declare class Link extends ElementTiptapExtension {}
declare class Blockquote extends ElementTiptapExtension {}
declare class CodeBlock extends ElementTiptapExtension {}
declare class Code extends ElementTiptapExtension {}
declare class Image extends ElementTiptapExtension {}
declare class Iframe extends ElementTiptapExtension {}
declare class ListItem extends ElementTiptapExtension {}
declare class BulletList extends ElementTiptapExtension {}
declare class OrderedList extends ElementTiptapExtension {}
declare class TodoItem extends ElementTiptapExtension {}
declare class TodoList extends ElementTiptapExtension {}
declare class Table extends ElementTiptapExtension {}
declare class TableHeader extends ElementTiptapExtension {}
declare class TableCell extends ElementTiptapExtension {}
declare class TableRow extends ElementTiptapExtension {}
declare class HardBreak extends ElementTiptapExtension {}
declare class TrailingNode extends ElementTiptapExtension {}
declare class TextAlign extends ElementTiptapExtension {}
declare class Indent extends ElementTiptapExtension {}
declare class LineHeight extends ElementTiptapExtension {}
declare class HorizontalRule extends ElementTiptapExtension {}
declare class History extends ElementTiptapExtension {}
declare class TextColor extends ElementTiptapExtension {}
declare class TextHighlight extends ElementTiptapExtension {}
declare class FontType extends ElementTiptapExtension {}
declare class FontSize extends ElementTiptapExtension {}
declare class FormatClear extends ElementTiptapExtension {}
declare class Fullscreen extends ElementTiptapExtension {}
declare class Print extends ElementTiptapExtension {}
declare class Preview extends ElementTiptapExtension {}
declare class SelectAll extends ElementTiptapExtension {}
declare class CodeView extends ElementTiptapExtension {}

interface OptionsInterface {
  lang?: string;
  spellcheck?: boolean;
}

interface ElementTiptapPluginInterface {
  installed: boolean;
  install (Vue: VueConstructor, options: OptionsInterface): void;
  spellcheck: boolean;
  lang: string;
}

interface MenuBtnComponentOptions {
  component: VueConstructor;
  componentProps?: { [key: string]: any };
  componentEvents?: { [key: string]: any };
}

type MenuBtnViewType = MenuBtnComponentOptions | MenuBtnComponentOptions[];

interface MenuBtnView {
  // TODO: tiptap menuData
  menuBtnView (menuData: any): MenuBtnViewType;
}

declare module 'vue/types/vue' {
  interface Vue {
    $elementTiptapPlugin: ElementTiptapPluginInterface;
  }
}

export { Blockquote, Bold, BulletList, Code, CodeBlock, CodeView, Doc, ElementTiptapPluginInterface, FontSize, FontType, FormatClear, Fullscreen, HardBreak, Heading, History, HorizontalRule, Iframe, Image, Indent, Italic, LineHeight, Link, ListItem, MenuBtnComponentOptions, MenuBtnView, MenuBtnViewType, OptionsInterface, OrderedList, Paragraph, Preview, Print, SelectAll, Strike, Table, TableCell, TableHeader, TableRow, Text, TextAlign, TextColor, TextHighlight, TodoItem, TodoList, TrailingNode, Underline };
