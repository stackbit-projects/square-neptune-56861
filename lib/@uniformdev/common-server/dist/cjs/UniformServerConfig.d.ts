import { UniformConfig } from '@uniformdev/common';
import { UniformServerMode } from '.';
export interface UniformServerConfig extends UniformConfig {
    UNIFORM_API_TOKEN: string;
    UNIFORM_MODE: UniformServerMode;
    UNIFORM_PUBLISH_TEMP_DIR: string;
    UNIFORM_EXPORT_PREFETCH_ENABLED: boolean;
    PORT: string;
    UNIFORM_API_MAPSERVICE: string;
    env: any;
}
//# sourceMappingURL=UniformServerConfig.d.ts.map