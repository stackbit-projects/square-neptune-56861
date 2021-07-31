import { trim } from '@uniformdev/common';
export function getPageUrl(itemPath, type, config) {
    var sitename = config.UNIFORM_API_SITENAME;
    var path = trim(itemPath, '/');
    if (!path) {
        path = '';
    }
    var url = '/uniform/api/content/' + sitename + '/';
    if (path) {
        url += type + '/' + path + '.json';
    }
    else {
        url += type + '.json';
    }
    return (config.UNIFORM_API_URL + url).toLowerCase();
}
//# sourceMappingURL=getPageUrl.js.map