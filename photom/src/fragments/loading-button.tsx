import Button, { ButtonProps } from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { FunctionComponent } from 'react'

interface Props extends ButtonProps {
  isLoading: boolean
}

/**
 * LoadingButton is a MaterialUi Button with loading state built-in
 * @param {boolean} isLoading if should show the circular progress icon
 * @param - Docs for others props can be found on https://material-ui.com/api/button/
 */
const LoadingButton: FunctionComponent<Props> = ({ isLoading, children, ...props }) => (
  <Button
    endIcon={isLoading && (
      <CircularProgress size={16} />
    )}
    disabled={isLoading}
    {...props}
  >
    {children}
  </Button>
)

export default LoadingButton
