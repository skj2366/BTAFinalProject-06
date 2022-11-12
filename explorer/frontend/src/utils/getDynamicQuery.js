import { LOCALNET_API_URL, MAINNET_API_URL, TESTNET_API_URL } from '../config';
export default function getDynamicQuery(state_net) {
    if (state_net === 'localnet') return LOCALNET_API_URL;
    else if (state_net === 'mainnet') return MAINNET_API_URL;
    else return TESTNET_API_URL;
}
