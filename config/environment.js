const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'nsrivastava645645@gmail.com',
            pass: '8700261067@NsNs'
        }
    },
    google_client_id: "959267981699-9jkomcga3ut3ofvl3jv31f6vb6nr6bdg.apps.googleusercontent.com",
    google_client_secret: "mc0RqwSKtS2N27BDf25hzdyF",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : "chatterstop",

}

const production = {
    name: 'production'
}


module.exports = development;