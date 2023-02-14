
# EasyPaginator
EasyPaginator is a JavaScript library that makes it easy to create and manage pagination.

## 😕 Problem


When creating a project that requires pagination, it can be tempting to start from scratch, which often results in several problems such as:

-   **Duplicate code:** across different screens that require pagination
-   **Modules with multiple responsibilities:** their own and pagination
-   **Unexpected behaviors:** due to not handling edge cases While these problems may not always surface, as they depend on individual implementation, they are commonly seen even in production-level code.

## 🙂 Solution

EasyPaginator is a package that aims to abstract the internal logic and state of a paginator from the client code through different methods that make its interaction and handling easy, with features such as moving forward and backward between pages, getting the limits of the paginator, and defining segments among others, without having to worry about internal calculations, page limits, and other edge cases, resulting in less coupling, fewer unexpected behaviors, and modules with fewer responsibilities in your client code.

## ⌨️ Get started
Install

    npm install EasyPaginator

import and use
```typescript
    import { EasyPaginator } from  "./easy-paginator/easy-paginator";
    
    const  paginator = new  EasyPaginator({
        offset:  0,
        limit:  10,
        count:  1000
    })

    console.log(paginator.page) // 1
```
## Usage

### Create an instance 
```typescript
    import { EasyPaginator } from  "./easy-paginator/easy-paginator";
    
    const  paginator = new  EasyPaginator({
        offset:  0, //quantity of items viewed items and start point for the new ones
        limit:  10, //quantity of items to show per page
        count:  1000, //all items count
        segmentLength: 7 // define a segment for paginator limits, doesnt affect te behaviour just add more information, if not provided the segment is all the pages
    })
```


### Get the current page
Returns a number. If the provided offset when creating the object is invalid, the page will be set to the closest valid page.    
Get the next page
```typescript
    paginator.page
```
### Get the expected page
When the offset its greater than the count of elements EasyPaginator cut it to fit into the limits, but in certain cases we need to know the expected page if the count were bigger
```typescript
    paginator.expectedPage
```
### Get the next page
Returns the next page number if possible, or undefined if not.
```typescript
    paginator.nextPage
```
### Get the previous page
Returns the previous page number if possible, or undefined if not.
```typescript
    paginator.prevPage
```
### Get the last page
Returns the last page of paginator instance
```typescript
    paginator.lastPage
```
### Results
show the count of items loaded for the current page, usally correspond with the limit provided, but may be less in certain cases
```typescript
    paginator.results
```
  ### Get segment limits
  If segment length was provided then the segment limits will be the pages for show in the paginator with the current page in the middle, if segment length wasn't provided the segment will be since 1 to lastPage
  
```typescript
    paginator.firstSegmentLimit
    paginator.lastSegmentLimit
```


### Get elements 
Return an array  of elements that can be used for render a paginator, delimited by a segment

    paginator.elements
the structure of the elements its
```typescript
    [{
        text: "<" // the text of button can be '<' '<<' '1', '2' ... 'Infinity', '>' '>>'
        target: 1 // the page to navigate
        enabled: true // show what buttons are enabled for this page, used mostly for the arrows
        active: false // if the page its the active page
    }]
```

 ### Navigate to pages
 We can navigate between pages in the paginator with this 3 methods, the methos not modify the internal state of the paginator, instead returns a new instance with the new page data
 
```typescript
    const paginatorForNextPage = paginator.buildNext()
    const paginatorForPrevPage = paginator.buildPrev()
    const paginatorForPage5 = paginator.buildTo(5)
```

### Set new count
We may need to increase the count of items, we can use this method, we need to be aware that new instance will be created instead of altering the existing one, 

    paginator.withCount(50) // return a new instance with the new offset
all previous validations of offset still remain, offset 50 with count 30 returns page 3, if we add more count with the method withCount(100) for example the page still will be 3
```typescript

    let paginator = new EasyPaginator({offset: 50, limit: 10, count: 30})
	paginator.page === 3 // true
	paginator.lastPage ===  3 // true

	paginator = paginator.withCount(100)
	paginator.page === 3 // true due the limit constraints were applied before
	paginator.lastPage === 10 // true due the new count
```	  
### Set new count without taking into account previous validations
If we want to attempt to go to expected page and we want try it with new count we must use
```typescript
    let paginator = new EasyPaginator({offset: 50, limit: 10, count: 30})
	paginator.page === 3 // true
	paginator.lastPage ===  3 // true

	paginator = paginator.expectedWithCount(100)
	paginator.page === 6 // true due the limit constraints were recalculated against datasource whe we call the method
	paginator.lastPage === 10 // true due the new count
```
 

### Raw data
We can access to raw data provided for the EasyPaginator instance
```typescript
    paginator.offset //this its not the raw, its the fix version
    paginator.limit
    paginator.count
    paginator.segmentLimit
```
  ## Demo
  You can see an example in this codepen that use the pokeapi
  [codepen](https://codepen.io/Isaac-cura/pen/vYzBgRz?editors=0010)
## License
EasyPaginator is [MIT Licensed](https://github.com/Isaac-cura/EasyPaginator/blob/master/LICENSE.md)