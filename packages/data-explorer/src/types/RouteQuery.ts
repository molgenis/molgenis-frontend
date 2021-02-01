export type RouteQuery = {
    page?: number,
    size?: number, // page size
    sort?: string, // name of sort column, prefix with '-' for reverse sort
    filter?: string // hashed filter object
}
