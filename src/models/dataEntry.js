export default class DataEntry {
    constructor(opts) {
        this.title = opts.title;
        this.contents = opts.contents;
        this.parent = opts.parentId;
        this.tags = opts.tags;
    }
}
