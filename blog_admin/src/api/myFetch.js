/*
专门用于发送fetch请求
 */

const myFetch = async (url, data = {}, method = "GET") => {
    if (method === "GET") {
        url = url + "/?"
        for (k in data) {
            url += k + "=" + data[k] + "&"
        }
        const newUrl = url.substring(url.length - 1, 1)
        const respone = await fetch(newUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (respone) {
            return respone.json()
        }
    } else if (method === "POST") {
        const response = fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response
    }
}