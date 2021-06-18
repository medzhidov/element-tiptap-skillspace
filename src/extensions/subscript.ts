import { Extension, MenuData } from 'tiptap';
import { MenuBtnView } from '@/../types';
import CommandButton from '@/components/MenuCommands/CommandButton.vue';
import { CommandFunction } from 'tiptap-commands';
import { clearMarks } from '@/utils/format_clear';
import { Bold as TiptapBold } from 'tiptap-extensions';

export default class Subscript extends TiptapBold implements MenuBtnView {
  menuBtnView ({ isActive, commands, t }: MenuData) {
    return {
      component: CommandButton,
      componentProps: {
        command: commands.bold,
        isActive: isActive.bold(),
        icon: 'subscript',
        tooltip: t('editor.extensions.Bold.tooltip'),
      },
    };
  }
}
