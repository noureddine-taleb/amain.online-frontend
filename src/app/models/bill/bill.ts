export class Bill {
    _id: string
    createdAt: Date = new Date()
    constructor(
        public userID: string,
        public projectID: string,
        public quantity: number,
        public createdByID: string,
    )
    {}
}
