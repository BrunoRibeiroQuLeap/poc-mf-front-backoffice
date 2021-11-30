import React, { FunctionComponent, FormEvent, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > div:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },

    '& button': {
      alignSelf: 'flex-end',
    },
  },
}))

interface Props {
  onSubmit: (username: string, password: string) => void
  errorMessage?: string | null
  presetAccounts?: Array<{ username: string, password: string }>
}

/**
 * A simple login form. It's just the visual - it doesn't make any requests.
 * @param {Function} onSubmit Callback called when the user make the submit
 * @param {string | null} errorMessage Error message that should be displayed below the form
 * @param {Array} presetAccounts Buttons to autofill the form and log in, useful to development. It should not be used on production!
 */
const LoginForm: FunctionComponent<Props> = ({ onSubmit, errorMessage, presetAccounts = [] }) => {
  const classes = useStyles({})
  const { t } = useTranslation('photon')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} className={classes.root}>
        <TextField
          required
          label={t('login-form-username')}
          onChange={event => setUsername(event.target.value)}
        />

        <TextField
          required
          label={t('login-form-password')}
          type='password'
          onChange={event => setPassword(event.target.value)}
        />

        {
          errorMessage &&
          (
            <Typography color='error'>
              {t('login-form-error-message', { message: errorMessage })}
            </Typography>
          )
        }

        <Button type='submit'>{t('login-form-submit')}</Button>
      </form>
      {
        presetAccounts.map(account => (
          <Button className='obsoleted-button' key={account.username} onClick={() => onSubmit(account.username, account.password)}>
            {account.username}
          </Button>
        ))
      }
    </>
  )
}

export default LoginForm
