import { Table as TiptapTable } from 'tiptap-extensions';
import { MenuData } from 'tiptap';
import { TableView } from 'prosemirror-tables/src/tableview';
import { MenuBtnView } from '@/../types';
import TablePopover from '@/components/MenuCommands/TablePopover/index.vue';
// import TableView from "@/components/ExtensionViews/TableView.vue";

export default class Table extends TiptapTable implements MenuBtnView {
  menuBtnView (editorContext: MenuData) {
    return {
      component: TablePopover,
      componentProps: {
        editorContext,
      },
    };
  }

  // get view() {
  //   return TableView;
  // }
}
