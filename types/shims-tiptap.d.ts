declare module 'tiptap' {
  import { Schema, Node as ProsemirrorNode, NodeSpec, NodeType, MarkSpec, MarkType, ParseOptions } from 'prosemirror-model';
  import { Plugin, EditorState, Transaction } from 'prosemirror-state';
  import { EditorView, EditorProps } from 'prosemirror-view';
  import { VueConstructor } from 'vue';
  import { Command, CommandFunction } from 'tiptap-commands';

  const EditorContent: VueConstructor;
  const EditorMenuBar: VueConstructor;
  const EditorFloatingMenu: VueConstructor;
  const EditorMenuBubble: VueConstructor;

  interface NodeView {
    node?: ProsemirrorNode;
    updateAttrs?: (attrs: { [key: string]: any }) => any;
    view?: EditorView;
    options?: { [key: string]: any };
    selected?: boolean;
  }

  type CommandGetter =
    ({ [key: string]: (() => Command) | Command }) |
    (() => Command) | Command | (() => Command)[];

  class Extension<Options = any> {
    constructor (options?: Options);
    private _name?: string;
    // @ts-ignore
    public get name(): string {
        return this._name;
    }
    // @ts-ignore
    public set name(value: string) {
        this._name = value;
    }

    private _defaultOptions?: Options;
    // @ts-ignore
    public get defaultOptions(): Options {
        return this._defaultOptions;
    }
    // @ts-ignore
    public set defaultOptions(value: Options) {
        this._defaultOptions = value;
    }
    options?: Options;
    update?: (view: EditorView) => any;
    private _plugins?: Plugin[];
    // @ts-ignore
    get plugins(): Plugin[] {
      return this._plugins;
    }
    // @ts-ignore
    set plugins(value: Plugin[]) {
      this._plugins = value;
    }
    commands? ({ schema, attrs } : { schema: Schema | NodeSpec | MarkSpec, attrs?: { [key: string]: string }}): CommandGetter;
    inputRules? ({ schema }: { schema: Schema }): any[];
    parseRules? ({ schema }: { schema: Schema }): Plugin[];
    keys? ({ schema }: { schema: Schema | NodeSpec | MarkSpec }): { [keyCombo: string]: CommandFunction };
    [key: string]: any
  }

  class Node<V extends NodeView = any> extends Extension {
    private _schema?: NodeSpec;
    // @ts-ignore
    set schema(value: NodeSpec) {
      this._schema = value;
    }
    // @ts-ignore
    get schema(): NodeSpec {
      return this._schema;
    }
    private _view?: { new(): V };
    // @ts-ignore
    set view(value: { new(): V }) {
      this._view = value;
    }
    // @ts-ignore
    get view(): { new(): V } {
      return this._view;
    }
    commands? ({ type, schema, attrs } : { type: NodeType, schema: NodeSpec, attrs?: { [key: string]: string }}): CommandGetter;
    inputRules? ({ type, schema }: { type: NodeType, schema: Schema }): any[];
    parseRules? ({ type, schema }: { type: NodeType, schema: Schema }): Plugin[];
    keys? ({ type, schema }: { type: NodeType, schema: NodeSpec }): { [keyCombo: string]: CommandFunction };
  }

  class Mark<V extends NodeView = any> extends Extension {
    // @ts-ignore
    set schema(value: MarkSpec);
    // @ts-ignore
    get schema(): MarkSpec;
    // @ts-ignore
    get view(): { new(): V };
    // @ts-ignore
    set view(value: { new(): V });
    commands? ({ type, schema, attrs } : { type: MarkType, schema: MarkSpec, attrs?: { [key: string]: string }}): CommandGetter;
    inputRules? ({ type, schema }: { type: MarkType, schema: Schema }): any[];
    parseRules? ({ type, schema }: { type: MarkType, schema: Schema }): Plugin[];
    keys? ({ type, schema }: { type: MarkType, schema: MarkSpec }): { [keyCombo: string]: CommandFunction };
  }

  class Doc extends Node {}
  class Paragraph extends Node {}
  class Text extends Node {}

  interface EditorCommandSet {
    [key: string]: Command;
  }

  interface IsActiveChecker {
    [name: string]: () => boolean;
  }

  interface MenuData {
    focused: boolean;
    focus: () => void;
    commands: EditorCommandSet;
    isActive: IsActiveChecker;
    getMarkAttrs: (markName: string) => { [attributeName: string]: any };
    editor: Editor;
    t: Function;
    [key: string]: any;
  }

  interface EditorUpdateEvent {
    state: EditorState;
    getHTML: () => string;
    getJSON: () => object;
    transaction: Transaction;
  }

  interface EditorOptions {
    editorProps?: EditorProps;
    editable?: boolean;
    autoFocus?: boolean;
    extensions?: (Extension | Node | Mark)[];
    content?: Object | string;
    emptyDocument?: {
      type: 'doc',
      content: [{
        type: 'paragraph',
      }],
    };
    useBuiltInExtensions?: boolean;
    disableInputRules?: boolean;
    disablePasteRules?: boolean;
    dropCursor?: {};
    parseOptions?: ParseOptions;
    injectCSS?: boolean;
    onInit?: ({ view, state }: { view: EditorView, state: EditorState }) => void;
    onTransaction?: (event: EditorUpdateEvent) => void;
    onUpdate?: (event: EditorUpdateEvent) => void;
    onFocus?: ({ event, state, view }: { event: FocusEvent, state: EditorState, view: EditorView }) => void;
    onBlur?: ({ event, state, view }: { event: FocusEvent, state: EditorState, view: EditorView }) => void;
    onPaste?: (...args: any[]) => void;
    onDrop?: (...args: any[]) => void;
  }

  class ExtensionManager {
    constructor (extensions: Extension[], editor: Editor);
    extensions: Extension[];
    nodes: Node[];
    marks: Mark[];
    options: {[extensionName: string]: any };
    plugins: Plugin[];
    keymaps ({ schema }: { schema: Schema }): any[];
    inputRules ({ schema, excludedExtensions }: { schema: Schema, excludedExtensions: Extension[] }): any[];
    parstRules({ schema, excludedExtensions }: { schema: Schema, excludedExtensions: Extension[] }): any[];
    commands ({ schema, view }: { schema: Schema, view: EditorView }): any;
  }

  class Editor {
    commands: { [key: string]: Command };
    defaultOptions: { [key:string]: any };
    element: Element;
    extensions: ExtensionManager;
    inputRules: any[];
    keymaps: any[];
    marks: Mark[];
    nodes: Node[];
    pasteRules: any[];
    plugins: Plugin[];
    schema: Schema;
    state: EditorState;
    view: EditorView;
    activeMarks: { [markName: string]: () => boolean };
    activeNodes: { [nodeName: string]: () => boolean };
    activeMarkAttrs: { [markName: string]: { [attr: string]: any }};

    constructor (options?: EditorOptions);
    setContent (content?: string | object, emitUpdate?: boolean): void;
    clearContent (emitUpdate?: boolean): void;
    setOptions (options: EditorOptions): void;
    registerPlugin (plugin: Plugin): void;
    getJSON (): {};
    getHTML (): string;
    focus (): void;
    blur (): void;
    destroy (): void;
    on (event: string, callbackFn: (params: any) => void): void;
    off (event: string, callbackFn: (params: any) => void): void;
    getMarkAttrs (markName: string): { [attr: string]: any };
  }
}
