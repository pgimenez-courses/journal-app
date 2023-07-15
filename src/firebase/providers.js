import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
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
    const { uid, photoURL } = resp.user;
    
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    console.error(error);
    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async(email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    console.error('Error in loginWithEmailPassword', error);
    return { ok: false, errorMessage: error.message }
  }
}