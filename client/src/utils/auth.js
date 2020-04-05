const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        fetch('/user', {
            credentials: 'include'
        })
        .then((res) => {
            this.isAuthenticated = true
            if(typeof cb === 'function'){
                cb(res.json().user);
            }
        })
        .catch((err) => {
            console.log('errrr fecthing auth of user')
        });
    },
    signout(cb){
        fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then((res) => {
            this.isAuthenticated = false;
            if(typeof cb === 'function'){
                //user was logged out
                cb(true)
            }
        })
        .catch((err) => {
            console.log('err logging user out');
            if(typeof cb === 'function') {
                //user was not logged out
                cb(false)
            }
        })
    }
}