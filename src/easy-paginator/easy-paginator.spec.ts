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
        expect(paginator.prevPage).toBe(paginator.page -1)
    })

    it("Prev page its undefined when paginator cant fetch prev page", () => {
        const paginator = new EasyPaginator({
            offset: 5,
            limit: 10,
            count: 100
        })
        expect(paginator.prevPage).not.toBeDefined()
    })
})