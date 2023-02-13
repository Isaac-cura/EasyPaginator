export class EasyPaginator {
    page;
    offset: number;
    limit: number;
    count: number;
    lastPage: number;
    segmentLength: number;
    elements: Element[] = []
    nextPage: number
    prevPage: number
    results: number
    firstSegmentLimit: number;
    lastSegmentLimit: number;

    constructor(private dataSource: PaginatorDataSource = {}) {
        dataSource = Object.assign(defaultPaginatorConfig(), dataSource)
        this.init(dataSource)
    }

    private init(dataSource) {
        const { limit, count, segmentLength } = dataSource;
        this.lastPage = this.getLastPage(count, limit);
        this.page = this.getPage(dataSource);
        this.offset = this.getOffsetOf(this.page, limit);
        this.limit = limit;
        this.count = count;
        this.segmentLength = segmentLength || Infinity;
        this.nextPage = this.getNextPage()
        this.prevPage = this.getPrevPage()
        this.results = this.getResults()
        this.lastSegmentLimit = this.getLastSegmentLimit()
        this.firstSegmentLimit = this.getFirstSegmentLimit()
        this.setElements();
    }


    getNextPage() {
        const possibleNext = this.page + 1;
        return possibleNext <= this.lastPage
            ? possibleNext
            : undefined
    }

    getPrevPage() {
        const possiblePrev = this.page - 1;
        return possiblePrev >= 1
            ? possiblePrev
            : undefined
    }

    getResults() {
        const remainedItems = this.count - this.offset
        return remainedItems > this.limit
            ? this.limit
            : remainedItems
    }

    getFirstSegmentLimit() {
        return Math.max(1, 1 + this.lastSegmentLimit - this.segmentLength)
    }

    getLastSegmentLimit() {
        const leftLimitOffset = Math.min(0, this.page - this.ceilHalfSegmentLength)
        return Math.min(this.lastPage, this.page + this.floorHalfSegmentLength - leftLimitOffset)
    }

    withCount(count: number) {
        return new EasyPaginator({
            ...this.dataSource,
            count
        });
    }

    private setElements() {
        this.elements.push({
            text: "<<",
            target: 1,
            enabled: this.firstSegmentLimit !== 1
        })
        this.elements.push({
            text: "<",
            target: this.prevPage,
            enabled: this.page !== 1
        })
        for (let i = this.firstSegmentLimit; i <= this.lastSegmentLimit; i++) {
            this.elements.push({
                text: i.toString(),
                enabled: true,
                target: i,
                active: this.page == i
            })
        }
        this.elements.push({
            text: ">",
            target: this.nextPage,
            enabled: this.page !== this.lastPage
        })

        this.elements.push({
            text: ">>",
            target: this.lastPage,
            enabled: this.lastSegmentLimit !== this.lastPage
        })
    }

    buildNext() {
        return this.buildTo(this.page + 1)
    }

    buildPrev() {
        return this.buildTo(this.page - 1)
    }

    buildTo(page: number) {
        const fixedPage = this.getFixedPage(page, this.lastPage)
        const offset = this.getOffsetOf(fixedPage, this.limit)
        return new EasyPaginator({
            ...this.dataSource,
            offset
        })
    }

    private get floorHalfSegmentLength() {
        return Math.floor(this.segmentLength / 2)
    }

    private get ceilHalfSegmentLength() {
        return Math.ceil(this.segmentLength / 2)
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
    active?: boolean,
    target?: number
}