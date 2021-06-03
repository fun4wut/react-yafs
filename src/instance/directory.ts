import fs from 'fs-extra'
import { BaseInst } from "./base"

export default class DirectoryInst extends BaseInst {
    doCreateSelf() {
        fs.ensureDir(this.fullPath)
    }
    appendChild(child: BaseInst) {
        console.log('directory append child')
        child.doCreateSelf()
    }
}