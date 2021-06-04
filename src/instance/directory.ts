import fs from 'fs-extra'
import path from 'path'
import { BaseInst } from "./base"

export class DirectoryInst extends BaseInst {
    async doCreateSelf(prefix: string) {
        this.appendPath(prefix)
        console.log(`create dir, path: ${this.fullPath}`)
        fs.ensureDir(this.fullPath)
    }
    appendChild(child: BaseInst) {
        console.log('directory append child')
        this.childrenInst.push(child)
    }
}