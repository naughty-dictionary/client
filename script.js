let basicUrl = "http://localhost:3000/"
function showOwlBotImage(){
  $.ajax({
    url: `${basicUrl}owl`,
    method: "GET"
  })
  .done(response => {
    $("#random-image").prepend(`
    <div class="card-custom uk-card uk-card-default uk-card-hover uk-card-body">
      <i class="bookmark far fa-plus-square"></i>
      <img src="https://images.unsplash.com/photo-1587613753310-0ba642887227?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0MTc4MH0" alt="image">
    </div>
    `)
  })
}