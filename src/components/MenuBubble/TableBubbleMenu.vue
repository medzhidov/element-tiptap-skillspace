<template>
  <div class="table-bubble-menu">
    <el-tooltip
      :content="et.t('editor.extensions.Table.buttons.add_column_before')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.addColumnBefore"
      >
        <icon name="table-column-add-before" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      :content="et.t('editor.extensions.Table.buttons.add_column_after')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.addColumnAfter"
      >
        <icon name="table-column-add-after" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      :content="et.t('editor.extensions.Table.buttons.delete_column')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.deleteColumn"
      >
        <icon name="table-column-delete" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      effect="dark"
      :content="et.t('editor.extensions.Table.buttons.add_row_before')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.addRowBefore"
      >
        <icon name="table-row-add-before" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      effect="dark"
      :content="et.t('editor.extensions.Table.buttons.add_row_after')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.addRowAfter"
      >
        <icon name="table-row-add-after" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      effect="dark"
      :content="et.t('editor.extensions.Table.buttons.delete_row')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.deleteRow"
      >
        <icon name="table-row-delete" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="enableMergeCells"
      :content="et.t('editor.extensions.Table.buttons.merge_cells')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.mergeCells"
      >
        <icon name="table-merge-cells" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="enableSplitCell"
      :content="et.t('editor.extensions.Table.buttons.split_cell')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.splitCell"
      >
        <icon name="table-split-cells" />
      </div>
    </el-tooltip>

    <el-tooltip
      v-if="isTableActive"
      :content="et.t('editor.extensions.Table.buttons.delete_table')"
      :open-delay="350"
      transition="el-zoom-in-bottom"
      effect="dark"
      placement="top"
    >
      <div
        class="el-tooltip el-tiptap-editor__command-button"
        @click="editorContext.commands.deleteTable"
      >
        <v-icon name="regular/trash-alt" />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator';
  import {MenuData} from 'tiptap';
  import {enableMergeCells, enableSplitCell, isTableActive} from '@/utils/table';
  import Icon from '../icon.vue';
  import VueIcon from 'vue-awesome/components/Icon.js';
  import {Tooltip} from 'element-ui';

  @Component({
    components: {
      Icon,
      'v-icon': VueIcon,
      [Tooltip.name]: Tooltip,
    },
  })
  export default class TableBubbleMenu extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    readonly editorContext!: MenuData;

    @Inject() readonly et!: any;

    private get editor() {
      return this.editorContext.editor;
    }

    private get isTableActive() {
      return isTableActive(this.editor.state);
    }

    private get enableMergeCells() {
      return enableMergeCells(this.editor.state);
    }

    private get enableSplitCell() {
      return enableSplitCell(this.editor.state);
    }
  };
</script>

<style lang="scss">
  .table-bubble-menu {
    display: flex;
  }
</style>
