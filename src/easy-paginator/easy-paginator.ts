export class EasyPaginator {
    page = 1;
    offset: number;
    limit: number;
    count: number;
    lastPage: number;

    constructor(dataSource: PaginatorDataSource = {}) {
        this.init(dataSource)
    }

    private init(dataSource) {
        dataSource = Object.assign(defaultPaginatorConfig(), dataSource)
        const { limit, count } = dataSource
        this.lastPage = this.getLastPage(count, limit)
        this.page = this.getPage(dataSource)
        this.offset = this.getOffsetOf(this.page, limit)
    }

    getPage({offset, limit, count}) {
        const lastPage = this.getLastPage(count, limit)
        const unFixedPage = this.getUnfixedPage(offset, limit)
        return this.getFixedPage(unFixedPage, lastPage);
    }

    private getUnfixedPage(offset: number, limit: number) {
        const firstItemShown = offset + 1;      
        return Math.ceil(firstItemShown / limit)
    }

    private getLastPage(count: number, limit) {
        return Math.ceil(count / limit)
    }

    private pageIsInHighLimit(page, lastPage) {
        return page <= lastPage
    }

    private getFixedPage(page, lastPage) {        
        if(!this.pageIsInHighLimit(page, lastPage)) {
            return lastPage;
        } else if(page <= 1) {
            return 1;
        }
        return page;
    }

    private getOffsetOf(page, limit) {
        return (page - 1) * limit;
    }
}

function defaultPaginatorConfig(): PaginatorDataSource {
    return {
        offset: 0,
        limit: 10,
        count: 0
    }
}

export interface PaginatorDataSource {
    offset?: number,
    limit?: number,
    count?: number,
    pagesToShow?: number

}