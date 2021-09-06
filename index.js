let reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

console.log("george@gmail.com.us",reg_email.test("george@gmail.com.us"))
console.log("george@gmail.commp",reg_email.test("george@gmail.commp"))
console.log("george@gmail",reg_email.test("george@gmail"))
console.log("george-mcmurray@gmail.com",reg_email.test("george-mcmurray@gmail.com"))
console.log("george--mcmurray@gmail.com",reg_email.test("george--mcmurray@gmail.com"))