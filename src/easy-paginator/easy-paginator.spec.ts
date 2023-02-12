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

    it("Offset its defined", () => {
        expect(new EasyPaginator().offset).toBeDefined()
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
})