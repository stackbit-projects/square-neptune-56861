import getConfig from 'next/config';
import { throwException } from '@uniformdev/common';
export function getNextConfig() {
    return (getConfig() || throwException('config')).publicRuntimeConfig || throwException('throwException');
}
//# sourceMappingURL=getNextConfig.js.map