$(document).ready(function() {
  let formsighidden = false;
  let formreghidden = false;
  let contenthidden = false;
  $("#test").click(function() {
    if (contenthidden) {
      $("p").show();
      contenthidden = false;
    } else {
      $("p").hide();
      contenthidden = true;
    }
  });

  //   let formreghidden = false;
  $("#toggleregister").click(function() {
    if (formreghidden) {
      $("#registerform").show();
      formreghidden = false;
    } else {
      $("#registerform").hide();
      formreghidden = true;
    }
  });

  //   let formsighidden = false;
  $("#togglesignin").click(function() {
    if (formsighidden) {
      $("#signinform").show();
      formsighidden = false;
    } else {
      $("#signinform").hide();
      formsighidden = true;
    }
  });

  //log out
  $("#togglelogout").click(function(e) {
    e.preventDefault();
    localStorage.removeItem("access_token");
    $("#message").text("Successfuly Signed Out");
  });

  // form sign in event
  $("#registerform").submit(function(e) {
    e.preventDefault();
    const email = $("#emailreg").val();
    const password = $("#passwordreg").val();
    const username = $("#userreg").val();
    $.ajax({
      url: "http://localhost:3000/register",
      type: "POST",
      data: { email, password, username }
    })
      .done(function(response) {
        $("#emailreg").val("");
        $("#passwordreg").val("");
        $("#userreg").val("");
        localStorage.setItem("access_token", response.access_token);
        $("#message").text("Successfuly Registered and Signed In");
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  // form sign in event
  $("#signinform").submit(function(e) {
    e.preventDefault();
    const email = $("#emailinput").val();
    const password = $("#passwordinput").val();
    $.ajax({
      url: "http://localhost:3000/login",
      type: "POST",
      data: { email, password }
    })
      .done(function(response) {
        $("#emailinput").val("");
        $("#passwordinput").val("");
        localStorage.setItem("access_token", response.access_token);
        $("#message").text("Successfuly Signed In");
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });
});
