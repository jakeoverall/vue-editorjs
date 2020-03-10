export const PLUGINS = {
  header: require('@editorjs/header'),
  list: require('@editorjs/list'),
  image: require('@editorjs/image'),
  inlineCode: require('@editorjs/inline-code'),
  embed: require('@editorjs/embed'),
  quote: require('@editorjs/quote'),
  marker: require('@editorjs/marker'),
  code: require('@editorjs/code'),
  link: require('@editorjs/link'),
  delimiter: require('@editorjs/delimiter'),
  raw: require('@editorjs/raw'),
  table: require('@editorjs/table'),
  warning: require('@editorjs/warning'),
  paragraph: require('@editorjs/paragraph'),
  checklist: require('@editorjs/checklist')
}

export function useTools(props, config) {
  let plugins = { ...PLUGINS }
  if (props.exclude && Array.isArray(props.exclude)) {
    props.exclude.forEach(k => delete plugins[k])
  }

  Object.keys(config).forEach(k => {
    let toolConfig = config[k]
    if (toolConfig.class) {
      plugins[k] = toolConfig
      return
    }

    plugins[k] = { class: PLUGINS[k], ...toolConfig }
  })

  return plugins
}
