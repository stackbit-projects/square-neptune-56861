import { Logger } from '@uniformdev/common';
import { UniformServerConfig } from '../UniformServerConfig';
export declare function attachPreviewMiddleware(server: any, uniformConfig: UniformServerConfig, logger: Logger): void;
export declare function getPreviewMiddleware(uniformConfig: UniformServerConfig, logger: Logger): (req: any, res: any) => Promise<void>;
//# sourceMappingURL=previewMiddleware.d.ts.map