import type { DialogProps } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type ReactElement,
  type SetStateAction,
} from 'react'
import { CircleButton, Dialog } from './lib'

type Fn = (...args: any[]) => any

function callAll(...fns: Fn[]) {
  return (...args: any[]) => fns.forEach((fn) => fn(...args))
}

type ModalContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
} | null

const ModalContext = createContext<ModalContextType>(null)

function Modal({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModalContext must be used within a Modal')
  return context
}

function ModalDismissButton({ children }: { children: ReactElement }) {
  const { setIsOpen } = useModalContext()
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick),
  })
}

function ModalOpenButton({ children }: { children: ReactElement }) {
  const { setIsOpen } = useModalContext()
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick),
  })
}

function ModalContentsBase(props: DialogProps) {
  const { isOpen, setIsOpen } = useModalContext()
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {props.children}
    </Dialog>
  )
}

function ModalContents({
  title,
  children,
  ...props
}: DialogProps & { title?: string }) {
  return (
    <ModalContentsBase {...props}>
      <div className="flex flex-end">
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 className="text-center text-[2em]">{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
