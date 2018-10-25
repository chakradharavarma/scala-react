import { Auth } from 'aws-amplify';
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


export const login = async (username, password, cb, error) => {
  await Auth.signIn(username, password)
    .catch(err => error(err.message))
  
  const payload = await Auth.currentAuthenticatedUser()
    .catch(err => err)
  
  if (typeof payload === 'string' || payload instanceof String) {
    error(payload)
  }
  else if (typeof payload === 'object' || payload instanceof Object) {
    cb(payload)
  } else {
    console.log(payload)
    console.log(typeof payload)
    alert("what is going on? check console.");
    // todo remove
  }

}

export const confirmRegistration = (username, code, cb) => {

  const cognitoUser = getCognitoUser(username);
  cognitoUser.confirmRegistration(code, true, function (err, result) {
    cb(err, result)
  });

}

