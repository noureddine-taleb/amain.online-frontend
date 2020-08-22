export interface CRUD {
    _url: string
    getAll?(query?: any): any
    getOne?(id: string): any
    create?(data: any): any
    update?(data: any): any
    destroy?(id: string): any
}
