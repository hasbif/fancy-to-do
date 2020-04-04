let formsighidden = true;
let formreghidden = true;
let addformhidden = true;
//let selected = null;
$(document).ready(function () {
    refreshPage();

    // button  register
    $("#toggleregister").click(function () {
        if (formreghidden) {
            $("#registerform").show();
            $("#signinform").hide();
            formreghidden = false;
            formsighidden = true;
        } else {
            $("#registerform").hide();
            formreghidden = true;
        }
        $('#message').html('')
        $('#registerform')[0].reset()
    });

    // button sign in
    $("#togglesignin").click(function () {
        if (formsighidden) {
            $("#signinform").show();
            $("#registerform").hide();
            formsighidden = false;
            formreghidden = true;
        } else {
            $("#signinform").hide();
            formsighidden = true;
        }
        $('#message').html('')
        $('#signinform')[0].reset()
    });

    //log out
    $("#togglelogout").click(function (e) {
        e.preventDefault();
        localStorage.removeItem("access_token");
        $(".todolist").empty();
        refreshPage();
        $("#message").html(`<div class="alert alert-success" role="alert">Successfuly Signed Out</div>`)
    });

    //toggle Add
    $("#toggleadd").click(function () {
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
    $("#registerform").submit(function (e) {
        e.preventDefault();
        const email = $("#emailreg").val();
        const password = $("#passwordreg").val();
        const username = $("#userreg").val();
        $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            data: { email, password, username }
        })
            .done(function (response) {
                $("#emailreg").val("");
                $("#passwordreg").val("");
                $("#userreg").val("");
                localStorage.setItem("access_token", response.access_token);
                refreshPage();
                $("#message").html(`<div class="alert alert-success" role="alert">Successfuly Registered and Signed In</div>`)
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });

    // form sign in event
    $("#signinform").submit(function (e) {
        e.preventDefault();
        const email = $("#emailinput").val();
        const password = $("#passwordinput").val();
        $.ajax({
            url: "http://localhost:3000/login",
            type: "POST",
            data: { email, password }
        })
            .done(function (response) {
                $("#emailinput").val("");
                $("#passwordinput").val("");
                localStorage.setItem("access_token", response.access_token);
                refreshPage();
                $("#message").html(`<div class="alert alert-success" role="alert">Successfuly Signed In</div>`)
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });

    //delete
    $("#todotable").on("click", "#deletebutton", function (e) {
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
                refreshPage();
                $("#message").html(`<div class="alert alert-success" role="alert">ToDo Task Deleted</div>`)
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });

    //edit click
    $("#todotable").on("click", "#editbutton", function (e) {
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
                $("#editdiv").html(`<form id="addform">
                    <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" id="titleupt" value="${todo.title}"/>
                    </div>
                    <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" id="descupt" value="${todo.description}"/>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Status</label>
                    </div>
                    <select class="custom-select" id="#statusupt">
                        <option name="statuspct" value="0%" ${todo.status == "0%" ? "selected" : ""}>0%</option>
                        <option name="statuspct" value="25%"${todo.status == "25%" ? "selected" : ""}>25%</option>
                        <option name="statuspct" value="50%"${todo.status == "50%" ? "selected" : ""}>50%</option>
                        <option name="statuspct" value="75%"${todo.status == "75%" ? "selected" : ""}>75%</option>
                        <option name="statuspct" value="100%"${todo.status == "100%" ? "selected" : ""}>100%</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label>Due Date</label>
                    <input type="date" class="form-control" id="dateupt" value="${todo.due_date.slice(0, 10)}"/>
                    </div>
                    <button class="btn btn-primary" id="submitupdate" value="${todo.id}"">Update</button>
                    </form>`);
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });

    //update put
    $("#editdiv").on("click", "#submitupdate", function (e) {
        e.preventDefault();
        let id = e.target.value;
        const title = $("#titleupt").val();
        const description = $("#descupt").val();
        const due_date = $("#dateupt").val();
        const status = $("option[name='statuspct']:checked").val()
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
                refreshPage();
                $("#message").html(`<div class="alert alert-success" role="alert">Task Updated</div>`)
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });



    // add todo

    $("#addform").submit(function (e) {
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
            .done(function (response) {
                // $("#titleinput").val("");
                // $("#descinput").val("");
                // $("#dateinput").val("");
                $('#addform')[0].reset()
                refreshPage();
                $("#message").html(`<div class="alert alert-success" role="alert">Successfuly Added Task to List</div>`)
            })
            .fail(err => {
                console.log(err);
                $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
            });
    });


});

function refreshPage() {
    if (localStorage.getItem("access_token")) {
        $("#buttonloggedin").show();
        $("#buttonloggedout").hide();
        $('#buttonloggedoutgoogle').hide();
        $("#todotable").show();
        getlist();
        formsighidden = true;
        formreghidden = true;
    } else {
        $("#buttonloggedout").show();
        $('#buttonloggedoutgoogle').show();
        $("#buttonloggedin").hide();
        $("#todotable").hide();
    }
    $("#registerform").hide();
    $("#signinform").hide();
    $("#addform").hide();
    $("#editdiv").html("");
    $('#registerform')[0].reset()
    $('#signinform')[0].reset()
    $('#message').html('')
    //selected = null;
}

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
            $("#todotable").html(`<thead class="thead-dark">
                                    <tr>
                                    <th scope="col">Task</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>`);
            let data = result.todos;
            for (let i in data) {
                let date = new Date(data[i].due_date);
                $("#todotable").append(
                    `<tr class="todolist">
                    <td scope="row">${data[i].title}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].status}</td>
                    <td>${date.toLocaleDateString()}</td>
                    <td>
                    <button id="editbutton" value="${data[i].id}">Edit</button>
                    <button id="deletebutton" value="${data[i].id}">Delete</button>
                    </td>
                    </tr>`
                );
            }
        })
        .fail(err => {
            console.log(err);
            $("#message").html(`<div class="alert alert-danger" role="alert">${err.responseJSON.msg}</div>`)
        });
}