let formsighidden = true;
let formreghidden = true;
let addformhidden = true;
//let selected = null;
$(document).ready(function() {
  refreshPage();

  // button  register
  $("#toggleregister").click(function() {
    if (formreghidden) {
      $("#registerform").show();
      $("#signinform").hide();
      formreghidden = false;
      formsighidden = true;
    } else {
      $("#registerform").hide();
      formreghidden = true;
    }
  });

  // button sign in
  $("#togglesignin").click(function() {
    if (formsighidden) {
      $("#signinform").show();
      $("#registerform").hide();
      formsighidden = false;
      formreghidden = true;
    } else {
      $("#signinform").hide();
      formsighidden = true;
    }
  });

  //log out
  $("#togglelogout").click(function(e) {
    e.preventDefault();
    localStorage.removeItem("access_token");
    $(".todolist").empty();
    $("#message").text("Successfuly Signed Out");
    refreshPage();
  });

  //toggle Add
  $("#toggleadd").click(function() {
    if (addformhidden) {
      $("#addform").show();
      $("#editdiv").html("");
      addformhidden = false;
    } else {
      $("#addform").hide();
      addformhidden = true;
    }
  });

  // form register event
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
        refreshPage();
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
        refreshPage();
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  //delete
  $("#todotable").on("click", "#deletebutton", function(e) {
    e.preventDefault();
    let id = e.target.value;
    $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: "DELETE",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(result => {
        $("#message").text("Data deleted");
        refreshPage();
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  //edit click
  $("#todotable").on("click", "#editbutton", function(e) {
    // hide the add form
    $("#addform").hide();
    addformhidden = true;
    //
    let id = e.target.value;
    $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: "GET",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(result => {
        let todo = result.data;
        $("#editdiv").html(`<form id="editform">
        <label>Title</label>
        <input type="text" name="title" id="titleupt" value="${todo.title}"/>
        <label>Description</label>
        <input type="text" name="description" id="descupt" value="${
          todo.description
        }"/>
        <label>Status</label>
        <input type="text" name="status" id="statusupt" value="${todo.status}"/>
        <label>Due Date</label>
        <input type="text" name="date" id="dateupt" value="${todo.due_date.slice(
          0,
          10
        )}"/>
        <button id="submitupdate" value="${todo.id}" >Edit</button>
      </form>`);
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  //update put
  $("#editdiv").on("click", "#submitupdate", function(e) {
    e.preventDefault();
    let id = e.target.value;
    const title = $("#titleupt").val();
    const description = $("#descupt").val();
    const due_date = $("#dateupt").val();
    const status = $("#statusupt").val();
    console.log(id, title, description, due_date, status);
    $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: "PUT",
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data: { title, description, due_date, status }
    })
      .done(result => {
        $("#message").text("Data updated");
        refreshPage();
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  //get todos
  function getlist() {
    $.ajax({
      url: "http://localhost:3000/todos",
      type: "GET",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(result => {
        $("#todotable").html(`<tr>
        <th>Task</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due Date</th>
      </tr>`);
        let data = result.todos;
        for (let i in data) {
          let date = new Date(data[i].due_date);
          $("#todotable").append(
            `<tr class="todolist">
                  <td>${data[i].title}</td>
                  <td>${data[i].description}</td>
                  <td>${data[i].status}</td>
                  <td>${date.toLocaleDateString()}</td>
                  <td>
                  <button id="editbutton" value="${data[i].id}">Edit</button>
                  <button id="deletebutton" value="${
                    data[i].id
                  }">Delete</button>
                  </td>
                </tr>`
          );
        }
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  }

  // add todo

  $("#addform").submit(function(e) {
    e.preventDefault();
    const title = $("#titleinput").val();
    const description = $("#descinput").val();
    const due_date = $("#dateinput").val();
    console.log(title, description, due_date);
    $.ajax({
      url: "http://localhost:3000/todos",
      type: "POST",
      data: { title, description, due_date },
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(function(response) {
        $("#titleinput").val("");
        $("#descinput").val("");
        $("#dateinput").val("");
        $("#message").text("Successfuly Added To List");
        refreshPage();
      })
      .fail(err => {
        console.log(err);
        $("#message").text(err.responseJSON.message);
      });
  });

  //selected
  //   $("#todos").click(function() {
  //     $("#todos").css("background-color", "");
  //     $(this).css("background-color", "yellow");
  //     selected = $(this);
  //   });

  function refreshPage() {
    if (localStorage.getItem("access_token")) {
      $("#buttonloggedin").show();
      $("#buttonloggedout").hide();
      $("#todotable").show();
      getlist();
      formsighidden = true;
      formreghidden = true;
    } else {
      $("#buttonloggedout").show();
      $("#buttonloggedin").hide();
      $("#todotable").hide();
    }
    $("#registerform").hide();
    $("#signinform").hide();
    $("#addform").hide();
    $("#editdiv").html("");
    //selected = null;
  }
});
