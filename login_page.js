function addUser(){
    userName = document.getElementById("user_name").value;

    localStorage.setItem("user_name", userName);
    window.location = "chat_room.html";
}