<template>
  <span :class="imageViewClass">
    <div
      :class="{
        'image-view__body--focused': selected,
        'image-view__body--resizing': resizing,
      }"
      class="image-view__body"
    >
      <img
        ref="image"
        :src="src"
        :title="node.attrs.title"
        :alt="node.attrs.alt"
        :width="width"
        :height="height"
        class="image-view__body__image"
        @click="selectImage"
      >

      <div
        v-if="view.editable"
        v-show="selected || resizing"
        class="image-resizer"
      >
        <span
          class="image-resizer__handler image-resizer__handler--left"
          @mousedown="onMouseDown($event, 'left')"
        >
        </span>
        <span
          class="image-resizer__handler image-resizer__handler--right"
          @mousedown="onMouseDown($event, 'right')"
        >
        </span>
      </div>

      <!-- when image is break text or float
      bubble menu's position is miscalculated
      use el-popover instead bubble menu -->
      <el-popover
        :value="selected"
        :visible-arrow="false"
        placement="top"
        trigger="manual"
        popper-class="el-tiptap-image-popper"
      >
        <image-bubble-menu
          :node="node"
          :view="view"
          :update-attrs="updateAttrs"
        />

        <div
          slot="reference"
          class="image-view__body__placeholder"
        />
      </el-popover>
    </div>
  </span>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Popover} from 'element-ui';
  import {Node as ProsemirrorNode} from 'prosemirror-model';
  import {NodeSelection} from 'prosemirror-state';
  import {EditorView} from 'prosemirror-view';
  import {ResizeObserver} from '@juggle/resize-observer';
  import {ImageDisplay, resolveImg} from '@/utils/image';
  import {clamp} from '@/utils/shared';
  import ImageBubbleMenu from '../MenuBubble/ImageBubbleMenu.vue';

  const enum ResizeDirection {
    LEFT = 'left',
    RIGHT = 'right',
  }

  const MIN_SIZE = 80;
  const MAX_SIZE = 100000;

  @Component({
    components: {
      [Popover.name]: Popover,
      ImageBubbleMenu,
    },
  })

  export default class ImageView extends Vue {
    @Prop({
      type: ProsemirrorNode,
      required: true,
    })
    readonly node!: ProsemirrorNode;

    @Prop({
      // TODO: EditorView type check failed
      // issue: https://github.com/Leecason/element-tiptap/issues/21#issuecomment-605615966
      type: Object,
      required: true,
    })
    readonly view!: EditorView;

    @Prop({
      type: Function,
      required: true,
    })
    readonly getPos!: Function;

    @Prop({
      type: Function,
      required: true,
    })
    readonly updateAttrs!: Function;

    @Prop({
      type: Boolean,
      required: true,
    })
    readonly selected!: boolean;

    maxSize = {
      width: MAX_SIZE,
      height: MAX_SIZE,
    };

    originalSize = {
      width: 0,
      height: 0,
      aspectRatio: 0
    };

    resizeOb = new ResizeObserver(() => {
      this.getMaxSize();
    });

    resizeDirections = [
      ResizeDirection.LEFT,
      ResizeDirection.RIGHT,
    ];

    resizing = false;

    resizerState = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      dir: '',
    };

    private get src(): string {
      return this.node.attrs.src;
    }

    private get width(): number {
      return this.node.attrs.width;
    }

    private get height(): number {
      return this.node.attrs.height;
    }

    private get display(): ImageDisplay {
      return this.node.attrs.display;
    }

    private get imageViewClass() {
      return [
        'image-view',
        `image-view--${this.display}`,
      ];
    }

    private async created() {
      const result = await resolveImg(this.src);

      if (!result.complete) {
        result.width = MIN_SIZE;
        result.height = MIN_SIZE;
      }

      this.originalSize = {
        width: result.width,
        height: result.height,
        aspectRatio: result.width / result.height
      };

      setTimeout(() => {
        this.updateAttrs({
          height: null
        });
      }, 500);
    }

    private mounted() {
      this.resizeOb.observe(this.view.dom);
    }

    private beforeDestroy() {
      this.resizeOb.disconnect();
    }

    // https://github.com/scrumpy/tiptap/issues/361#issuecomment-540299541
    private selectImage() {
      const {state} = this.view;
      let {tr} = state;
      const selection = NodeSelection.create(state.doc, this.getPos());
      tr = tr.setSelection(selection);
      this.view.dispatch(tr);
    }

    /* invoked when window or editor resize */
    private getMaxSize() {
      const {width} = getComputedStyle(this.view.dom);
      this.maxSize.width = parseInt(width, 10);
    }

    /* on resizer handler mousedown
     * record the position where the event is triggered and resize direction
     * calculate the initial width and height of the image
     */
    private onMouseDown(e: MouseEvent, dir: ResizeDirection): void {
      e.preventDefault();
      e.stopPropagation();

      this.resizerState.x = e.clientX;
      this.resizerState.y = e.clientY;

      const originalWidth = this.originalSize.width;
      const originalHeight = this.originalSize.height;
      const originalAspectRatio = this.originalSize.aspectRatio;

      let {width, height} = this.node.attrs;
      const maxWidth = this.maxSize.width;

      width = width !== null ? width : originalWidth;

      this.resizerState.w = width > maxWidth ? maxWidth : width;
      this.resizerState.h = Math.round(width / originalAspectRatio);
      this.resizerState.dir = dir;

      this.resizing = true;

      this.onEvents();
    }

    private onMouseMove(e: MouseEvent): void {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      const {x, y, w, h, dir} = this.resizerState;

      const aspectRatio = this.originalSize.width;

      const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
      const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

      const newWidth = clamp(w + dx, MIN_SIZE, this.maxSize.width);

      this.updateAttrs({
        width: newWidth
      });
    }

    private onMouseUp(e: MouseEvent): void {
      e.preventDefault();
      e.stopPropagation();
      if (!this.resizing) return;

      this.resizing = false;

      this.resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
      };

      this.offEvents();
      this.selectImage();
    }

    private onEvents(): void {
      document.addEventListener('mousemove', this.onMouseMove, true);
      document.addEventListener('mouseup', this.onMouseUp, true);
    }

    private offEvents(): void {
      document.removeEventListener('mousemove', this.onMouseMove, true);
      document.removeEventListener('mouseup', this.onMouseUp, true);
    }
  };
</script>
