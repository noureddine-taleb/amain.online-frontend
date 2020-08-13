export class Project {
    _id: string
    createdAt: Date = new Date()
    constructor(
        public name: string,
        public desc: string,
        public fees: number,
        public createdByID: string,
    )
    {}
}
