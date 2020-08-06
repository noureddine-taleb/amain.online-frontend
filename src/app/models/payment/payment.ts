export class Payment {
    _id: string
    amount: number
    createdAt: Date = new Date()
    constructor(
        public billID: string
    ){}
}
