import { checkingCredentials } from './'

export const checkingAuthentication = (email, password) => {
  return async ( dispatch ) => {
    console.log({ email, password })
    dispatch( checkingCredentials() )
  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {
    console.log('startGoogleSignIn');
    dispatch( checkingCredentials() )
  }
}