export type RouteQuery = {
    page?: string, // active page number integer as a string
    size?: string, // page size integer as a string
    sort?: string, // name of sort column, prefix with '-' for reverse sort
    filter?: string // hashed filter object
    filterbar?: '0' | '1' // filter sidebar
    hide?: string // comma separated list of column names
}
