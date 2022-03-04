var nonImportantClass = "far fa-star";
var importantClass = "fas fa-star";
var isImportant = false;
var isFormVisible = true;

function toggleImportant() {
    console.log("icon clicked!");

    if(isImportant) {
        // non important
        isImportant = false;
        $("#iImportant").removeClass(importantClass);
        $("#iImportant").addClass(nonImportantClass);
    }
    else {
        // important
        $("#iImportant").removeClass(nonImportantClass);
        $("#iImportant").addClass(importantClass);
        isImportant = true;
    }
}

function toggleForm() {
    if(isFormVisible) {
        //hide
        isFormVisible = false;
        $("#form").hide();
    }
    else {
        //show
        isFormVisible = true;
        $("#form").show();
    }
}

function saveTask() {
    console.log("Saving task");
    let title = $("#txtTitle").val();
    let location = $("#txtLocation").val();
    let desc = $("#txtDescription").val();
    let dueDate = $("#selDueDate").val();
    let contact = $("#txtContact").val();
    let color = $("#selColor").val();

    let task = new Task(isImportant, title, dueDate, contact, location, desc, color);
    console.log(task);

    let dataStr = JSON.stringify(task);
    console.log(task);
    console.log (dataStr);

    //validate
    if(title.length < 5) {
        //show an error
        alert("Title should be at least 5 chars long");
        return;
    }

    if(!dueDate) {
        //show an error
        alert("DueDate is required");
        return;
    }

    if(!location) {
        alert("Enter a Location");
        return;
    }

    //save the task
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: dataStr,
        contentType: "application/json",
        success: function (data) {
            console.log("Save res: ", data);
            let savedTask = JSON.parse(data);
            displayTask(responseTasks);

              //display the task
        displayTask(savedTask);

        },
        error: function (error) {
            console.log("Save failed: ", error);
            //show an error
        }
    });

    //clear the form create a clearform fn to clear the input fields
    clearForm();
}

function clearForm() {
    $("#txtTitle").val("");
    $("#selDueDate").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
    $("#txtContact").val("");
}


function displayTask(task) {
    //create the syntax
    let syntax = `<div id="${task._id}" class="task"> 
    <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>

        <label class="date">${task.dueDate}</label>

    <div class="extra">
        <label class="location">${task.location}</label>
        <label class="contact">${task.contact}</label>
    </div>
        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>

    </div>`;

    //append the syntax to an element on the screen
    $("#task-list").append(syntax);
}

function deleteTask(id){
    console.log("Deleting Task", id);
    $("#" + id).remove();
    //http DELETE request with the id and it will delete from server
    //https://fsdiapi.azurewebsites.net/api/tasks/clear/<name>
    function clearData() {
        $.ajax({
            type: 'DELETE',
            url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/MikeCh26",
            success: () => {
                console.log("Data cleared");
                $("#task-list").html(""); // clear the contents of the div
            },
            error: (details) => {
                console.log("Clear failed", details)
            }
        });
    }
}

function retrieveTasks() {
    //create a get request to
    //url:server Url + api/tasks/",
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (data) {
            let list = JSON.parse(data);
            //filter tasks by name
            for (let i = 0; i < list.length; i++) {
                let task = list[i];
                if (task.name === "MikeCh26") {
                    displayTask(task);
                }
            }
        },
        error: function (error) {
            console.error("Retrieve failed", error);
        },
    });
}


function init() {
    console.log("Task Manager");

    retrieveTasks();

    //events
    $("#iImportant").click(toggleImportant);
    $("#btnToggleForm").click(toggleForm);
    $("#btnSave").click(saveTask);
    $("#deleteTasks").click(deleteTask);
    //load data

}
window.onload = init;