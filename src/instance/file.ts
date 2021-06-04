import fs from 'fs-extra'
import { BaseInst, pathStore } from "./base"

export class FileInst extends BaseInst {
    async doCreateSelf() {
        pathStore.appendPath(this.props.name)
        fs.ensureFileSync(pathStore.current)
    }
    appendChild(child: Buffer) {
        console.log('file append child')
        const childTask = () => fs.writeFile(pathStore.current, child)
        this.localTasks.push(childTask)
    }
}