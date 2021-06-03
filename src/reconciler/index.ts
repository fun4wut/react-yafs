import ReactReconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import { ComponentType } from '../constants'
import { BaseInst } from '../instance/base'
import DirectoryInst from '../instance/directory'
import FileInst from '../instance/file'
import FSContainer from '../container'

export const FSReconciler = ReactReconciler<
    ComponentType, // type
    any, // props
    FSContainer, // container
    BaseInst, // instance
    Buffer, // text instance
    any, // suspense instance
    any, // hydratable instance
    any, // public instance
    any, // host context
    any, // update payload
    any, // child set
    any, // timeout handle
    any // no timeout
>({
    appendInitialChild(parent, child) {
        parent.appendChild(child)
    },
    createInstance(type, props, rootContainer) {
        console.log(`Create instance, type is ${type}`)
        switch (type) {
            case ComponentType.FILE:
                return new FileInst(rootContainer, props)

            case ComponentType.DIRECTORY:
                return new DirectoryInst(rootContainer, props)

            default:
                throw new Error("Unrecognized Component");
        }
    },
    createTextInstance(text) {
        return Buffer.from(text, 'utf-8')
    },
    getPublicInstance(inst) {
        return inst
    },
    getRootHostContext() { 
        return emptyObject 
    },
    getChildHostContext() { 
        return emptyObject 
    },
    appendChild(parent, child) {
        parent.appendChild(child)
    },
    clearContainer(container) {
        
    },
    appendChildToContainer(_container, child) {
        if (child instanceof BaseInst) {
            child.doCreateSelf() // 最顶部的元素，它不会执行appendInitialChild，所以需要在这里执行创建操作
        }
    },
    now: Date.now,
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,
    isPrimaryRenderer: true,
    cancelTimeout() {},
    finalizeInitialChildren() { return false },
    prepareForCommit() { return null },
    prepareUpdate() { return null },
    noTimeout() {},
    queueMicrotask() {},
    preparePortalMount() {},
    shouldSetTextContent() { return false },
    scheduleTimeout() {},
    resetAfterCommit() {},
})