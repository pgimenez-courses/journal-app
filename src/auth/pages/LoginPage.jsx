import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Google } from '@mui/icons-material'
import { Link as RouteLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startLoginWithEmailPassword, startGoogleSignIn } from '../../store/auth'

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @.'],
  password: [(value) => value.length >= 1, 'La contraseña es obligatorio.']
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth )

  const dispatch = useDispatch();

  const {
    email,
    password,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange
  } = useForm({ email: '', password: '' }, formValidations);

  const isAuthenticating = useMemo( () => status ===  'checking', [status] )
  const [formSubitted, setFormSubitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubitted(true);

    if (!isFormValid) return;

    dispatch( startLoginWithEmailPassword(email, password) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Login">
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={ onSubmit }
      >
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>  
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error= { !!emailValid && formSubitted }
              helperText={ (!!emailValid && formSubitted) ? emailValid : '' }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>  
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error= { !!passwordValid && formSubitted }
              helperText={ (!!passwordValid && formSubitted) ? passwordValid : '' }
            />
          </Grid>

          <Grid
            item
            xs={ 12 }
            sx={{ mt: 2 }}
            display={ errorMessage ? '' : 'none' }
          >
            <Alert severity="error">{ errorMessage }</Alert>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                disabled = { isAuthenticating }
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                disabled = { isAuthenticating }
                variant="contained"
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouteLink } color="inherit" to="/auth/register" >
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
