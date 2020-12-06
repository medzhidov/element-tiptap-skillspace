import { Extension, MenuData } from 'tiptap';
import { MenuBtnView } from '@/../types';
import { PREVIEW_WINDOW_WIDTH } from '@/constants';
import PreviewCommandButton from '@/components/MenuCommands/PreviewCommandButton.vue';

export default class Preview extends Extension implements MenuBtnView {
  get name (): string {
    return 'preview';
  }

  get defaultOptions (): { contentWidth: string } {
    return {
      contentWidth: PREVIEW_WINDOW_WIDTH,
    };
  }

  menuBtnView (editorContext: MenuData) {
    return {
      component: PreviewCommandButton,
      componentProps: {
        editorContext,
        contentWidth: this.options.contentWidth,
      },
    };
  }
}
