import { Auth } from 'aws-amplify';

export const confirmRegistration = (username, code, cb) => {

  Auth.confirmSignUp(username, code).then(data => cb(data, null))
    .catch(err => cb(null, err));

}

