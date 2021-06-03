# React-FS
使用React语法（JSX）来描述文件目录结构

## 知识点
- Component, Element, Instances三者之间的关系
  - Instance是实际渲染中，渲染出来的东西（类比于DOM元素）
  - Element是一个JS对象，通过 type、props等字段来去表示这个元素（类比于vDOM）
  - Component是React组件，他通过 `React.createElement` 或者JSX语法，创建一个Element并返回
- JSX组件，标签的resolve方式
  - 标签的type就是一个字符串，则被认为是原生组件，直接 `createInstance` 创造实例，*如果标签首字母是小写，那么也认为它是字符串（这种情况就像字面量，不需要定义，直接用）*
  - 标签的type是 `Function`（函数组件） 或者 `Class`（类组件），这时候React会再递归地寻找对应组件的实现，直到找到原生组件为止