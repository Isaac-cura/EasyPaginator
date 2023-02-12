export class EasyPaginator {
    private _page;
    private _offset: number;
    private _limit: number;
    private _count: number;
    private _lastPage: number;
    private _segmentLength?: number;
    private _elements: Element[] = []

    constructor(private dataSource: PaginatorDataSource = {}) {
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
        this.setElements();
    }

    get elements() {
        return this._elements;
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
        const leftLimitOffset = Math.min(0, this.page - this.ceilHalfSegmentLength)
        return Math.min(this.lastPage, this.page + this.floorHalfSegmentLength - leftLimitOffset)
    }

    private setElements() {
        this.elements.push({
            text: "<<",
            enabled: this.firstSegmentLimit !== 1
        })
        this.elements.push({
            text: "<", 
            enabled: this.page !== 1
        })
        for(let i = this.firstSegmentLimit; i <= this.lastSegmentLimit; i++) {
            this._elements.push({
                text: i.toString(),
                enabled: true,
                active: this.page == i
            })
        }
        this.elements.push({
            text: ">",
            enabled: this.page !== this.lastPage
        })

        this.elements.push({
            text: ">>",
            enabled: this.lastSegmentLimit !== this.lastPage
        })
    }

    buildNext() {
        return this.buildTo(this.page + 1)
    }

    buildPrev() {
        return this.buildTo(this.page - 1)
    }

    buildTo(page: number){
        const fixedPage = this.getFixedPage(page, this.lastPage)
        const offset = this.getOffsetOf(fixedPage, this.limit)
        return new EasyPaginator({
            ...this.dataSource,
            offset
        })
    }

    private get floorHalfSegmentLength() {
        return Math.floor(this._segmentLength / 2)
    }

    private get ceilHalfSegmentLength() {
        return Math.ceil(this._segmentLength / 2)
    }

    private getPage({ offset, limit, count }) {
        const lastPage = this.getLastPage(count, limit)
        const unFixedPage = this.getUnfixedPage(offset, limit)
        return this.getFixedPage(unFixedPage, lastPage);
    }

    private getUnfixedPage(offset: number, limit: number) {
        const firstItemShown = offset + 1;
        return Math.ceil(firstItemShown / limit)
    }

    private getLastPage(count: number, limit) {
        return Math.max(1, Math.ceil(count / limit)) 
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

export interface Element {
    text: string,
    enabled: boolean,
    active?: boolean 
}