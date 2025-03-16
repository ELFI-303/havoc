import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: '${userPoolId}',
  ClientId: '${cliendId}'
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
