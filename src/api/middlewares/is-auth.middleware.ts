import { Request } from 'express';
import jwt from 'express-jwt';

import config from '@src/config';
import { UnauthorizedException } from '@src/config/custom-error.config';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 */
const getTokenFromHeader = (req: Request) => {
  const auth = req.headers.authorization;
  /**
   * @TODO handle Edgs and Explorer cases
   */
  if (!auth) {
    throw new UnauthorizedException('getTokenFromHeader', 'No token was found');
  }
  if (auth.split(' ')[0] === 'Token' || auth.split(' ')[0] === 'Bearer') {
    return auth.split(' ')[1];
  }
  return null;
};

const isAuth: jwt.RequestHandler = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, //How to extract the JWT from the request
  algorithms: [config.jwtAlgorithm],
});

export default isAuth;
