import React, { FunctionComponent, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Logo from '../../../static/logo-ql.svg'
import UserMenu from './user-menu';
import { HeaderProps } from './types'

const useStyles = makeStyles(theme => ({
	root: {
		color: theme.palette.common.white,
		padding: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
		justifyContent: 'space-between',
		width: '100%',
	},

	branding: {
		display: 'flex',
		alignItems: 'center',
	},

	productsDetail: {
		display: 'flex',
		alignItems: 'baseline',
	},

	productName: {
		fontWeight: 'bold',
		marginLeft: theme.spacing(4),
	},

	productVersion: {
		marginLeft: theme.spacing(1),
	},

	user: {
		display: 'flex',
		alignItems: 'center',
	},

	userName: {
		textTransform: 'none',
		marginLeft: theme.spacing(1),
	},
}))

const Header: FunctionComponent<HeaderProps> = ({
	productName,
	productVersion,
	userName,
	userAvatarUrl,
	menuItems,
	onLogOut,
	className,
	productIcon,
}) => {
	const classes = useStyles()

	const UserAvatar = (
		userAvatarUrl
			? <Avatar src={userAvatarUrl} imgProps={{ style: { backgroundColor: 'white' } }} />
			: <Avatar>{userName[0]}</Avatar>
	)
	console.log(productIcon)
	return (
		<Grid container className={`${classes.root} ${className}`}>
			<div className={classes.branding}>
				<Logo style={{ width: 60, height: 60, marginRight: 20 }} />
				{productIcon}
				<div className={classes.productsDetail}>
					{() => {
						if (productIcon !== null) {
							return (
								<Typography variant='h5' className={classes.productName}>
									{productName}
								</Typography>
							)
						}
					}
					}

					<Typography className={classes.productVersion}>
						{productVersion}
					</Typography>
				</div>
			</div>

			<div className={classes.user}>
				{UserAvatar}

				<Typography variant='button' className={classes.userName}>
					{userName}
				</Typography>

				<UserMenu
					menuItems={menuItems ? menuItems : []}
					onLogOut={onLogOut ? onLogOut : () => null}
				/>
			</div>
		</Grid>
	)
}

export default Header
