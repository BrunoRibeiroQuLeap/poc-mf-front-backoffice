import { ReactNode } from "react";

type TMenuItem = {
	name: string
	onClick: () => void
}

export interface HeaderProps {
	productName: string
	productVersion: string
	userName: string
	userAvatarUrl?: string
	menuItems?: TMenuItem[]
	onLogOut?: () => void
	className?: string
	productIcon?: ReactNode
}