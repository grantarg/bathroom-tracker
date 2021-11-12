 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import { getAuth, getRedirectResult, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref, set, child, update, remove, onValue, get} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlxMdyQ8h2usRLfiVQe30Jn7SCdC3Mw3w",
    authDomain: "hva-bathroom-tracker.firebaseapp.com",
    databaseURL: "https://hva-bathroom-tracker-default-rtdb.firebaseio.com",
    projectId: "hva-bathroom-tracker",
    storageBucket: "hva-bathroom-tracker.appspot.com",
    messagingSenderId: "142430401878",
    appId: "1:142430401878:web:21aa11534f98fae273d2f7"
};
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
        apiKey: "AIzaSyBlxMdyQ8h2usRLfiVQe30Jn7SCdC3Mw3w",
        authDomain: "hva-bathroom-tracker.firebaseapp.com",
        databaseURL: "https://hva-bathroom-tracker-default-rtdb.firebaseio.com",
        projectId: "hva-bathroom-tracker",
        storageBucket: "hva-bathroom-tracker.appspot.com",
        messagingSenderId: "142430401878",
        appId: "1:142430401878:web:21aa11534f98fae273d2f7"
    };
    firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database();
    var auth = firebase.auth();
    var analytics = firebase.analytics();

    try {
        let app = firebase.app();
        let features = ['auth', 'database'].filter(feature => typeof app[feature] === 'function');
    } catch (e) {
        console.error(e);
    }

// AUTH  
var ui = new firebaseui.auth.AuthUI(firebase.auth());

try{
    ui.start('#firebaseui-auth-container', {
        signInOptions: {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        requireDisplayName: true
        },
        // Other config options...
        });
}catch (e) {
    console.log(e);
}


var uiConfig = {
callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
    },
    uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
    }
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'popup',
signInSuccessUrl: 'https://hva-bathroom-tracker.web.app/update.html',
signInOptions: [
// Leave the lines as is for the providers you want to offer your users.
//firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//firebase.auth.GithubAuthProvider.PROVIDER_ID,
firebase.auth.EmailAuthProvider.PROVIDER_ID,
//firebase.auth.PhoneAuthProvider.PROVIDER_ID
],
// Terms of service url.
tosUrl: 'https://hva-bathroom-tracker.web.app/',
// Privacy policy url.
privacyPolicyUrl: 'https://hva-bathroom-tracker.web.app/'
};
try{ 
    ui.start('#firebaseui-auth-container', uiConfig);
}catch(e){
    console.log(e);
}


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// END AUTH


// DATABASE STUFF

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
});

function changeStatus(bathroom, status) {
    set(ref(database, 'bathroomStatus/' + bathroom), {
        status: status
    });
    updateIcons();
}

window.changeStatus = changeStatus;

// DATABASE STUFF END


//update js stuff

function updateIcons(){

const dbRef = ref(firebase.database());
get(child(dbRef, 'bathroomStatus/')).then((snapshot) => {
    if (snapshot.exists()) {
        if(snapshot.val()["m-atrium"]["status"] == "closed"){
            document.getElementById("m-atrium-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-atrium"]["status"] == "open"){
            document.getElementById("m-atrium-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["m-gym"]["status"] == "closed"){
            document.getElementById("m-gym-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-gym"]["status"] == "open"){
            document.getElementById("m-gym-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["m-upstairs-D"]["status"] == "closed"){
            document.getElementById("m-upstairs-D-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-upstairs-D"]["status"] == "open"){
            document.getElementById("m-upstairs-D-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["m-downstairs-D"]["status"] == "closed"){
            document.getElementById("m-downstairs-D-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-downstairs-D"]["status"] == "open"){
            document.getElementById("m-downstairs-D-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["m-upstairs-F"]["status"] == "closed"){
            document.getElementById("m-upstairs-F-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-upstairs-F"]["status"] == "open"){
            document.getElementById("m-upstairs-F-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["m-downstairs-F"]["status"] == "closed"){
            document.getElementById("m-downstairs-F-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["m-downstairs-F"]["status"] == "open"){
            document.getElementById("m-downstairs-F-icon").innerHTML = "🟢";
        };

        if(snapshot.val()["f-atrium"]["status"] == "closed"){
            document.getElementById("f-atrium-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-atrium"]["status"] == "open"){
            document.getElementById("f-atrium-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["f-gym"]["status"] == "closed"){
            document.getElementById("f-gym-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-gym"]["status"] == "open"){
            document.getElementById("f-gym-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["f-upstairs-D"]["status"] == "closed"){
            document.getElementById("f-upstairs-D-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-upstairs-D"]["status"] == "open"){
            document.getElementById("f-upstairs-D-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["f-downstairs-D"]["status"] == "closed"){
            document.getElementById("f-downstairs-D-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-downstairs-D"]["status"] == "open"){
            document.getElementById("f-downstairs-D-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["f-upstairs-F"]["status"] == "closed"){
            document.getElementById("f-upstairs-F-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-upstairs-F"]["status"] == "open"){
            document.getElementById("f-upstairs-F-icon").innerHTML = "🟢";
        };
        if(snapshot.val()["f-downstairs-F"]["status"] == "closed"){
            document.getElementById("f-downstairs-F-icon").innerHTML = "🔴";
        };
        if(snapshot.val()["f-downstairs-F"]["status"] == "open"){
            document.getElementById("f-downstairs-F-icon").innerHTML = "🟢";
        };
        
        if(window.location.pathname != '/update.html'){
            if(snapshot.val()["m-atrium"]["status"] == "closed"){
                document.getElementById("m-atrium-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-atrium"]["status"] == "open"){
                document.getElementById("m-atrium-text").innerHTML = "Open";
            };
            if(snapshot.val()["m-gym"]["status"] == "closed"){
                document.getElementById("m-gym-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-gym"]["status"] == "open"){
                document.getElementById("m-gym-text").innerHTML = "Open";
            };
            if(snapshot.val()["m-upstairs-D"]["status"] == "closed"){
                document.getElementById("m-upstairs-D-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-upstairs-D"]["status"] == "open"){
                document.getElementById("m-upstairs-D-text").innerHTML = "Open";
            };
            if(snapshot.val()["m-downstairs-D"]["status"] == "closed"){
                document.getElementById("m-downstairs-D-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-downstairs-D"]["status"] == "open"){
                document.getElementById("m-downstairs-D-text").innerHTML = "Open";
            };
            if(snapshot.val()["m-upstairs-F"]["status"] == "closed"){
                document.getElementById("m-upstairs-F-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-upstairs-F"]["status"] == "open"){
                document.getElementById("m-upstairs-F-text").innerHTML = "Open";
            };
            if(snapshot.val()["m-downstairs-F"]["status"] == "closed"){
                document.getElementById("m-downstairs-F-text").innerHTML = "Closed";
            };
            if(snapshot.val()["m-downstairs-F"]["status"] == "open"){
                document.getElementById("m-downstairs-F-text").innerHTML = "Open";
            };
            
            if(snapshot.val()["f-atrium"]["status"] == "closed"){
                document.getElementById("f-atrium-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-atrium"]["status"] == "open"){
                document.getElementById("f-atrium-text").innerHTML = "Open";
            };
            if(snapshot.val()["f-gym"]["status"] == "closed"){
                document.getElementById("f-gym-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-gym"]["status"] == "open"){
                document.getElementById("f-gym-text").innerHTML = "Open";
            };
            if(snapshot.val()["f-upstairs-D"]["status"] == "closed"){
                document.getElementById("f-upstairs-D-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-upstairs-D"]["status"] == "open"){
                document.getElementById("f-upstairs-D-text").innerHTML = "Open";
            };
            if(snapshot.val()["f-downstairs-D"]["status"] == "closed"){
                document.getElementById("f-downstairs-D-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-downstairs-D"]["status"] == "open"){
                document.getElementById("f-downstairs-D-text").innerHTML = "Open";
            };
            if(snapshot.val()["f-upstairs-F"]["status"] == "closed"){
                document.getElementById("f-upstairs-F-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-upstairs-F"]["status"] == "open"){
                document.getElementById("f-upstairs-F-text").innerHTML = "Open";
            };
            if(snapshot.val()["f-downstairs-F"]["status"] == "closed"){
                document.getElementById("f-downstairs-F-text").innerHTML = "Closed";
            };
            if(snapshot.val()["f-downstairs-F"]["status"] == "open"){
                document.getElementById("f-downstairs-F-text").innerHTML = "Open";
            };
        }

    } else {
        console.log("No data available");
    }
}).catch((error) => {
  console.error(error);
});


}

try{
    updateIcons();
}catch (e) {
    console.log(e);
}

