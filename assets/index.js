import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { push, set, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// curenct user

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem("userId", uid)
    console.log(uid);
    const dbRef = ref(db);
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("name").innerHTML = snapshot.val().name
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });



  } else {
    location.replace('../login.html')
  }
});




//   Add Budget

window.addBudget = () => {
  let uid = localStorage.getItem("userId")
  let bud = document.getElementById("budget");
  if(bud.value=="" ){
    bud.style.borderBottom="1px solid red"
    Swal.fire({
      icon: 'error',
      title: 'Please Fill This Field',
    })}
    else{

      set(ref(db, 'Budget/' + uid), {
        budget: bud.value,
        id: uid
      })
      bud.value = ""
      Swal.fire({
        icon: 'success',
        title: 'Budget Added',
        
        
      })
      showBudget()
    }
  }




window.exp = () => {
  let uid = localStorage.getItem("userId");
  let amo = document.getElementById("amount");
  let name = document.getElementById("title");
  let prevAmo = amo.value;
  let bud = +localStorage.getItem("budget");
  let exp = +localStorage.getItem("exp");
  if(amo.value=="" || name.value==""){
amo.style.borderBottom="1px solid red"
name.style.borderBottom="1px solid red"
Swal.fire({
  icon: 'error',
  title: 'Please Fill This Field',
})
  }
  else{

  
  if (exp + parseInt(amo.value) > bud) {
    alert("Expense exceeds the budget. You cannot add this expense.");
  } 
  else {
  set(push(ref(db, `expence`)), {
    amount: amo.value,
    name: name.value,
    id: uid
  })
  amo.value = ""
  name.value = ""
  Swal.fire({
    icon: 'success',
    title: 'Expence Added',
  })
  showBudget()
}
}

}









function showBudget() {
  let tr = document.getElementById("tbody");
  let arr = [];
  let sum = 0;
  // Show Budget
  let uid = localStorage.getItem("userId")
  const dbRef = ref(db);
  get(child(dbRef, `Budget/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {

      document.getElementById("bug").innerHTML = "$" + snapshot.val().budget
      localStorage.setItem("budget", snapshot.val().budget)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  // End Budget

  // Show Expence Budget

  document.getElementById("expence").innerHTML = "$ 0"
  document.getElementById("bachi").innerHTML = `$ 0`
  let bud = localStorage.getItem("budget")
  get(dbRef, `expence`).then((snapshot) => {
    if (snapshot.exists()) {
      tr.innerHTML = ""
      for (const key in snapshot.val().expence) {
        let { name, amount, id } = snapshot.val().expence[key]
        if(uid===id){

          arr.push(amount)
          console.log(arr);
          sum = 0;
          for (const k in arr) {
            sum += parseInt(arr[k])
            document.getElementById("expence").innerHTML = "$" + sum
            localStorage.setItem("exp", sum)
            document.getElementById("bachi").innerHTML = `$ ${bud - sum}`
          }
          tr.innerHTML += `
          
          <tr id="${key}">
          <td >${name}</td>
          <td  >${amount}</td>
          <td class="noBorder">
          
          <button onclick="edit('${key}','${name}','${amount}')" ><i class="fa-solid fa-file-pen"></i></button>
          <button onclick="del('${key}')"><i class="fa-solid fa-trash-can"></i></button>
          
          </td>
          </tr>
          
          
          `
          
          
          
          
        }

      }
    }
      else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}


showBudget()

// Edit DATA

window.edit = (id,name,amount) => {
  // const dbRef = ref(db, `expence/${id}`);

let tr=document.getElementById(id)

tr.innerHTML=`
<td > 
<div class="input-box">
<i class="fa-solid fa-file-signature"></i>
<input class="${id}-name" id="title" value="${name}" type="text" required>
<div class="underline"></div>
<span>Title</span>
</div> 
</td>
<td ">
<div class="input-box">
<i class="fa-solid fa-dollar-sign"></i>
<input class="${id}-amount" id="amount" value="${amount}" type="number" required>
<div class="underline"></div>
<span>Amount</span>
</div>
</td>

<td class="noBorder">

<button onclick="save('${id}')" ><i class="fa-regular fa-floppy-disk"></i></button>
<button onclick="del('${id}')"><i class="fa-solid fa-trash-can"></i></button>

</td>

`



}

// Delete

window.del = (id) => {
  const dbRef = ref(db, `expence/${id}`);
  console.log("size", db.size);
  remove(dbRef).then(() => {
    showBudget()
    console.log("data Deleted");
  }
  )


}

window.save = (id) => {
  const dbRef = ref(db, `expence/${id}`);
  let uid = localStorage.getItem("userId")
let name=document.querySelector(`.${id}-name`)
let price=document.querySelector(`.${id}-amount`)



console.log(name,price);

  set(dbRef, {
    amount:price.value,
    name: name.value,
    id: uid
  })
  
  showBudget()

}




















// Log OUt
window.logout = () => {
  signOut(auth).then(() => {
    location.replace('../login.html')
  }).catch((error) => {
    console.log(error);
  });

}