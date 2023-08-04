import { auth,db } from "./firebase.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { push,set,ref} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

window.signUp=()=>
{
    let name=document.getElementById("name").value
    let phone=document.getElementById("phone").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const userId = userCredential.user.uid;
        set(ref(db, `users/${userId}`), {
          name: name,
          phone:phone,
          email: email, 
         user:userId
        });
        Swal.fire({
            icon: 'success',
            title: 'Account Created Successfully',
            
    
          }).then(()=>{
              location.replace("../login.html");
          })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
 console.log(errorMessage);
  });
}

window.login=()=>{
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        icon: 'success',
        title: 'Login Successfully',
        

      }).then(()=>{
          location.replace("../index.html")
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,

      })
    });


}