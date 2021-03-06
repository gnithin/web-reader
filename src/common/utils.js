export default class Utils {
    static getCurrentUrlParams() {
        return this.getAllUrlParams(window.location.href);
    }

    static getValForKeyFromCurrentUrl(key) {
        var paramsDict = this.getCurrentUrlParams();
        var val = paramsDict[key]
        if (this.isNull(val)) {
            return val
        }
        return decodeURIComponent(val)
    }

    static getAllUrlParams(url) {
        let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        let obj = {};
        if (queryString) {
            queryString = queryString.split('#')[0];
            let arr = queryString.split('&');

            for (let i = 0; i < arr.length; i++) {
                let a = arr[i].split('=');
                if (this.isNull(a) === true || a.length !== 2) {
                    continue
                }
                let paramNum;
                let paramName = a[0].replace(/\[\d*\]/, v => {
                    paramNum = v.slice(1, -1);
                    return '';
                });
                let paramValue = this.isNull(a[1]) === true ? true : a[1];
                paramName = paramName.toLowerCase();
                paramValue = paramValue.toLowerCase();
                if (obj[paramName]) {
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    if (typeof paramNum === 'undefined') {
                        obj[paramName].push(paramValue);
                    } else {
                        obj[paramName][paramNum] = paramValue;
                    }
                } else {
                    obj[paramName] = paramValue;
                }
            }
        }

        return obj;
    }

    static encodeObjectToUrlArgs(data) {
        if (this.isNull(data)) {
            return ""
        }

        var ret = [];
        for (let key in data) {
            ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        return ret.join('&');
    }

    static isNull(obj) {
        return (typeof (obj) === "undefined" || obj === null)
    }

    static isEmptyStr(obj) {
        return (this.isNull(obj) || (typeof obj === "string" && obj.trim() === ""));
    }

} 