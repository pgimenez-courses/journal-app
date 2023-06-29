import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
  try {

    const { user } = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
    
  } catch (error) {
    console.error(error)
    const { code, message } = error;
    return {
      ok: false,
      errorCode: code,
      errorMessage: message
    }
  }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    console.log(resp);
    const { uid, photoURL } = resp.user;
    // TODO: actualizar el displayName en firebase

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message }
  }
}