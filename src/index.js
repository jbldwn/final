import { initializeApp } from "firebase/app";

import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseApp = initializeApp({
    apiKey: "AIzaSyCkf3Oc6xBNZjC6uCFfTuKGPiL00UpQYXo",
    authDomain: "emptyproject-2725e.firebaseapp.com",
    projectId: "emptyproject-2725e",
    storageBucket: "emptyproject-2725e.appspot.com",
    messagingSenderId: "776300477226",
    appId: "1:776300477226:web:3941a468a5a5e2c968fc53",
    measurementId: "G-RD3HY96DBM"
});

//initialize firebase
const auth = getAuth(firebaseApp);

//create account sign in account
export function loginListener() {
    console.log("login listeners added");
    /* Create user */
    $("#createAccount").on("click", (e) => {
        //prevents page reload
        e.preventDefault();

        let fName = $("#fnameC").val();
        let lName = $("#lnameC").val();
        let email = $("#emailC").val();
        let pw = $("#pwC").val();

        createUserWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                console.log("user created");
                //Signed up
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error Message: ", errorMessage)
            })
    })
    /* Sign in */
    $("#signIn").on("click", (e) => {
        //prevents page reload
        e.preventDefault();

        let email = $("#email").val();
        let pw = $("#pw").val();

        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {

                /* update logIN btn to LogOUT btn */
                let login = $("#login");
                login[0].style.display = "none";
                let logout = $("#logOut");
                logout[0].style.display = "block";

                //exit modal
                let modal = $("#modal");
                modal[0].style.display = "none";

                logoutListener();

                // Signed in
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error Message: ", errorMessage)
            })
    });
}

//sign out account
function logoutListener() {
    $("#logOut").on("click", (e) => {
        //prevents page reload
        e.preventDefault();

        signOut(auth)
            .then(() => {
                /* reset nav */
                let login = $("#login");
                login[0].style.display = "block";
                let logout = $("#logOut");
                logout[0].style.display = "none";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error Message: ", errorMessage)
            })
    })
}

//empty cart listener
import { emptyCart } from "../dist/model/model";
export function emptyCartListener() {
    $('.emptyCart').on("click", (e) => {
        e.preventDefault();

        emptyCart();
    })
}

//add to cart listener
import { addToCart } from "../dist/model/model";
export function buyNowListener() {
    console.log("buy now listener applied");
    // retrieve class for buy now
    $('.buyBtn').on("click", (e) => {
        //prevent page reload
        e.preventDefault();
        let str = e.target.id;
        let prodID = str.split("_").pop();
        addToCart(prodID)
    })


}

//getContent
import { getContent } from "../dist/model/model";

//routing
function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '');

    if (pageID != '') {
        getContent(pageID);
    } else {
        getContent("home");
    }
}
//modal close
function closeModal() {
    console.log("modal listener added");
    $(".close").on("click", (e) => {
        console.log("toggled");
        $("#modal").toggle();
    })
}
function initURLListener() {
    $(window).on('hashchange', changeRoute);
    closeModal();
    changeRoute();

}

$(document).ready(function () {
    initURLListener();
});
