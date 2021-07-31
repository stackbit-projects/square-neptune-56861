import { Logger } from '@uniformdev/common';
import { UniformServerConfig } from '.';
export declare function parseUniformServerConfig(env: any, logger: Logger, runtime?: boolean): UniformServerConfig;
export declare function validateUniformServerConfiguration(config: UniformServerConfig): void;
export declare type UniformServerConfigValidator = (config: UniformServerConfig) => boolean | string;
export declare const uniformServerConfigurationValidators: {
    [key: string]: UniformServerConfigValidator;
};
//# sourceMappingURL=parseUniformServerConfig.d.ts.map