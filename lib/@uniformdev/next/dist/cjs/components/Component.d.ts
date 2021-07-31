import React from 'react';
import { RenderingContext } from '@uniformdev/common-client';
export declare class Component<T = void, TS = any> extends React.Component<T & {
    renderingContext: RenderingContext;
}, TS> {
    /**
     *
     */
    constructor(props: T & {
        renderingContext: RenderingContext;
    });
    get renderingContext(): RenderingContext;
}
//# sourceMappingURL=Component.d.ts.map