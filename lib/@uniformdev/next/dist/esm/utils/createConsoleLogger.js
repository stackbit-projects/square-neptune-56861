import { createConsoleLogger as createCommonConsoleLogger, parseUniformConfig } from "@uniformdev/common";
import { getNextConfig } from "..";
export function createConsoleLogger() {
    return createCommonConsoleLogger(parseUniformConfig(getNextConfig(), false));
}
//# sourceMappingURL=createConsoleLogger.js.map