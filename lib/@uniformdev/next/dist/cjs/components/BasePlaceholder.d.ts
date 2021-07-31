import React from 'react';
import { Component } from './Component';
import { UniformOptions } from '@uniformdev/common-client';
import { Logger } from '@uniformdev/common';
export declare class BasePlaceholder extends Component<{
    placeholderKey: string;
}> {
    private logger;
    private options;
    placeholderKey: string;
    components: any;
    constructor(props: any, components: any, logger: Logger, options: UniformOptions);
    render(): React.FunctionComponentElement<{}>;
}
//# sourceMappingURL=BasePlaceholder.d.ts.map