import path from 'path'
import React from 'react';
import FSContainer from "../container";

export interface IBaseProps {
    name: string
    children?: React.ReactNode
}


export const pathStore = new class {
    current = ''
    appendPath(newPath: string) {
        this.current = path.join(this.current, newPath)
    }
}

// 想用做JSX组件，必须拥有props的字段，rootContainer不需要通过props传，所以不放在props里面
export abstract class BaseInst<T extends IBaseProps = IBaseProps> {
    constructor(public root: FSContainer, public props: T) {
        this.appendChild = this.appendChild.bind(this)
        this.doCreateSelf = this.doCreateSelf.bind(this)
    }
    localTasks: Array<Task> = []
    abstract doCreateSelf(): Promise<void>
    abstract appendChild(child: BaseInst | Buffer): void
}