var database = firebase.database().ref();
var posts = document.getElementById("posts");
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

database.child("posts").on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})
database.child("comments").on("child_added", function(snapshot){
    var obj = snapshot.val();
    renderComment(obj);
})

function render(dua){
    var card = document.createElement("DIV");
    card.setAttribute("class", "card");
    var div = document.createElement("DIV");
    card.setAttribute("id", dua.id);
    div.setAttribute("class", "card-body");

    var likeCounter = document.createElement("SMALL");
    likeCounter.setAttribute("class", "text-muted");
    likeCounter.setAttribute("id", "like" + dua.id)
    likeCounterText = document.createTextNode(dua.like + " Likes");
    likeCounter.appendChild(likeCounterText);
    

    var duaTitle = document.createElement("H4");
    var duaPara = document.createElement("BLOCKQUOTE");
    var sender = document.createTextNode("By : " + dua.sender);
    var duaText = document.createTextNode("Dua: " + dua.dua);

    duaTitle.appendChild(sender);
    duaPara.appendChild(duaText);

    duaTitle.setAttribute("class", "card-title");
    duaPara.setAttribute("class", "blockquote");

    div.appendChild(duaTitle);
    div.appendChild(duaPara);
    div.appendChild(likeCounter);

    var like = document.createElement("BTN");
    like.setAttribute("class", "btn btn-primary mt-3");
    like.setAttribute("id", "like" + dua.id);
    var likeText = document.createTextNode("Like");
    like.onclick = function(){
        likeComment(dua);
    }

    like.appendChild(likeText);

    var commentBox = document.createElement("INPUT");
    commentBox.setAttribute("id", "comment" + dua.id);
    commentBox.setAttribute("class", "form-control")
    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-primary mt-3 ml-2")
    var btnText = document.createTextNode("Comment");
    btn.onclick = function(){
        submitComment(dua.id);
    }

    div.appendChild(commentBox);
    div.appendChild(like);
    div.appendChild(btn);

    btn.appendChild(btnText);

    card.appendChild(div);

    var duaID = document.createElement("DIV");
    card.appendChild(duaID);

    posts.appendChild(card);
}
function submitComment(duaId){
    var commentInput = document.getElementById("comment" + duaId);
    var commentObj = {
        sender: currentUser.name,
        comment: commentInput.value,
        duaId: duaId,
    }
    database.child("comments").push(commentObj);
    commentInput.value = '';
}

function renderComment(comment){
    var duaDiv = document.getElementById(comment.duaId);
    var commentsDiv = duaDiv.lastElementChild;
    var card = document.createElement("DIV");
    card.setAttribute("class", "card");
    var cardBody = document.createElement("DIV");
    cardBody.setAttribute("class", 'card-body');
    
    var senderTag = document.createElement("H5");
    var senderText = document.createTextNode(comment.sender);
    senderTag.appendChild(senderText);

    var commentTag = document.createElement("H5");
    var commentText = document.createTextNode(comment.comment);
    commentTag.appendChild(commentText);

    cardBody.appendChild(senderTag);
    cardBody.appendChild(commentTag);

    card.appendChild(cardBody);

    commentsDiv.appendChild(card);
}

function likeComment(obj){
    obj.like = ++obj.like;
    database.child("posts/" + obj.id).update(obj);
}

database.child("posts").on("child_changed", function(data){    // updating at ui
    var likedPost = document.getElementById(data.key);
    var likeUpdate = document.getElementById("like" + data.key);
    likeUpdate.innerHTML = data.val().like + " Likes";  

})
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

// firebase.auth().onAuthStateChanged(user=>
// {
//     if(user)
//     {
//         console.log(user);
//     }
//     else{
// location='index.html';
//     }
// });