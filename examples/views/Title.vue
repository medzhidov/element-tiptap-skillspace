<template>
  <div class="el-tiptap-editor__wrapper">
    <el-tiptap
      lang="en"
      :extensions="extensions"
      :content="content"
    />
  </div>
</template>

<script>
import {
  ElementTiptap,
  Title,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  ListItem,
  BulletList,
  OrderedList,
  TextAlign,
  Indent,
  History,
} from 'element-tiptap';

export default {
  data () {
    return {
      extensions: [
        new Doc({ title: true }),
        new Title(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold(),
        new Underline(),
        new Italic(),
        new Strike(),
        new Code(),
        new TextAlign(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Indent(),
        new History(),
      ],
      content: '<h1>Title Line</h1><p>The body content</p>',
    };
  },
  components: {
    'el-tiptap': ElementTiptap,
  },
};
</script>
