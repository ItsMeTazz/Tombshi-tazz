import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);

  if (contractName === 'ethGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'ETH');
  } else if (contractName === 'ogreGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'OGRE');
  } else if (contractName === 'toshiGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'TOSHI');
  } else if (contractName === 'TombshiGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'TOMBSHI-TOSHI-LP');
  } else if (contractName === 'tombshitoshiGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'TOMBSHI-TOSHI-LP');
  } else if (contractName === 'toshareethGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'TOSHARE-ETH-LP');
  } else if (contractName === 'usdbCGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'USDBC');
  } else if (contractName === 'axlUsdbCGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'AXLUSDBC');
  } else if (contractName === 'WBondWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'TOSHBOND');
  }

  if (contractName === 'WShareUsdcLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'TOSHARE-USDC-LP');
  } else if (contractName === 'WlrsUsdcLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'TOMBSHI-USDC-LP');
  } else if (contractName === 'WlrsUSDibsLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'TOMBSHI-USDIBS-LP');
  } else {
    // return null;
    return banks.find((bank) => bank.contract === contractName);
  }
};

export default useBank;
