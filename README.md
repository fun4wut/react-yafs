# React-FS
使用React语法（JSX）来描述文件目录结构

举个例子🌰
```jsx
const App = () => (
    <Directory name="aes">
        <Directory name="mmp">
            <File name="poke" />
        </Directory>
        <File name="cbc">
            abcd1234
        </File>
        <Directory name="rua" />
    </Directory>
)

ReactFS.render(<App />, process.cwd())
```

将会在 `./aes` 中创建如下的结构
```
❯ tree aes
aes
├── cbc
├── mmp
│   └── poke
└── rua

2 directories, 2 files
```
其中 `./aes/cbc` 中内容即为 `abcd1234`

## 知识点
- Component, Element, Instances三者之间的关系
  - Instance是实际渲染中，渲染出来的东西（类比于DOM元素）
  - Element是一个JS对象，通过 type、props等字段来去表示这个元素（类比于vDOM）
  - Component是React组件，他通过 `React.createElement` 或者JSX语法，创建一个Element并返回
- JSX组件，标签的resolve方式
  - 标签的type就是一个字符串，则被认为是原生组件，直接 `createInstance` 创造实例，**如果标签首字母是小写，那么也认为它是字符串（这种情况就像字面量，不需要定义，直接用）**
  - 标签的type是 `Function`（函数组件） 或者 `Class`（类组件），这时候React会再递归地寻找对应组件的实现，直到找到原生组件为止
- Instance创建顺序：**从里往外进行创建**

## 难点
- Reconciler的config，配置项很多
  > 大部分不需要，直接返个空函数、null即可，把泛型参数填上去有利于理解各个参数的类型与作用
- 文件的实例用什么表示？
  > 文件新建了就是直接存在硬盘上了，没有handle
- 创建顺序问题
  > 因为是从里往外创建，里层元素在创建的时候，是拿不到外层元素的路径的，所以不能在创建元素的时候新建文件，而是把创建动作存在来，和外层元素的创建动作连在一起【从尾巴向头部拼接链表】，形成一个Promise链，当到达根元素时，再执行整个Promise，这个时候文件新建的顺序就是正向的了
- Promise并发问题
  > 一个目录下可能会有多个文件，这种情况下，Promise链的拼接就成了问题，需要要避免同级的Promise链被顶掉

## 另外的实现思路
- [x] append Child时什么也不做，等到准备render的时候再从顶层往下正向的创建，这样做比较简单
- [ ] create Instance时真的创建文件（使用 `memfs` 来减轻IO负担），等到append Child时，再把文件移到正确的位置，最后render时dump出来（通过 `unionfs` ）