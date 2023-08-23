
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

function testEmail(emailId){
    if(emailRegex.test(emailId)){
        return true;
    }else {
        return false;
    }
}

function testPassword(password){
    if(passwordRegex.test(password)){
        return true;
    }else {
        return false;
    }
}

function testPhoneNumber(phoneNumber){
    if(phoneNumberRegex.test(phoneNumber)){
        return true;
    }else {
        return false;
    }
}

export {testEmail, testPhoneNumber, testPassword};