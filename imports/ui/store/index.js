import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const authenticated = atom({
    key: 'authenticated',
    default: {
        check: false,
        user: []
    },
    effects_UNSTABLE: [persistAtom],
})

export { authenticated }