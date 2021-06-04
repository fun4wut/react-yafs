import fs from 'fs-extra'
import { BaseInst } from '../instance/base'

export default class FSContainer {
    constructor(public path: string) {
        fs.ensureDirSync(path)
    }
    topInst: BaseInst
    private async _dumpFS(curr: BaseInst) {
        for (const inst of curr.childrenInst) {
            if (inst instanceof Buffer) {
                fs.writeFile(curr.fullPath, inst)
            } else if (inst instanceof BaseInst) {
                await inst.doCreateSelf(curr.relPath)
                await this._dumpFS(inst)
            }
        }
    }
    async dumpFS() {
        await this.topInst.doCreateSelf('')
        await this._dumpFS(this.topInst)
    }
}