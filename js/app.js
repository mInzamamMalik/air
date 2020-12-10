var list = document.getElementById("list")


function todo(){
        var todo_item = document.getElementById("todo-item")
        let database = firebase.database().ref("classWork")
        let key = database.push().key;

        if (todo_item.value=="" || todo_item.value==" ")
        {
            alert("value cant be null");
        }
        else{
                    var data = {
                        value : todo_item.value,
                        key:key,
                };
                database.child(key).set(data);
                todo_item.value="";
        }
}

firebase.database().ref("classWork").on("child_added",(data)=>{
    console.log(data.val());
    
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);

    // Add Button Edit
    // var editBtn = document.createElement("img");
    // var editText = document.createTextNode("Edit");
    // editBtn.setAttribute("class","img1");
    // editBtn.setAttribute("src","edit.png");
    // editBtn.setAttribute("onclick","editItem(this)");

  

// Add Button Delete

var delBtn = document.createElement("img");
var delText = document.createTextNode("Delete");
delBtn.setAttribute("class","img1");
delBtn.setAttribute("src","./images/delete.png");
delBtn.setAttribute("onclick","deleteItem(this)");
delBtn.setAttribute("id",data.val().key);

delBtn.appendChild(delText);
li.appendChild(delBtn);



// editBtn.appendChild(editText);
// li.appendChild(editBtn);
    list.appendChild(li);
})


function deleteItem(e)
{
    var password = prompt("Enter password to delete specific");
    if (password==="delete123")
    {
        firebase.database().ref("classWork").child(e.id).remove();
        e.parentNode.remove();
    }
    else{
        alert("you have no access to delete this, wrong password")
    }
   
}

function editItem(e){
        var newText = prompt("Enter New Text",e.parentNode.firstChild.nodeValue);
        e.parentNode.firstChild.nodeValue= newText;
}


function deleteAll(){
var password = prompt("Enter password to delete all");

if (password==="delete123")
{
    firebase.database().ref("classWork").remove();
            list.innerHTML = " ";

}
else{
    alert("you have no access to delete this, wrong password")
}

}