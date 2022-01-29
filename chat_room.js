
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
    apiKey: "AIzaSyBaxgE_d8PnyOdLVvK0sAgb1tNlht1DohI",
    authDomain: "kwitter-26999.firebaseapp.com",
    databaseURL: "https://kwitter-26999-default-rtdb.firebaseio.com",
    projectId: "kwitter-26999",
    storageBucket: "kwitter-26999.appspot.com",
    messagingSenderId: "90265414185",
    appId: "1:90265414185:web:be46d22f65d21df98cca38"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome "+ user_name + "!";

function addRoom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose : "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "";
}


function getData() {firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
          childKey  = childSnapshot.key;
          Room_names = childKey;
          row = "<div class='room_name' id='"+ Room_names + "' onclick= 'redirectToRoomName(this.id)'>"+ Room_names+ "</div><hr>";
          document.getElementById("output").innerHTML += row;

    //End code
    });});}
getData();

function redirectToRoomName(name){
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}


