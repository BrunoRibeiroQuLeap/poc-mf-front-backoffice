import React, { ComponentType, FunctionComponent, useState } from 'react'

const closeState = {
  open: false,
  resolve: () => undefined as void,
  reject: () => undefined as void,
  payload: undefined as never,
}

/**
 * Props injected by withConfirmDialog
 */
type TWithConfirmDialogProps<D> = {
  /** Promise to open the dialog.
   * Resolved when user type correctly finish the dialog.
   * Rejected otherwise.
   */
  openConfirmDialog: (payload: D) => Promise<void>
}

type ConfirmDialog<D> = FunctionComponent<{
  open: boolean
  onSuccess: () => void
  onCancel: () => void
  payload?: D
}>

/**
 * Convert a ConfirmDialog component into a HOC "withConfirmDialog" that expose a promise function
 * to be called on the wrapped component that shows the dialog
 * @param Dialog the component that will be displayed when the dialog is open
 * @param shouldOpenConfirmDialog a optional function that say if the dialog should be opened or not. You can use React Hooks on this function
 */
const wizardWithConfirmDialog =
  <D extends {}>(Dialog: ConfirmDialog<D>, shouldOpenConfirmDialog?: () => boolean) =>
    <T extends TWithConfirmDialogProps<D>>(WrappedComponent: ComponentType<T>): ComponentType<Omit<T, 'openConfirmDialog'>> =>
      (props) => {
        const [dialogState, setDialogState] = useState(closeState)
        const openConfirmDialog = (
          shouldOpenConfirmDialog
            ? shouldOpenConfirmDialog()
            : true
        )

        return (
          <>
            <Dialog
              open={dialogState.open}
              onCancel={() => {
                dialogState.reject()
                setDialogState(closeState)
              }}
              onSuccess={() => {
                dialogState.resolve()
                setDialogState(closeState)
              }}
              payload={dialogState.payload}
            />

            <WrappedComponent
              openConfirmDialog={
                (payload: never) => new Promise((resolve, reject) => {
                  if (openConfirmDialog) {
                    setDialogState({ open: true, resolve, reject, payload })
                    return
                  }

                  resolve()
                })
              }
              // TODO: I really don't know why is necessary to set the props as any type
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...props as any}
            />
          </>
        )
      }

export { ConfirmDialog, TWithConfirmDialogProps }
export default wizardWithConfirmDialog
