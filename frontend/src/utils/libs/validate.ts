/*
* author: miroldev
* title: Validate Form Data
* overview: Utility function for Validate Form data.
* */

export const validateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.length < 1) {
        return false
    }

    return email.match(validRegex);
}


export const validatePassword = (password: string) =>{
    return password.length >= 8;
}