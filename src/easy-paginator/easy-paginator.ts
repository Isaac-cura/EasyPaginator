export class EasyPaginator {
    page = 1;
    offset: number;
    limit: number;
    count: number;

    constructor(dataSource: PaginatorDataSource = {}) {
        dataSource = Object.assign(defaultPaginatorConfig(), dataSource)
        const { offset, limit } = dataSource
        this.page = this.getPageFrom(offset, limit)
    }

    private getPageFrom(offset: number, limit: number) {
        const firstItemShown = offset + 1;      
        return Math.ceil(firstItemShown / limit)
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