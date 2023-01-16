function answer() {
  console.log("Hello?")
}

function answerAngry() {
  console.log("WHAT?!")
}

function answerSpamCaller() {
  console.log("...") //not answering
}

function callFriend(callback) {
  setTimeout(callback, 3000)
  console.log("Ringing...")
//this could be a way, but we want it to be cleaner! 
//   if(typeOfAnswer === "angry") {
//       setTimeout(answerAngry, 3000)
//   } else if(typeOfAnswer === "spam") {
//     setTimeout(answerSpamCaller, 3000)
//   } else {
//     setTimeout(answer, 3000)
//   }
}

callFriend(answer)
callFriend(answerAngry)
callFriend(answerSpamCaller)

const getDBData = (url, callback) => {
  //handle some operation,
  // get data from db...
  // wait for data
  let data //we would actually get this from an API
  let error = "err"
  callback(error, data)
}

const handleDataAndError = (error, data) => {
  if (error) {
    console.log("There is an error, please contact your TA")
  } else {
    console.log(data)
  }
}

getDBData("https://anAPI.com/users/1", handleDataAndError) //simple use of callback

//!CALLBACK HELL
const getComments = () => {
  getDBData("https://anAPI.com/users/1", (error, data) => { //data => the user
    getDBData(
      "https://anAPI.com/comments/" + data.comments[0],
      (error, data) => {
        getDBData("https://anAPI.com/likes/" + data.likes[0])
        handleDataAndError(error, data)
      }
    )
    handleDataAndError(error, data)
  })
}

// !PROMISES

//Promise STATUS: =>
// PENDING Promise<pending>
// FULLFILLED
// Successfull Promise<succesfull>
// Rejected => Promise<rejected>

getDBData("https://anAPI.com/users/1") //let's pretend this gives us back a Promise
// this can either give back en error or data
// Remember methods?
// let arrayOfNumbers = [1,2,3]
// arrayOfNumbers.push(4) <= array method
// "hello".toLowerCase() <= string method

//!PROMISE METHODS
//.then() => ONLY IF PROMISE IS OK
//.catch() => ONLY IF THERE IS AN ERROR
//.finally() => ALWAYS!
// getData() {
//     return Promise<[1,2,3,4]> //NOT ACTUAL CODE
// }
getData("url") //Promise<pending>
  .then((data) => { //Promise<ok>
    //only exec if the Promise is SUCCESFULL
    //let's pretend data is [1,2,3,4]
    return sumAllNumbers(data) //=> this also returns a promise!
  })
  .then((moreData) => { //the return value of the .then moves into the parameter of the following .then
    //moreData = 10 => SUM OF 1,2,3,4
  })
  .catch((err) => {
    console.log(err)
    //only exec if the Promise is Rejected
  })
  .finally(() => {
    //exectues either way
  })
Promise.catch()

// getPizza() {
//     return Promise<Pizza> //NOT ACTUAL CODE
// }

//each step takes an indefinite amount of time!
getPizza()
  .then(callPizzeria) //how long does it take to answer the phone? what about the delivery times? 
  .then(openTheDoor) //the driver is slow to take the stairs, can't find the door etc...
  .then(payPizza) //I can't find my wallet, I don't have enough change for tips
  .then(eatPizza) //am I very hungry? Am I sharing? 
  .then(goToSleepHappy) //how long does it take for me to fall asleep?
  .catch(deleteTheNumber) //something went wrong in any of the steps... now calling the pizzeria again!

//!REQUEST STRUCTURE

// URL => "https://..."
// METHOD => "GET"
// HEADERS? => all the options
// PAYLOAD? => body

//!STATUS CODES

//200-299 => OK
//201 => Created
//204 => No content
//300... (this is redirected, but we don't need it for now :D )
//400-499 => Client error / Bad request
//401 => Logged in, but cannot do that
//403 => NOT logged  => Authorization header is probably wrong
//500 => Something wrong, but not your fault

//fetch(URL, OPTIONS) => Promise
/*
    const fetch = (url, options) => {
        return Promise<Request(url, option)>
    }
*/
const url = "https://dummyjson.com/" 
const options = {
  method: "GET",
}

fetch(url + "users", options) //you can also write the url and the options directly inside, as you prefer
  //if we don't use then we get Promise<pending>
  .then((data) => {
    let users = data.json() //GIVES BACK A PROMISE!
    console.log(users) //Promise<pending> <<< we haven't used .then, so che promise is still "wrapped"
    return users // <<< we return a promise to the next .then
  })
  .then((convertedUsers) => { //unwraps the users promise
    console.log(convertedUsers.users) //ALWAYS CHECK STRUCTURE!!!
  })
  .catch((err) => {
    console.error(err)
  })
//returns a PROMISE


//JSON >>> not Jason Derulo :D
const user = {
  name: "The salsa man",
  batch: "FS05",
  currentTeacher: "Lidia",
}

console.log(user)

let parsedJSONObj = JSON.stringify(user) //turns object into JSON string
console.log(parsedJSONObj)

let bringThisBackToObj = JSON.parse(parsedJSONObj) //turns JSON string back into an object
console.log(bringThisBackToObj)


//!FETCHING DATA!
const getBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books") //promise<pending>
    .then((rawBooks) => rawBooks.json()) //also a promise
    .then((books) => {
      renderBooks(books)
    })
    .catch((err) => renderError(err))
}

const renderBooks = (fetchedBooks) => {
  //fetchedBooks => array of books
  let container = document.getElementById("booksGoHere")
  for (let i = 0; i < fetchedBooks.length; i++) {
    // {asin: "",
    // category: ""
    // img: "",
    // price: "",
    // title: ""}
    const singleBook = fetchedBooks[i]
    container.innerHTML += `
        <div class='col col-3'>
            <div class="card">
                <img src="${singleBook.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${singleBook.title}</h5>
                    <p class="card-text">${singleBook.category}, ${singleBook.asin}</p>
                    <a href="#" class="btn btn-primary">${singleBook.price}</a>
                </div>
            </div>
        </div>`
  }
}

const renderError = (error) => {
  {
    let container = document.querySelector(".container")
    container.innerHTML = `<div class="alert alert-danger" role="alert">
    ${error}
  </div>`
    /* <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
    </div> */
  }
}

getBooks()
