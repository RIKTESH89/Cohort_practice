import { atom, selector } from 'recoil'
export const senderIdAtom = atom ({
    key: "senderIdAtom",
    default : ""
})

export const currentChatState = atom({
    key: 'currentChatState',
    default: {},
  });