import { useState } from "react"

export const LocalStorage = (key, initialValue) => {
    const [storedvalue, setStoreValue] = useState(initialValue)

    const setValue = (value) => {
        window.localStorage.setItem(key, value)
        setStoreValue(value)
    }
    return [storedvalue, setValue]
}       