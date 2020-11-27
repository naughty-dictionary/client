$(document).ready(function() {
    if (localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showRegistrationPage()
    }
    $("#registration-form").on("submit", function(e) {
        e.preventDefault()        
        registration()
    })
    $("#login-form").on("submit", function(e) {
        e.preventDefault()        
        login()
    })
    $("#btn-logout").on("click", function (e) {
        logout()
    })

    $("#button-tebak-gambar").on("click", () => {
        empty()
        showOwlBotImage()
      })
    
      $("#go-tebak-tebakan").on("click", () => {
        let answer = $("#answerowl").val()
        checkOwl(answer)
      })
    
      $("#button-trivia").on("click", () => {
        getTriviaQuestion()
      })
      $('#back-login').click(()=> {
        showLoginPage()
      })
      $('#back-register').click(() => {
        showRegistrationPage()
      })
});