import RenderAuthorized from '../components/Authorized';
import { getCookie } from './utils';

const authType = getCookie('type') || 'guest';
let Authorized = RenderAuthorized(authType); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  const authTypeLatest = getCookie('type') || 'guest';
  Authorized = RenderAuthorized(authTypeLatest);
};

export { reloadAuthorized };
export default Authorized;
