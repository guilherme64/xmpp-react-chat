const user = 'admin@beta.sip2sip.net';
const pass = 'Ff2A6HCp';

const auth = `${user}:${pass}`;
const b64Auth = new Buffer(auth).toString('base64');

export {b64Auth};