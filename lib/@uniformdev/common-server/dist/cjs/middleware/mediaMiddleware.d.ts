import { Logger } from '@uniformdev/common';
import { UniformServerConfig } from '../UniformServerConfig';
export declare function attachMediaMiddleware(server: any, uniformConfig: UniformServerConfig, logger: Logger): void;
export declare function getMediaMiddleware(uniformConfig: UniformServerConfig, logger: Logger): (req: any, res: any) => Promise<void>;
//# sourceMappingURL=mediaMiddleware.d.ts.map