export class EasyPaginator {
    private _page;
    private _offset: number;
    private _limit: number;
    private _count: number;
    private _lastPage: number;

    constructor(dataSource: PaginatorDataSource = {}) {
        dataSource = Object.assign(defaultPaginatorConfig(), dataSource)
        this.init(dataSource)
    }

    private init(dataSource) {
        const { limit, count } = dataSource
        this._lastPage = this.getLastPage(count, limit)
        this._page = this.getPage(dataSource)
        this._offset = this.getOffsetOf(this.page, limit)
        this._limit = limit
        this._count = count
    }

    get page() {
        return this._page;
    }
    get offset() {
        return this._offset
    }
    get limit() {
        return this._limit
    }
    get count() {
        return this._count
    }
    get lastPage() {
        return this._lastPage
    }
    get nextPage() {
        const possibleNext = this.page + 1;
        return possibleNext < this.lastPage
            ? possibleNext
            : undefined
    }

    getPage({ offset, limit, count }) {
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
        if (!this.pageIsInHighLimit(page, lastPage)) {
            return lastPage;
        } else if (page <= 1) {
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