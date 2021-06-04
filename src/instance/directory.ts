import fs from 'fs-extra'
import { concatTask, concurrentTasks } from '../utils/task'
import { BaseInst, pathStore } from "./base"

export class DirectoryInst extends BaseInst {
    async doCreateSelf() {
        console.log('?:', this)
        pathStore.appendPath(this.props.name)
        fs.ensureDir(pathStore.current)
    }
    appendChild(child: BaseInst) {
        console.log('directory append child')
        // 拿到子元素的task，并拼接
        const childTask = concatTask(child.doCreateSelf, concurrentTasks(child.localTasks))
        this.localTasks.push(childTask)
    }
}