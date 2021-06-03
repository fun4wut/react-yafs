import { IBaseProps } from "../instance/base";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            file: IBaseProps,
            directory: IBaseProps
        }
    }
} 