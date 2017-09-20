var user = JSON.parse(localStorage.getItem('currentUser'));
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');
var welcomeTag = document.getElementById('welcome');
var database = firebase.database().ref();

welcomeTag.innerHTML = "Welcome " + user.name;


function submit(){
    var post = {
        sender: sender.value,
        dua: comment.value,
        like: 0,
    }
    sender.value = '';
    comment.value = '';

    database.child('posts').push(post);
}

console.log(user.name);

function signOut()


{
//     localStorage.removeItem('CurrentUser');
// location.assign('index.html');
   
    firebase.auth().signOut().then(function(user) {
  window.location = 'index.html';
}).catch(function(error) {
   alert(error.message);
});
}