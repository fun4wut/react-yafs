import fs from 'fs-extra'
import { BaseInst } from "./base"

export default class FileInst extends BaseInst {
    doCreateSelf() {
        fs.ensureFile(this.fullPath)
    }
    appendChild(child: Buffer) {
        console.log('file append child')
        fs.appendFileSync(this.fullPath, child)
    }
}