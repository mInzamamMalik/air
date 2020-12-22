var list = document.getElementById("list")
var className = document.getElementById("class-name");
var errorMessage = document.getElementById("error");
var itemBtn = document.getElementById("itemBtn");
var deleteBtn = document.getElementById("deleteBtn");
var enterInput = document.getElementById("todo-item");
var currentClass;
var localStor;




// Disabling fields
itemBtn.disabled = true;
deleteBtn.disabled = true;
deleteBtn.style.backgroundColor = "#dddddd";
itemBtn.style.backgroundColor = "#dddddd";

enterInput.disabled = true;
// backBtn.style.display = "none";


var addBtn = document.getElementById("addName");
localStor = JSON.parse(localStorage.getItem("currentClass"));

const checkKeyPress = (key) => {


    if (key.keyCode === 13) {
        todo();
    }


}

window.addEventListener("keypress", checkKeyPress, false)





const getData = () => {
    var classId = document.getElementById("classId");
    if (classId.value === "" || classId.value === " ") {
        alert("value cant be null")
    }
    else {

        localStorage.setItem("currentClass", JSON.stringify(classId.value));
        itemBtn.disabled = false;
        deleteBtn.disabled = false;
        enterInput.disabled = false;
        deleteBtn.style.backgroundColor = "white";
        itemBtn.style.backgroundColor = "white";
        errorMessage.style.display = "none";
        currentClass = classId.value;
        list.innerHTML = " ";
        if (localStor !== false) {

            firebase.database().ref(`classWork/${classId.value}`).on("child_added", (data) => {
                console.log(data.val());

                console.log(currentClass);
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
        }
        classId.value === " ";

    }
}



if (localStor) {
    classId.value = localStor;
    itemBtn.disabled = false;
    deleteBtn.disabled = false;
    enterInput.disabled = false;
    errorMessage.style.display = "none";

    deleteBtn.style.backgroundColor = "white";
    itemBtn.style.backgroundColor = "white";
    // backBtn.style.display = "initial";
    firebase.database().ref(`classWork/${localStor}`).on("child_added", (data) => {
        console.log(data.val());

        className.innerHTML = localStor;

        var li = document.createElement("li");
        var liText = document.createTextNode(data.val().value);
        li.appendChild(liText);
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
}



// const deleteCurrClass = () => {

//     console.log("its running")
//     itemBtn.style.display = "none";
//     deleteBtn.style.display = "none";
//     enterInput.style.display = "none";
//     backBtn.style.display = "none";
//     classId.style.display = "initial";
//     addBtn.style.display = "initial";
//     window.localStorage.removeItem('currentClass');
//     localStor = undefined;
//     list.innerHTML = " "
// }



function todo() {
    var classId = document.getElementById("classId").value;
    var todo_item = document.getElementById("todo-item")
    let database = firebase.database().ref(`classWork/${classId}`)

    if (classId.value == "" || classId.value === " ") {
        database = firebase.database().ref(`classWork/${localStor}`)
    }
    else {
        database = firebase.database().ref(`classWork/${classId}`)

    }

    let key = database.push().key;
    console.log("its running")

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
        if (currentClass) {
            firebase.database().ref(`classWork/${currentClass}`).child(e.id).remove();
        }
        else {
            firebase.database().ref(`classWork/${localStor}`).child(e.id).remove();
        }
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
console.log(currentClass);

function deleteAll() {
    var password = prompt("Enter password to delete all");
    console.log(currentClass);
    if (password === "delete123") {
        if (currentClass) {
            firebase.database().ref(`classWork/${currentClass}`).remove();
        }
        else {
            firebase.database().ref(`classWork/${localStor}`).remove();

        }
        list.innerHTML = " ";
        window.localStorage.removeItem('currentClass');
        localStor = undefined;

    }
    else {
        alert("you have no access to delete this, wrong password")
    }

}