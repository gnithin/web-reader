export default class ReaderUtils {
    static createNavigableId(s) {
        return `s-${s}`
    }

    static getNumberFromId(s) {
        let comp = s.split("-");
        return comp[comp.length - 1]
    }

    static generateCustomFormatterId(formatterIndex) {
        return `\${${formatterIndex}}`
    }
}