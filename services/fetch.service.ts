


class FetchService {

    endpoint: string = process.env.API!

    constructor(endpoint: string) {
        this.endpoint += endpoint
    }

    async get(url: string, headers: Record<string, any> = {}) {

        const response = await fetch(`${this.endpoint}${url}`, {
            method: 'GET',
        })

        const json = await response.json()

        if (!response.ok) {
            return {
                request: {
                    success: response.ok,
                    statusCode: response.status
                }
            }
        }

        return {
            data: json,
            request: {
                success: response.ok,
                statusCode: response.status
            }
        }
    }

    async post(url: string, body: any, headers: Record<string, any> = {}) {
        let send = body

        if (body instanceof FormData === false) {
            send = JSON.stringify(send)
            headers["content-type"] = 'application/json'
        }

        const response = await fetch(`${this.endpoint}${url}`, {
            method: 'POST',
            body: send,
        })
        const json = await response.json()

        if (!response.ok) {
            return { request: { success: false, statusCode: response.status } }
        }

        return {
            data: json,
            request: {
                success: response.ok,
                statusCode: response.status
            }
        }

    }







}

export default FetchService