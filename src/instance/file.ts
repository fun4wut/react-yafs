import fs from 'fs-extra'
import path from 'path'
import { BaseInst } from "./base"

export class FileInst extends BaseInst {
    async doCreateSelf(prefix: string) {
        this.appendPath(prefix)
        fs.ensureFile(this.fullPath)
    }
    appendChild(child: Buffer) {
        console.log('file append child')
        this.childrenInst.push(child)
    }
}