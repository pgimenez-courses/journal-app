import { useDispatch } from 'react-redux'
import { Link as RouteLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useState } from 'react'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @.'],
  password: [(value) => value.length >= 6, 'El password tiene que tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubitted, setFormSubitted] = useState(false);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubitted(true);

    if ( !isFormValid ) return;
    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayout title="Crear cuenta">
      <h3>Formulario: { isFormValid ? 'Valido' : 'Incorrecto' }</h3>
      <form onSubmit={ onSubmit }>
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>  
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              error= { !!displayNameValid && formSubitted }
              helperText={ (!!displayNameValid && formSubitted) ? displayNameValid : '' }
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>  
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              error={ !!emailValid && formSubitted }
              helperText={ (!!emailValid && formSubitted) ? emailValid : '' }
              name="email"
              value={ email }
              onChange={onInputChange }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>  
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              error= { !!passwordValid && formSubitted }
              helperText={ passwordValid }
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } >
              <Button
              type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={ RouteLink } color="inherit" to="/auth/login" >
              ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
