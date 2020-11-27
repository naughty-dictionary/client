function showRegistrationPage() {
    $("#login-page").show()
    $("#registration-page").show()
    $("#main-page").hide()
    $("#btn-logout").hide()
}
function showLoginPage() {
    $("#login-page").show()
    $("#registration-page").hide()
    $("#main-page").hide()
    $("#btn-logout").hide()
}
function showMainPage() {
    $("#login-page").hide()
    $("#registration-page").hide()
    $("#main-page").show()
    $("#btn-logout").show()
}
function registration() {
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    console.log(email, '<<<email', password, '<<<password');
    $.ajax({
        url: 'http://localhost:3000/user/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        // localStorage.setItem('access_token', response.access_token)
        showLoginPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
    .always(() => {
        $("#email-register").val("")
        $("#password-register").val("")
    })
}
function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        url: 'http://localhost:3000/user/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        alert(xhr.responeText)
        console.log(xhr, textStatus)
    })
    .always(() => {
        $("#email-login").val("")
        $("#password-login").val("")
    })
}
function logout() {
    localStorage.clear()
    showLoginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out');
    });
}

let dataOwl;
let basicUrl = "http://localhost:3000/"
let triviaAnswer;
    
function empty(){
    $("#description").empty()
    $("#random-image").empty()
}
function showOwlBotImage(){
    $.ajax({
        url: `${basicUrl}gabut/owl`,
        method: "GET"
    })
    .done(response => {
        dataOwl = response
        $("#random-image").prepend(`
        <div class="card-custom uk-card uk-card-default uk-card-hover uk-card-body">
          <img src="${response.definitions[0].image_url}" alt="image" id="owlimage">
        </div>
      `)
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $("#answerowl").val("")
    })

    }

function checkOwl(answer){
    if(answer.toLowerCase() === dataOwl.word){
        $("#description").prepend(`
            <div>
                <p>${dataOwl.word}</p>
                <p>${dataOwl.definitions[0].definition}</p>
            </div>
        `)
    }
    else {
        $("#random-image").empty()
        $("#random-image").prepend(`
        <div class="card-custom uk-card uk-card-default uk-card-hover uk-card-body">
          <img src="https://memegenerator.net/img/instances/47555959.jpg" alt="image" id="owlimage">
        </div>
      `)
      }
    }

function getTriviaQuestion(){
    $.ajax({
        url: `${basicUrl}gabut/trivia`,
        method: "GET"
    })
    .done((response) => {
        $("#triviaquestion").empty()
        triviaAnswer = response.results[0].correct_answer
        $("#triviaquestion").prepend(`
        <div>
          ${response.results[0].question}<br>
            <input type="radio" id="trivia-true" value="True"> True <br>
            <input type="radio" id="trivia-false" value="False"> False <br>
            <button type="submit" id="trivia-button" onclick="checkTrivia()">Submit</button>
        </div>
      `)
        console.log(triviaAnswer, " <<<< ini dari get")
    })
    .fail(err => {
        console.log(err)
    })
}

function checkTrivia(){
    console.log(triviaAnswer)
    let answerTrue = $("#trivia-true").is(":checked")
    let answerFalse = $("#trivia-false").is(":checked")
    if(triviaAnswer.toLowerCase() === "false" && answerFalse){
        $("#triviaquestion").prepend(`
        <img src="https://memegenerator.net/img/instances/46303021.jpg">
        `)
    }
    else if (triviaAnswer.toLowerCase() === "false" && answerTrue){
        $("#triviaquestion").prepend(`
        <img src="https://memegenerator.net/img/instances/47555959.jpg">
        `)
    }
    else if(triviaAnswer.toLowerCase() === "true" && answerTrue){
        $("#triviaquestion").prepend(`
        <img src="https://memegenerator.net/img/instances/46303021.jpg">
        `)
    }
    else if(triviaAnswer.toLowerCase() === "true" && answerFalse){
        $("#triviaquestion").prepend(`
        <img src="https://memegenerator.net/img/instances/47555959.jpg">
        `)
    }
      
}

     