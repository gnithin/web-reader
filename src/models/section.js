import SubSection from './subSection'
import Utils from 'common/utils';

export default class Section {
    constructor(opts) {
        this.title = opts.title;
        this.number = opts.number;

        if (!Utils.isNull(opts.sub_sections)) {
            let subSectionsList = []
            for (let ss of opts.sub_sections) {
                subSectionsList.push(new SubSection(ss))
            }
            this.subSections = subSectionsList;
        }
    }
}