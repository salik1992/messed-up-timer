export function storePreferences(ns: string) {
    function getKey(key: string) {
        return `${ns}/${key}`
    }

    function load<T>(key: string, defaultValue: T): T {
        const stored = localStorage.getItem(getKey(key))
        if (stored === null) return defaultValue
        return JSON.parse(stored)
    }

    function save<T>(key: string, value: T) {
        localStorage.setItem(getKey(key), JSON.stringify(value))
    }

    return { load, save }
}
