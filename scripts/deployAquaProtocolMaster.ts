import { toNano } from 'ton-core';
import { AquaProtocolMaster } from '../wrappers/AquaProtocolMaster';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const aquaProtocolMaster = provider.open(AquaProtocolMaster.createFromConfig({}, await compile('AquaProtocolMaster')));

    await aquaProtocolMaster.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(aquaProtocolMaster.address);

    // run methods on `aquaProtocolMaster`
}
