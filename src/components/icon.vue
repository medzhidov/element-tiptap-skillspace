<template>
  <div class="el-tiptap-editor__icon" v-html="icon"></div>
</template>

<script lang="ts">
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator';
  import icons from "@/utils/icons";

  @Component({})
  export default class Icon extends Vue {
    @Prop({
      type: String,
      required: true,
    })
    readonly name!: string;

    private get icon(): string {
      return icons[this.name];
    }
  }
</script>
