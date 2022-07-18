export class Book {
    constructor(
        public bookId : number,
        public bookName : string,
        public author : string,
        public bookPrize : number,
        public bookImage : File,
        public quantity : number, 
    ) {}
}