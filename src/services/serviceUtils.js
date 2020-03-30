export default class ServiceUtils {
    static formatRawParentData(rawData) {
        // A little data re-organizing
        let data = rawData.parent;
        data.children = rawData.children;
        return data;
    }
}
