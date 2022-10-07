
const Url = "https://studygeeks.herokuapp.com";
// const Url = "http://localhost:5000";
var list = document.getElementById("list")
var className = document.getElementById("class-name");
var errorMessage = document.getElementById("error");
var itemBtn = document.getElementById("itemBtn");
var deleteBtn = document.getElementById("deleteBtn");
var enterInput = document.getElementById("todo-item");
var classId = document.getElementById("classId");
var currentClass;
var localStor;




// Disabling INPUT_fields
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



const getIp = () => {
    axios.get(`${Url}/getIp`)
        .then(function (response) {
            // console.log(response.data);
            localStorage.setItem("userIp", response.data)
        })
        .catch(function (error) {
            console.log(error);
            localStorage.setItem("userIp", "null")
        })
}
getIp();


const getData = () => {

    localStorage.setItem("currentClass", JSON.stringify(classId.value.toLowerCase()));
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
            var postTime = new Date(data.val().postTime);

            className.innerHTML = classId.value;
            var li = document.createElement("li");
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





            // Add Button Delete

            // var delBtn = document.createElement("img");
            // var delText = document.createTextNode("Delete");
            // delBtn.setAttribute("class", "img1");
            // delBtn.setAttribute("src", "./images/delete.png");
            // delBtn.setAttribute("onclick", "deleteItem(this)");
            // delBtn.setAttribute("id", data.val().key);

            // delBtn.appendChild(delText);
            // li.appendChild(delBtn);



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
    firebase.database().ref(`classWork/${localStor}`).on("child_added", (data) => {
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
    var fileInput = document.getElementById("fileInput");
    let database = firebase.database().ref(`classWork/${classId.value}`)
    console.log("class id is = > ", classId.value)
    var userIp = localStorage.getItem("userIp");
    slicingIp = userIp.lastIndexOf(":");
    userIp = userIp.slice(slicingIp + 1, userIp.length);
    var classId = document.getElementById("classId").value;
    var TodoValue = document.getElementById("todo-item").value;

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
        console.log("form part is running ==> ",)
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
                // console.log("res data is ==> ", res.data.url);
                var data = {
                    value: res.data.url,
                    key: key,
                    userIp: userIp,
                    postTime: new Date().getTime(),
                };
                console.log("file is => ", fileInput.value)
                database.child(key).set(data);
                document.getElementById("todo-item").value = "";
                console.log("Posted image succesfully , ", res.data);
                document.getElementById("fileInput").value = null;
                console.log("now file is==> ", fileInput.value);
            })
            .catch(err => {
                document.getElementById("todo-item").classList.remove("hide");
                document.getElementById("fileinputimage").src = `./images/upload.png`;

                console.log(err);
            })
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



