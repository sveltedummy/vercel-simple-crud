const api = '/api/newcrud';

export function getJSON(e) {
    return Object.fromEntries((new FormData(e.target)).entries())
}

function handleResponse(res) {
    if (res.ok) return res.json()
    else res.text().then((text) => Promise.reject(text))
}

export function readItems() {
    return fetch(api)
        .then(handleResponse)
}

export function createItem(item) {
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(handleResponse)
}

export function updateItem({person, _id}) {
    return fetch(api, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({person, _id})
    })
    .then(handleResponse)
}

export function deleteItem(_id) {
    return fetch(api, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({_id})
    })
    .then(handleResponse)
}

// export function readItem(_id) {
//     return fetch(api, {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({_id})
//     })
// }