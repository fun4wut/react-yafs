import fs from 'fs-extra'

export default class FSContainer {
    constructor(public path: string) {
        fs.ensureDirSync(path)
    }
}