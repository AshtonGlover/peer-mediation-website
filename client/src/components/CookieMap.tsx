var globalMap = new Map<String, boolean>();

export const addToMap = (cookie: String, hasReplied: boolean) => {
    globalMap.set(cookie, hasReplied);
}

export const getHasReplied = (cookie: String) => {
    return globalMap.get(cookie);
}