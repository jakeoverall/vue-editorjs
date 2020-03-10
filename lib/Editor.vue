<template>
  <div class="vue-editorjs">
    <div :id="props.holderId" />
  </div>
</template>

<script>
import {
  createComponent,
  reactive,
  onMounted,
  watch
} from "@vue/composition-api";
import EditorJS from "@editorjs/editorjs";
import { useTools } from "./utils";

export default createComponent({
  name: "vue-editor-js",
  props: {
    holderId: {
      type: String,
      default: () => "codex-editor-" + Math.floor(Math.random() * 999999),
      required: false
    },
    autofocus: { type: Boolean, default: false },
    initData: { type: Object, default: () => {} },
    config: { type: Object, default: () => {} },
    exclude: { type: Array, default: () => [] }
  },
  setup: (props, context) => {
    const state = reactive({ editor: null });

    function initEditor(props) {
      destroyEditor();

      const { holderId: holder, autofocus, initData: data, config } = props;
      console.log(config);
      const tools = useTools(props, config);

      state.editor = new EditorJS({
        holder,
        autofocus,
        data,
        tools,
        onReady: () => context.emit("ready"),
        onChange: () => context.emit("change")
      });
    }

    function destroyEditor() {
      if (state.editor) {
        state.editor.destroy();
        state.editor = null;
      }
    }

    function save() {
      if (!state.editor) {
        return;
      }

      state.editor
        .save()
        .then(result => context.emit("save", result))
        .catch(err => console.error(err));
    }

    onMounted(_ => initEditor(props));

    watch(
      _ => props.initData,
      _ => initEditor
    );

    return { props, state, save };
  }
});
</script>
