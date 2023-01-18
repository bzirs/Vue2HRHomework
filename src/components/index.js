
const install = Vue => {
  const comText = require.context('./', true, /\.vue$/)

  // console.log(comText.keys())

  comText.keys().forEach(t => {
    // console.log(t)
    const comObj = comText(t).default
    // console.log(comObj)

    // 可选链运算法判断组件是否有name 无name不进行注册
    const name = comObj?.name

    name && Vue.component(name, comObj)
  })
}

export default {
  install
}
