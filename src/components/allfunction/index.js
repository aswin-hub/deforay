
export let users = [];
let _id = 100

export function getUsers(index = 0, range = 100) {
    return users.slice(index, index + range)
}

export function getUser (id) {
    if (id != undefined) {
        const res = users.filter(x => x.id == id)
        if (res.length === 1) {
            return res[0]
        } else {
            return null
        }
    }
}

export function addUser(data = {}) {
    data.id = _id++
    users.push(data)
    return data
}

export function removeUser(id) {
    users = users.filter(x => x.id != id)
}

export function patchUser(id, data = {}) {
    users = users.map(x => x.id == id && Object.assign(x, data))
    return getUsers(id)
}