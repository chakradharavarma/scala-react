import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { COGNITO_CONFIG } from './consts'

export const asCognitoAttribute = (name, value) => {
  return {
    Name: name,
    Value: value
  };
}

export const getCognitoUserPool = () => {
  return new CognitoUserPool(COGNITO_CONFIG)
}


export const getCognitoUser = (username) => {
  return new CognitoUser({
    Username: username,
    Pool: getCognitoUserPool(),
  });
}

export const register = (username, password, email, callback) => {
  const attributes = [
    asCognitoAttribute('email', email),
  ]
  const userPool = getCognitoUserPool();
  userPool.signUp(username, password, attributes, null, function (err, result) {
    callback(err, result);
  });
}


export const login = (username, password, cb) => {
  const authenticationData = {
      Username : username,
      Password : password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = getCognitoUser(username);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      cb(result)
    },
    onFailure: function (err) {
      cb(null, err)
    },
  });

}

export const confirmRegistration = (username, code, callback) => {

  const cognitoUser = getCognitoUser(username);
  cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) {
      alert('err')
      console.log(err)
    }else {

    }
  });

}

