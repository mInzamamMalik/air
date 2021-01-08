
var list = document.getElementById("list")
var className = document.getElementById("class-name");
var errorMessage = document.getElementById("error");
var itemBtn = document.getElementById("itemBtn");
var deleteBtn = document.getElementById("deleteBtn");
var enterInput = document.getElementById("todo-item");
var classId = document.getElementById("classId");
var currentClass;
var localStor;
var userIp = "";



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
        getData();
        // console.log("fault in this");
    }
}

const checkKey = (key) => {

    if (key.keyCode === 13) {

        todo();


    }
}

classId.addEventListener("focus", checkKeyPress, false)
enterInput.addEventListener("keypress", checkKey, false)






const getData = () => {

    localStorage.setItem("currentClass", JSON.stringify(classId.value.toUpperCase()));
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


            console.log(currentClass);
            className.innerHTML = classId.value.toUpperCase();
            var li = document.createElement("li");
            li.innerHTML = `<small class="userIp">${data.val().userIp} </small> ${data.val().value}`





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

    enterInput.focus();
}



if (localStor) {
    classId.value = localStor;
    itemBtn.disabled = false;
    deleteBtn.disabled = false;
    enterInput.disabled = false;
    errorMessage.style.display = "none";
    enterInput.focus();
    deleteBtn.style.backgroundColor = "white";
    itemBtn.style.backgroundColor = "white";
    // backBtn.style.display = "initial";
    firebase.database().ref(`classWork/${localStor.toUpperCase()}`).on("child_added", (data) => {


        className.innerHTML = localStor.toUpperCase();
        var li = document.createElement("li");
        li.innerHTML = `<small class="userIp">${data.val().userIp} </small> ${data.val().value}`
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

    const Url = "https://studygeeks.herokuapp.com";
    // const Url = "http://localhost:5000";

    const Http = new XMLHttpRequest();
    Http.open("GET", Url + "/getIp");
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            userIp = (Http.responseText);
            var classId = document.getElementById("classId").value.toUpperCase();
            var text = document.getElementById("todo-item").value;
            let database = firebase.database().ref(`classWork/${classId}`)
        
            if (text == "" || text === " ") {
                database = firebase.database().ref(`classWork/${localStor}`)
            }
            else {
                database = firebase.database().ref(`classWork/${classId}`)
        
            }
        
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            var text1 = text.replace(exp, '<a  target="_blank" href="$1">$1</a>');
            var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            var replaced = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        
            let key = database.push().key;
            // console.log("its running")
        
            if (text == "" || text == " ") {
                alert("value cant be null");
            }
            else {
                var data = {
                    value: replaced,
                    key: key,
                    userIp: userIp,
                };
                database.child(key).set(data);
            }
            document.getElementById("todo-item").value = " ";
        }
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
// console.log(currentClass);

function deleteAll() {
    var password = prompt("Enter password to delete all");
    // console.log(currentClass);
    if (password === "delete123") {
        if (currentClass) {
            firebase.database().ref(`classWork/${currentClass}`).remove();
        }
        else {
            firebase.database().ref(`classWork/${localStor}`).remove();

        }
        list.innerHTML = " ";
        localStor = undefined;

    }
    else {
        alert("you have no access to delete this, wrong password")
    }

}



// dbip.getVisitorInfo().then(function (info) {
//     if (info.isEuMember) {
//         // Only show useful warning to visitors from EU member countries
//         //   showCookieConsent();
//     }
//     console.log(info)
// });