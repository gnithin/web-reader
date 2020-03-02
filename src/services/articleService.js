import Article from 'models/article'
import articleData from 'constants/article'

export default class ArticleService {
    static fetchDataSource() {
        return new Promise((resolve, reject) => {
            resolve(new Article(articleData));
        })
    }
}