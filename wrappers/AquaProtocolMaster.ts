import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type AquaProtocolMasterConfig = {};

export function aquaProtocolMasterConfigToCell(config: AquaProtocolMasterConfig): Cell {
    return beginCell().endCell();
}

export class AquaProtocolMaster implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new AquaProtocolMaster(address);
    }

    static createFromConfig(config: AquaProtocolMasterConfig, code: Cell, workchain = 0) {
        const data = aquaProtocolMasterConfigToCell(config);
        const init = { code, data };
        return new AquaProtocolMaster(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
