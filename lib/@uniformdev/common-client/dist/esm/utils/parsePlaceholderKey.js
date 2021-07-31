import { trimEnd } from '@uniformdev/common';
export function parsePlaceholderKey(key) {
    if (key === '/') {
        return '/';
    }
    key = key.trim();
    key = key.toLowerCase();
    key = trimEnd(key, '/');
    key = key || 'main';
    return key;
}
//# sourceMappingURL=parsePlaceholderKey.js.map