/*
 * Mock call to a login endpoint
 * Accepts any non-empty username
 * Only accepts tha password "password"
 * Simulates a 1 second network latency
 *
 * Returns a user token.
 */
export const login = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username) {
        return reject(new Error('Please enter your username'));
      }
      if (!password) {
        return reject(new Error('Please enter your password'));
      }
      if (password !== 'password') {
        return reject(new Error('Incorrect password'));
      }

      const userToken = `token@${username}`;
      return resolve(userToken);
    }, 1000); // Simulate 1s Network latency
  });

/*
 * Mock call to an authentication endpoint
 * Accepts user token of the from "token@{username}"
 * Returns the username if successful
 * Simulate a 1 second network latency
 */
export const authenticate = userToken =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userToken) {
        return reject(new Error('Invalid Token'));
      }

      const username = userToken.substring(userToken.indexOf('@') + 1);
      return resolve(username);
    }, 1000); // Simulate 1s Network latency
  });

/*
 * Mock call to a logout endpoint
 * Accepts any non-empty token
 * Simulate a 1 second network latency
 */
export const logout = userToken =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userToken) {
        return reject(new Error('Invalid Token'));
      }
      return resolve();
    }, 1000);
  });
