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
room_name = localStorage.getItem("room_name");
document.getElementById("user_name").innerHTML = "Welcome "+ user_name + "!";
document.getElementById("room_name").innerHTML = "Room Name: "+ room_name;

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like:0
    });
    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
       childKey  = childSnapshot.key; 
       childData = childSnapshot.val(); 
       if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
       message = message_data['message'];
       sender_name = message_data['name'];
       like = message_data['like'];
       
       name_html = "<h4>"+ sender_name+ "<img class='user_tick' src = 'tick.png'></h4>";
       message_html = "<h4 class = 'message_h4'>" + message+ "</h4>";
       like_button = "<button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"'onclick='updateLike(this.id)'>";
       span_button = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+ like + "</span></button><hr>";
       
       row = name_html + message_html + like_button + span_button;
       document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();

function updateLike(message_id){
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes
    });
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "login_page.html";
}