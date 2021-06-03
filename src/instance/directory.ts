import fs from 'fs-extra'
import { BaseInst, pathStore } from "./base"

export default class DirectoryInst extends BaseInst {
    async doCreateSelf() {
        pathStore.appendPath(this.props.name)
        fs.ensureDir(pathStore.current)
    }
    appendChild(child: BaseInst) {
        console.log('directory append child')
        this.taskChain = () => child.doCreateSelf().then(child.taskChain)
    }
}