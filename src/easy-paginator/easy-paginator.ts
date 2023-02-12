export class EasyPaginator {
    private _page;
    private _offset: number;
    private _limit: number;
    private _count: number;
    private _lastPage: number;
    private _segmentLength?: number;

    constructor(dataSource: PaginatorDataSource = {}) {
        dataSource = Object.assign(defaultPaginatorConfig(), dataSource)
        this.init(dataSource)
    }

    private init(dataSource) {
        const { limit, count, segmentLength } = dataSource;
        this._lastPage = this.getLastPage(count, limit);
        this._page = this.getPage(dataSource);
        this._offset = this.getOffsetOf(this.page, limit);
        this._limit = limit;
        this._count = count;
        this._segmentLength = segmentLength || Infinity;
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

    get prevPage() {
        const possiblePrev = this.page - 1;
        return possiblePrev > 1
            ? possiblePrev
            : undefined
    }

    get result() {
        const remainedItems = this.count - this.offset
        return remainedItems > this.limit
            ? this.limit
            : remainedItems
    }

    get firstSegmentLimit() {
        return Math.max(1, 1 + this.lastSegmentLimit - this._segmentLength) 
    }

    get lastSegmentLimit() {
        const leftLimitOffset = Math.min(0, this.page - this.halfSegmentLength)
        return Math.min(this.lastPage, this.page + this.halfSegmentLength - leftLimitOffset)
    }

    private get halfSegmentLength() {
        return Math.floor(this._segmentLength / 2)
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
    segmentLength?: number

}