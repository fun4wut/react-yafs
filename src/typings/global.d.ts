import * as ComponentType from "../constants";
import { IBaseProps } from "../instance/base";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ComponentType.File]: IBaseProps,
            [ComponentType.Directory]: IBaseProps
        }
    }
} 