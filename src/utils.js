//login api
export const login = (credential) => {
    // credential: {username: value, password: value}
    // request option：method, url, data
    const { username, password } = credential;
    const loginUrl = `/login?username=${username}&password=${password}`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    }).then( response => {
        //case 1: login success
        console.log(response)

        //case 2: login failed
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in")
        }
    })
}
export const signup = (data) => {
    const signupUrl = "/signup";

    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};
