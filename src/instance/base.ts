import path from 'path'
import React from 'react';
import FSContainer from "../container";

export interface IBaseProps {
    name: string
    children?: React.ReactNode
}

// 想用做JSX组件，必须拥有props的字段，rootContainer不需要通过props传，所以不放在props里面
// JSX组件需要实现很多React相关的生命周期钩子，这里直接继承React.Component
export abstract class BaseInst<T extends IBaseProps = IBaseProps> {
    constructor(public root: FSContainer, public props: T) {}
        
    get fullPath() {
        return path.join(this.root.path, this.props.name)
    }
    
    abstract doCreateSelf(): void
    abstract appendChild(child: BaseInst | Buffer): void
}