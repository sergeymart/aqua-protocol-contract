import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { AquaProtocolMaster } from '../wrappers/AquaProtocolMaster';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('AquaProtocolMaster', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('AquaProtocolMaster');
    });

    let blockchain: Blockchain;
    let aquaProtocolMaster: SandboxContract<AquaProtocolMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        aquaProtocolMaster = blockchain.openContract(AquaProtocolMaster.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await aquaProtocolMaster.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: aquaProtocolMaster.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and aquaProtocolMaster are ready to use
    });
});
