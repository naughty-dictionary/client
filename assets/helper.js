function showRegistrationPage() {
    $("#login-page").hide()
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
    const email = $("#email-registration").val()
    const password = $("#password-registration").val()
    $.ajax({
        url: 'http://localhost:3000/registration',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        showLoginPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
    .always(() => {
        $("#email-registration").val("")
        $("#password-registration").val("")
    })
}
function login() {
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        url: 'http://localhost:3000/login',
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