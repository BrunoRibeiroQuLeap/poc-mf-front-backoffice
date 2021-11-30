import React, { FunctionComponent, useState, useRef } from 'react'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { useTranslation } from 'react-i18next'
import { TMenuItem } from './'

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.common.white,
    transitionProperty: 'background',
    transitionDuration: '0.5s',
  },

  isActive: {
    backgroundColor: fade(theme.palette.common.white, 0.3),

    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
  },

  userMenu: {
    zIndex: 1,
  },
}))

interface Props {
  menuItems: TMenuItem[]
  onLogOut: () => void
}

const Header: FunctionComponent<Props> = ({ menuItems, onLogOut }) => {
  const classes = useStyles()
  const { t } = useTranslation('photon')
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='user-menu'
        aria-haspopup='true'
        ref={anchorRef}
        onClick={() => setOpen(!open)}
        className={`${classes.button} ${open ? classes.isActive : ''}`}
      >
        <MoreVert />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal className={classes.userMenu}>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id='user-menu-grow'>
                  {menuItems.map(({ name, onClick }) => (
                    <MenuItem key={name} onClick={onClick}>{name}</MenuItem>
                  ))}

                  <MenuItem onClick={onLogOut}>{t('header-log-out')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default Header
