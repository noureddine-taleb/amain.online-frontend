export class Treasury {
    _id: string
    createdAt: Date = new Date()
    constructor(
        public name: string,
        public desc: string,
        public amount: number,
        public projectID: string,
    )
    {}
}
