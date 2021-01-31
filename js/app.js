const Url = "https://studygeeks.herokuapp.com";
// const Url = "http://localhost:5000";
var list = document.getElementById("list")
var errorMessage = document.getElementById("error");
var itemBtn = document.getElementById("itemBtn");
var deleteBtn = document.getElementById("deleteBtn");
var enterInput = document.getElementById("todo-item");
var className = document.getElementById("class-name");
var currentClass;




// Disabling fields
itemBtn.disabled = true;
deleteBtn.disabled = true;
deleteBtn.style.backgroundColor = "#dddddd";
itemBtn.style.backgroundColor = "#dddddd";
enterInput.disabled = true;
// backBtn.style.display = "none";

var localStor = JSON.parse(localStorage.getItem("currentClass"));

var addBtn = document.getElementById("addName");






const getIp = () => {
    const Http = new XMLHttpRequest();
    Http.open("GET", Url + "/getIp");
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            localStorage.setItem("userIp", Http.responseText)
        }
    }
}



const getData = () => {
    var classId = document.getElementById("classId")
    list.innerHTML = " ";
    if (classId.value) {

        localStorage.setItem("currentClass", JSON.stringify(classId.value));
        itemBtn.disabled = false;
        deleteBtn.disabled = false;
        enterInput.disabled = false;
        deleteBtn.style.backgroundColor = "white";
        itemBtn.style.backgroundColor = "white";
        errorMessage.style.display = "none";
        currentClass = classId.value;
        className.innerHTML = classId.value;
        fireBaseData(classId.value);
        enterInput.focus();
    }
    else {
        if (localStor) {
            fireBaseData(localStor)
        }
    }
    return false;

}


const fireBaseData = (firebaseid) => {

    classId.value = firebaseid;
    itemBtn.disabled = false;
    deleteBtn.disabled = false;
    enterInput.disabled = false;
    errorMessage.style.display = "none";
    enterInput.focus();
    deleteBtn.style.backgroundColor = "white";
    itemBtn.style.backgroundColor = "white";
    // backBtn.style.display = "initial";
    // var myData = firebase.database().ref(`classWork/${classId.value}`).once("value" , (data) =>{
    //     console.log(data.val());
    // });

    firebase.database().ref(`classWork/${firebaseid}`).on("child_added", (data) => {
        var postTime = new Date(data.val().postTime);
        if (data.val().value.includes("webmobile")) {
            if (data.val().value.includes("zip") || data.val().value.includes("rar")) {
                className.innerHTML = localStor;
                var li = document.createElement("li");
                li.innerHTML = `<small class="userIp">${data.val().userIp} </small> 
                <a href="${data.val().value}" target="_blank">  <img class="postValue" width="32px"  src="images/zip.png"> </a>
                    <small class="postDate">${moment(postTime).fromNow()}</small>
                    <img class="img1" src="./images/delete.png" id="${data.val().key}" onclick="deleteItem(this)">
                    `
            }
            else if (data.val().value.includes("doc") || data.val().value.includes("docx") || data.val().value.includes("txt")) {
                className.innerHTML = localStor;
                var li = document.createElement("li");
                li.innerHTML = `<small class="userIp">${data.val().userIp} </small> 
                <a href="${data.val().value}" target="_blank">  <img class="postValue" width="32px"  src="images/document.png"> </a>
                    <small class="postDate">${moment(postTime).fromNow()}</small>
                    <img class="img1" src="./images/delete.png" id="${data.val().key}" onclick="deleteItem(this)">
                    `
            }
            else if (data.val().value.includes("pdf")) {
                className.innerHTML = localStor;
                var li = document.createElement("li");
                li.innerHTML = `<small class="userIp">${data.val().userIp} </small> 
                <a href="${data.val().value}" target="_blank">  <img class="postValue" width="32px"  src="images/pdf.png"> </a>
                    <small class="postDate">${moment(postTime).fromNow()}</small>
                    <img class="img1" src="./images/delete.png" id="${data.val().key}" onclick="deleteItem(this)">
                    `
            }
            else {
                className.innerHTML = localStor;
                var li = document.createElement("li");
                li.innerHTML = `<small class="userIp">${data.val().userIp} </small> 
            <a href="${data.val().value}" target="_blank">  <img class="postValue" width="70px"  src="${data.val().value}"> </a>
                <small class="postDate">${moment(postTime).fromNow()}</small>
                <img class="img1" src="./images/delete.png" id="${data.val().key}" onclick="deleteItem(this)">
                `
            }

        }
        else {
            className.innerHTML = localStor;
            var li = document.createElement("li");
            li.innerHTML = `<small class="userIp">${data.val().userIp} </small> 
            
            <p class="postValue">${data.val().value}</p>
    
            <small class="postDate">${moment(postTime).fromNow()}</small>
            <img class="img1" src="./images/delete.png" id="${data.val().key}" onclick="deleteItem(this)">
            `
        }



        // var delBtn = document.createElement("img");
        // var delText = document.createTextNode("Delete");
        // delBtn.setAttribute("class", "img1");
        // delBtn.setAttribute("src", "./images/delete.png");
        // delBtn.setAttribute("onclick", "deleteItem(this)");
        // delBtn.setAttribute("id", data.val().key);

        // delBtn.appendChild(delText);
        // li.appendChild(delBtn);

        list.appendChild(li);
    });
}


function todo() {
    var classId = document.getElementById("classId")
    if (classId.value === "") {

    }
    else {
        className.innerHTML = classId.value;
        var fileInput = document.getElementById("fileInput");
        let database = firebase.database().ref(`classWork/${classId.value}`)
        var userIp = localStorage.getItem("userIp");
        slicingIp = userIp.lastIndexOf(":");
        userIp = userIp.slice(slicingIp + 1, userIp.length);
        var TodoValue = document.getElementById("todo-item").value;
        if (TodoValue == "" || TodoValue === " ") {
            database = firebase.database().ref(`classWork/${localStor}`)
        }
        else {
            database = firebase.database().ref(`classWork/${classId.value}`)
        }

        if (!fileInput.value) {
            if (document.getElementById("todo-item").value === "" || document.getElementById("todo-item").value === " ") {
            }
            else {
                todoValue = convertToLink(TodoValue)
                let key = database.push().key;
                var data = {
                    value: todoValue,
                    key: key,
                    userIp: userIp,
                    postTime: new Date().getTime(),
                };
                database.child(key).set(data);
                document.getElementById("todo-item").value = "";
            }

        }
        else {
            document.getElementById("fileinputimage").src = `./images/loader.gif`;
            let formData = new FormData();

            formData.append("myFile", fileInput.files[0]);
            document.getElementById("todo-item").classList.add("hide");
            axios({
                method: 'post',
                url: Url + "/upload",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    document.getElementById("fileinputimage").src = `./images/upload.png`;
                    document.getElementById("todo-item").classList.remove("hide");

                    let key = database.push().key;

                    var data = {
                        value: res.data.url,
                        key: key,
                        userIp: userIp,
                        postTime: new Date().getTime(),
                    };

                    database.child(key).set(data);
                    document.getElementById("todo-item").value = "";
                    document.getElementById("fileInput").value = null;
                })
                .catch(err => {
                    document.getElementById("todo-item").classList.remove("hide");
                    document.getElementById("fileinputimage").src = `./images/upload.png`;
                })
        }
    }

    return false;
}

function convertToLink(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = text.replace(exp, '<a  class="valueLink" target="_blank" href="$1">$1</a>');
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replaced = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    return replaced
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



