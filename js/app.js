var list = document.getElementById("list")


// Hiding buttons later they will be shown after adding class
var itemBtn = document.getElementById("itemBtn");
var deleteBtn = document.getElementById("deleteBtn");
var enterInput = document.getElementById("todo-item");
itemBtn.style.display = "none";
deleteBtn.style.display = "none";
enterInput.style.display = "none";

var addBtn = document.getElementById("addName");


addBtn.addEventListener("click", function addId() {


    var classId = document.getElementById("classId");
    classId.style.display = "none";
    addBtn.style.display = "none";
    itemBtn.style.display = "initial";
    deleteBtn.style.display = "initial";
    enterInput.style.display = "inline"


    firebase.database().ref(`classWork/${classId.value}`).on("child_added", (data) => {
        console.log(data.val());

        var className = document.getElementById("class-name");
        className.innerHTML = classId.value;


        var li = document.createElement("li");
        var liText = document.createTextNode(data.val().value);
        li.appendChild(liText);




        // Add Button Delete

        var delBtn = document.createElement("img");
        var delText = document.createTextNode("Delete");
        delBtn.setAttribute("class", "img1");
        delBtn.setAttribute("src", "./images/delete.png");
        delBtn.setAttribute("onclick", "deleteItem(this)");
        delBtn.setAttribute("id", data.val().key);

        delBtn.appendChild(delText);
        li.appendChild(delBtn);



        // editBtn.appendChild(editText);
        // li.appendChild(editBtn);
        list.appendChild(li);
    })
})






function todo() {
    var classId = document.getElementById("classId").value;
    var todo_item = document.getElementById("todo-item")
    let database = firebase.database().ref(`classWork/${classId}`)
    let key = database.push().key;

    if (todo_item.value == "" || todo_item.value == " ") {
        alert("value cant be null");
    }
    else {
        var data = {
            value: todo_item.value,
            key: key,
        };
        database.child(key).set(data);
        todo_item.value = "";
    }
}


function deleteItem(e) {
    var password = prompt("Enter password to delete specific");
    if (password === "delete123") {
        firebase.database().ref("classWork").child(e.id).remove();
        e.parentNode.remove();
    }
    else {
        alert("you have no access to delete this, wrong password")
    }

}

function editItem(e) {
    var newText = prompt("Enter New Text", e.parentNode.firstChild.nodeValue);
    e.parentNode.firstChild.nodeValue = newText;
}


function deleteAll() {
    var password = prompt("Enter password to delete all");

    if (password === "delete123") {
        firebase.database().ref("classWork").remove();
        list.innerHTML = " ";

    }
    else {
        alert("you have no access to delete this, wrong password")
    }

}