import { singInWithGoogle, registerUserWithEmailPassword } from '../../firebase/providers'
import { checkingCredentials, login, logout } from './'

export const checkingAuthentication = (email, password) => {
  return async ( dispatch ) => {
    console.log({ email, password })
    dispatch( checkingCredentials() )
  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() )

    const result = await singInWithGoogle()
    if ( !result.ok ) return dispatch(logout(result.errorMessage));

    dispatch( login(result) )
    
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() )

    const result = await registerUserWithEmailPassword({ email, password, displayName })
    console.log(result);
    if ( !result.ok ) return dispatch(logout(result.errorMessage));


  }
}