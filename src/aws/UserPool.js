import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_3yzQez4uu',
  ClientId: '65ebu3b3qcvjci64if0n28l751'
};

const userPool = new CognitoUserPool(poolData);

export default userPool;