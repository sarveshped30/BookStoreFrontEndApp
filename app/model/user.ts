export class User {
    constructor(
        public userId : number,
        public name : string,
        public mobileNo : string,
        public emailId : string,
        public password : string,
        public city : string,
        public state : string,
        public zipCode : number,
        public address : string,
        public books : [],
    ) {}
}