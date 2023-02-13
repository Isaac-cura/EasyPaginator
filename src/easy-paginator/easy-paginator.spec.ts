import { EasyPaginator } from "./easy-paginator"

describe("Test suite for easy paginator class", () => {
    it("class be instanciated", () => {
        expect(new EasyPaginator()).toBeInstanceOf(EasyPaginator)
    })

    it("Page must be 1 if the items count its equal or less to limit", () => {
        expect(new EasyPaginator({
            count: 3,
            limit: 5
        }).page).toBe(1)
    })

    it("Page value depends on offset and limit", () => {
        expect(new EasyPaginator({
            count: 100,
            limit: 10,
            offset: 10
        }).page).toBe(2)
    })

    it("Page can be greater than total pages", () => {
        expect(new EasyPaginator({
            count: 50,
            limit: 10,
            offset: 60
        }).page).toBe(5)
    })

    it("Offset coincide with the provided value", () => {
        expect(new EasyPaginator({
            offset: 30,
            limit: 10,
            count: 90
        }).offset).toBe(30)
    })

    it("Offset its fixed when invalid values was provided", () => {
        expect(new EasyPaginator({
            offset: 100,
            limit: 10,
            count: 93
        }).offset).toBe(90)
    })

    it("Offset fixed when the provided offset its not multipe of limit", () => {
        expect(new EasyPaginator({
            offset: 54,
            limit: 10,
            count: 93
        }).offset).toBe(50)

        expect(new EasyPaginator({
            offset: 54,
            limit: 5,
            count: 96
        }).offset).toBe(50)
    })

    it("Limit was exposed coincide with provided value", () => {
        expect(new EasyPaginator({
            offset: 10,
            limit: 20,
            count: 100
        }).limit).toBe(20)
    })

    it("Count was exposed and coincide with provided value", () => {
        expect(new EasyPaginator({
            offset: 10,
            limit: 20,
            count: 100
        }).count).toBe(100)
    })

    it("Next page has value when paginator can be fetch new page", () => {
        const paginator = new EasyPaginator({
            offset: 10,
            limit: 10,
            count: 100
        })
        expect(paginator.nextPage).toBe(paginator.page + 1)
    })

    it("Next page its undefined when paginator cant be fetch new page", () => {
        const paginator = new EasyPaginator({
            offset: 90,
            limit: 10,
            count: 100
        })
        expect(paginator.nextPage).not.toBeDefined()
    })

    it("Prev page has value when paginator can fetch prev page", () => {
        const paginator = new EasyPaginator({
            offset: 90,
            limit: 10,
            count: 100
        })
        expect(paginator.prevPage).toBe(paginator.page - 1)
    })

    it("Prev page its undefined when paginator cant fetch prev page", () => {
        const paginator = new EasyPaginator({
            offset: 5,
            limit: 10,
            count: 100
        })
        expect(paginator.prevPage).not.toBeDefined()
    })

    it("Results its the max number of items that can be shown", () => {
        const paginator = new EasyPaginator({
            offset: 10,
            limit: 10,
            count: 100
        })
        expect(paginator.results).toBe(paginator.limit)
    })

    it("Results return max number of items that can be shown when the remain items are less tan limit", () => {
        const paginator = new EasyPaginator({
            offset: 90,
            limit: 10,
            count: 93
        })
        expect(paginator.results).toBe(3)
    })

    it("The first segment limit its 1 when the page is 1", () => {
        const paginator = new EasyPaginator({
            offset: 0,
            limit: 10,
            count: 100,
            segmentLength: 7
        })
        expect(paginator.firstSegmentLimit).toBe(1)
    })

    it("The first segment limit shows the right number", () => {
        expect(new EasyPaginator({
            offset: 50,
            limit: 10,
            count: 100,
            segmentLength: 7
        }).firstSegmentLimit).toBe(3)
        //4 5 6 7 8 9 10
        expect(new EasyPaginator({
            offset: 80,
            limit: 10,
            count: 100,
            segmentLength: 7
        }).firstSegmentLimit).toBe(4)

        expect(new EasyPaginator({
            offset: 30,
            limit: 10,
            count: 100,
            segmentLength: 4
        }).firstSegmentLimit).toBe(3)

        expect(new EasyPaginator({
            offset: 40,
            limit: 10,
            count: 100,
            segmentLength: 6
        }).firstSegmentLimit).toBe(3)
    })

    it("the last segment limit show segmentLength when the page is 1", () => {
        expect(new EasyPaginator({
            offset: 0,
            limit: 10,
            count: 100,
            segmentLength: 6
        }).lastSegmentLimit).toBe(6)
    })

    it("Show first limit to 1 when no segment length provided", () => {
        expect(new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000,
        }).firstSegmentLimit).toBe(1)
    })

    it("Show last page int last limit when no segment length provided ", () => {
        expect(new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000,
        }).lastSegmentLimit).toBe(100)
    })

    it("buildNext return a instance of EasyPaginator", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildNext()).toBeInstanceOf(EasyPaginator)
    })

    it("buildNext return a diferent instance of EasyPaginator", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildNext()).not.toBe(paginator)
    })

    it("buildNext return instance with the right page positon", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildNext().page).toBe(42)
    })

    it("buildNext return instance with the same page position when can go to next page", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 410
        })
        expect(paginator.buildNext().page).toBe(41)
    })

    it("buildPrev return a instance of EasyPaginator", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildPrev()).toBeInstanceOf(EasyPaginator)
    })

    it("buildPrev return a diferent instance of EasyPaginator", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildPrev()).not.toBe(paginator)
    })

    it("buildPrev return instance with the right page positon", () => {
        const paginator = new EasyPaginator({
            offset: 400,
            limit: 10,
            count: 1000
        })
        expect(paginator.buildPrev().page).toBe(40)
    })

    it("buildPrev return instance with the same page position when can go to prev page", () => {
        const paginator = new EasyPaginator({
            offset: 0,
            limit: 10,
            count: 410
        })
        expect(paginator.buildPrev().page).toBe(1)
    })

    it("min page number must be 1", () => {
        const paginator = new EasyPaginator()
        expect(paginator.lastPage).toBe(1)
    })

    it("Elements has been created successfully", () => {
        const paginator = new EasyPaginator({
            offset: 0,
            limit: 10,
            count: 100,
            segmentLength: 5
        })
        
        expect(paginator.elements).toEqual([
            { text: "<<", enabled: false, target: 1 },
            { text: "<", enabled: false, target: undefined },
            { text: "1", enabled: true, active: true, target: 1},
            { text: "2", enabled: true, active: false, target: 2},
            { text: "3", enabled: true, active: false, target: 3},
            { text: "4", enabled: true, active: false, target: 4},
            { text: "5", enabled: true, active: false, target: 5},
            { text: ">", enabled: true, target: 2 },
            { text: ">>", enabled: true, target: 10}
        ])
        console.log(paginator.buildTo(9).offset)
        expect(paginator.buildTo(9).elements).toEqual([
            { text: "<<", enabled: true, target: 1 },
            { text: "<", enabled: true, target: 8 },
            { text: "6", enabled: true, active: false, target: 6},
            { text: "7", enabled: true, active: false, target: 7},
            { text: "8", enabled: true, active: false, target: 8},
            { text: "9", enabled: true, active: true, target: 9},
            { text: "10", enabled: true, active: false, target: 10},
            { text: ">", enabled: true , target: 10},
            { text: ">>", enabled: false, target: 10 }
        ])
    })

})