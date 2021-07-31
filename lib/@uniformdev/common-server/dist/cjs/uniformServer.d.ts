import { Application } from 'express';
import { Logger } from '@uniformdev/common';
import { UniformServerConfig } from '.';
export declare function createUniformServer(logger: Logger, options?: {
    uniformServerConfig?: UniformServerConfig;
}): Promise<Application>;
export declare function attachUniformServicesToServer(server: any, logger: Logger, options?: {
    uniformServerConfig?: UniformServerConfig;
}): void;
export declare function startUniformServer(server: Application, uniformServerConfig: UniformServerConfig, logger: Logger): void;
//# sourceMappingURL=uniformServer.d.ts.map