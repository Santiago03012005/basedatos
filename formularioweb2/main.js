// Conectando con firebase
const firebaseConfig = {
    apiKey: "AIzaSyAdPeNIovI5YULUB_GJgI8dkqtNo_C7U5Q",
    authDomain: "registroweb-4f81c.firebaseapp.com",
    projectId: "registroweb-4f81c",
    storageBucket: "registroweb-4f81c.appspot.com",
    messagingSenderId: "244996046521",
    appId: "1:244996046521:web:fd0e5c8fabb95a2226e568"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// llamando elementos de html
let btnRegistrar = document.getElementById('btnregistrar');
let btningresar = document.getElementById('btningresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btncerrarsesion = document.getElementById('btncerrarsesion');
let btngoogle = document.getElementById('btngoogle');
let btnfacebook = document.getElementById('btnfacebook');

//Función Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtemail').value;
    let password = document.getElementById('txtpassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("Inicio de sesión correcto");
            cargarJSON();
            
            contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
            formulario.classList.replace('mostrar', 'ocultar');
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})


//Función Inicar Sesión//
btningresar.addEventListener('click',()=>{
    let email = document.getElementById('txtemail').value;
    let password=document.getElementById('txtpassword').value;
    console.log(" tu email " + email +" y tu contraseña es " + password)

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("Inicio sesion correctamente")
    cargarJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
    
})


    //Función Cerrar Sesión
    btncerrarsesion.addEventListener('click', ()=> {
        firebase.auth().signOut().then(() =>{
            console.log("Cierre de sesión correcto");
            
            contenidoDeLaWeb.classList.replace('mostrar','ocultar');
            formulario.classList.replace('ocultar', 'mostrar');
        }).catch((error)=> {
            console.log("Error con el cierre de Sesión");
        });
    })
 

    //Función escucho si esta activo o inactivo
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          cargarJSON();
        } else {
        }
      });


   //Función Login con Google
   btngoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log('Inició sesión con google');
    cargarJSON();
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('');
  });
   })
      
   //Función Login con Facebook
   btnfacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    cargarJSON();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
   })

//Funcion llamando al json

function cargarJSON(){
    fetch('laptops.json')
    .then(function(res) {
        return res.json();
    })

.then((data) => {
    console.log(data);
    let html = '';
    data.forEach((lap) => {
         html += `
         <div class="producto">
         <p>${lap.nombre}</p>
         <p>${lap.modelo}</p> 
         <img src=${lap.img} height="200px"> 
         </div>
       `;
    });
    document.getElementById('resultado').innerHTML= html;
})
} 