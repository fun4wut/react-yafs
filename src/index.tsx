import React from "react"
import { File, Directory } from "./constants"
import FSContainer from "./container"
import { FSReconciler } from "./reconciler"


const ReactFS = {
    async render(element: React.ReactNode, rootPath: string) {
        const rootContainer = new FSContainer(rootPath)
        const newRoot = FSReconciler.createContainer(rootContainer, 0, false, null)
        FSReconciler.updateContainer(element, newRoot, null, () => {})
        await rootContainer.finalTask()
    }
}

const App = () => (
    <Directory name="aes">
        <File name="cbc">
            abcd1234
        </File>
        <Directory name="rua">

        </Directory>
    </Directory>
)


ReactFS.render(<App />, process.cwd())
// console.log(App())

export default ReactFS