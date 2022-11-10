import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  toastSuccessNotify,
  toastErrorNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";


//* Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, displayName,navigate) => {

  //? yeni kullanıcı etme register...
  try {
     await createUserWithEmailAndPassword(
      auth,
      email,
      password,
     );
    
    toastSuccessNotify("register succsess");
    await updateProfile(auth.currentUser, {
      displayName:displayName
    }
    )
    navigate("/")


  } catch (error) {
    toastErrorNotify(error.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("login succsess")
  } catch (error) {
    toastErrorNotify(error.message);
  }
};




export const userObserver = (setIsCurrentUser) => {


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, photoURL, displayName } = user
      
      setIsCurrentUser({ email, photoURL, displayName });
    } else {
      
      setIsCurrentUser(false)
        console.log("user out")
      }
  })
  

}

export const logOut = () => {
  
  signOut(auth)
  toastSuccessNotify("logout succsess");




}


export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider()
  // eslint-disable-next-line no-undef
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastSuccessNotify("login succsess");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error)
      toastErrorNotify(error)
      // ...
    });

}
export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};