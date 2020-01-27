import Section from './section'
import Utils from 'common/utils';

export default class Article {
    constructor(opts) {
        this.title = opts.title;
        if (!Utils.isNull(opts.sections)) {
            let sectionsList = []
            for (let s of opts.sections) {
                sectionsList.push(new Section(s))
            }
            this.sections = sectionsList;
        }
    }
}