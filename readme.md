# vue-editorjs

```html
<template>
  <div>
    <editor 
      :exclude="excludedTools" 
      :config="{ ...config, ...customTools }" 
      :init-data="" 
      holder-id="" 
      ref="editor"
      autofocus
      @change=""
      @ready=""
    />
  </div>
</template>

<script>
export default {
  name: ""
  data() {
    return {
      excludedTools: ["header", "marker"],
      config: {
        image:{
          // OVERRIDE DEFAULT CONFIG HERE IF NOT A CUSTOM TOOL
        }
      },
      cutomTools:{
        audio:{
          class: AudioEditor, // REQUIRED FOR ALL CUSTOM TOOLS
          config: {
            // YOUR CONFIG HERE
          }
        }
      }
    }
  },
  methods:{
    async save(){
      let data = await this.$refs.editor.save()
    }
  }
}
</script>
```