import Request from 'request';

class REQUESTAPI {
    url: string = '';
    //authorize: GET request to authorize the current user, generate and return back the user web token string.
    authorize(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'authorize',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    // /loginUser POST request to authenticate a user email and password. 
    // POST Parameters:
    // email
    // password
    // Sample Response:
    // { "status" : "ok or error", "message" : "response message", 'user': 'logged in user data' }
    loginUser(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'loginUser',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    // /registerUser POST request to create a new user account and send verification mail after successful account creation. 
    // POST Parameters:
    // user full name
    // email
    // password
    // Sample Response:
    // { "status" : "ok or error", "message" : "response message" }
    registerUser(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'registerUser',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    // /resetPassword POST request to send reset password link to user email. 
    // POST Parameters:
    // email
    // Sample Response:
    // { "status" : "ok or error", "message" : "response message" }
    resetPassword(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'resetPassword',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    // /resendVerificationMail POST request to send resend an email verification link to user email. 
    // POST Parameters:
    // email
    // Sample Response:
    // { "status" : "ok or error", "message" : "response message" }
    resendVerificationMail(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'resendVerificationMail',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    // /subscription POST request to verify user subscription after a purchase in the android app. 
    // POST Parameters:
    // packageName: android app package name
    // plan: the subscription plan
    // token: the purchase token
    // email: the subscribed user email address
    // Sample Response:
    // { "status" : "ok or error", "expiry_date" : "subscription expiry date" }
    subscription(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'subscription',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
    constructor() {
    }

    // login_customer
    // send
    // {
    //     "data": {
    //         "email": "",
    //             "password": ""
    //     }
    // }
    login_customer(params: any, cb: { (err: any, res: Request.Response, body: any): void } | null) {
        if (cb) {
            //2 ways call
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": this.url + 'login_customer',
                "body": JSON.stringify(params)
            }, cb);
        }
    }
}
export default new REQUESTAPI();