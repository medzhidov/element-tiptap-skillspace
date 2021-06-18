import { MenuData, Mark } from 'tiptap';
import { MenuBtnView } from '@/../types';
import CommandButton from '@/components/MenuCommands/CommandButton.vue';
import { MarkSpec, MarkType, Node as ProsemirrorNode } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

export default class Superscript extends Mark implements MenuBtnView {
  get name () {
    return 'superscript';
  }

  get schema(): MarkSpec {
    return {
      attrs: {},
      inline: true,
      group: 'inline',
      parseDOM: [
        {
          tag: 'sup',
        },
      ],
      // @ts-ignore
      toDOM (node: ProsemirrorNode) {
        return ['sup', {}, 0];
      },
    }
  }

  commands ({ type }: { type: MarkType }) {
    return () => toggleMark(type)
  }

  menuBtnView (editorContext: MenuData) {
    return {
      component: CommandButton,
      componentProps: {
        editorContext,
        command: editorContext.commands.superscript,
        icon: 'superscript',
        tooltip: editorContext.t('editor.extensions.Superscript.tooltip'),
      },
    };
  }
}
