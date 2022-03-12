function writeReview() {
    let Name = document.getElementById("name").value;
    let Email = document.getElementById("email").value;
    let Message = document.getElementById("message").value;
    let Title = document.getElementById("title").value;
    let Reason = document.getElementById("reason").value;

    console.log(Name, Email.Message, Title, Reason);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Emails").add({
                        userID: userID,
                        name: Name,
                        email: Email,
                        title: Title,
                        reason: Reason,
                        message: Message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
            console.log("no user signed in");
        }
    });

}