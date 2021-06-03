import React from "react"
import FSContainer from "./container"
import { FSReconciler } from "./reconciler"


const ReactFS = {
    render(element: React.ReactNode, rootPath: string) {
        const rootContainer = new FSContainer(rootPath)
        const newRoot = FSReconciler.createContainer(rootContainer, 0, false, null)
        FSReconciler.updateContainer(element, newRoot, null, () => {})
    }
}

const App = () => (
    <directory name="aes">
        <file name="cbc"/>
    </directory>
)


ReactFS.render(<App />, process.cwd())
// console.log(App())

export default ReactFS