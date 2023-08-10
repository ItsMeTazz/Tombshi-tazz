import React, { useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import useBank from '../../hooks/useBank';
import useWallet from 'use-wallet';
import FarmCard from './FarmCard';
import useStatsForPool from '../../hooks/useStatsForPool';

function Farms(props) {
  const { account } = useWallet();

  // const ethBank = useBank('ethGenesisRewardPool');
  // const ogreBank = useBank('ogreGenesisRewardPool');
  // const toshiBank = useBank('toshiGenesisRewardPool');
  const tombshiBank = useBank('TombshiGenesisRewardPool');
  // const tombitoshiBank = useBank('tombshitoshiGenesisRewardPool');
  // const toshareethBank = useBank('toshareethGenesisRewardPool');
  // const usdbCBank = useBank('usdbCGenesisRewardPool');
  // const axlUsdbCBank = useBank('axlUsdbCGenesisRewardPool');

  // console.log('ethBank', ethBank);
  // console.log('ogreBank', ogreBank)
  // console.log('toshiBank', toshiBank)
  // console.log('tombitoshiBank', tombitoshiBank)
  // console.log('toshareethBank', toshareethBank)
  // console.log('usdbCBank', usdbCBank)
  // console.log('axlUsdbCBank', axlUsdbCBank)

  // const ethBankStats = useStatsForPool(ethBank);
  // const ogreBankStats = useStatsForPool(ogreBank);
  // const toshiBankStats = useStatsForPool(toshiBank);
  const tombshiBankStats = useStatsForPool(tombshiBank);
  // const tombitoshiBankStats = useStatsForPool(tombitoshiBank);
  // const toshareethBankStats = useStatsForPool(toshareethBank);
  // const usdbCBankStats = useStatsForPool(usdbCBank);
  // const axlUsdbCBankStats = useStatsForPool(axlUsdbCBank);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <FarmCard
          bankName="TOMBSHI/TOSHI LP"
          depositFee={3}
          activesOnly={props.activesOnly}
          bank={tombshiBank}
          poolStats={tombshiBankStats}
          account={account}
        />
        {/* <FarmCard
          bankName="ETH"
          depositFee={3}
          activesOnly={props.activesOnly}
          bank={ethBank}
          poolStats={ethBankStats}
          account={account}
        /> */}
        {/* <FarmCard
          bankName="OGRE"
          depositFee={5}
          activesOnly={props.activesOnly}
          bank={ogreBank}
          poolStats={ogreBankStats}
          account={account}
        />
        <FarmCard
          bankName="TOSHI"
          depositFee={1}
          activesOnly={props.activesOnly}
          bank={toshiBank}
          poolStats={toshiBankStats}
          account={account}
        />
      
        <FarmCard
          bankName="axlUSDC"
          depositFee={3}
          activesOnly={props.activesOnly}
          bank={tombitoshiBank}
          poolStats={tombitoshiBankStats}
          account={account}
        />
        <FarmCard
          bankName="TOMBSHI"
          depositFee={0}
          activesOnly={props.activesOnly}
          bank={toshareethBank}
          poolStats={toshareethBankStats}
          account={account}
        />
        <FarmCard
          bankName="TOMBSHI/TOSHI"
          depositFee={0}
          activesOnly={props.activesOnly}
          bank={usdbCBank}
          poolStats={usdbCBankStats}
          account={account}
        />
        <FarmCard
          bankName="TOSHARE/ETH"
          depositFee={0}
          activesOnly={props.activesOnly}
          bank={axlUsdbCBank}
          poolStats={axlUsdbCBankStats}
          account={account}
        /> */}

        {/* <FarmCard
          bankName="TOMBSHI-USDC.e LP"
          activesOnly={props.activesOnly}
          bank={wlrsUSDCBank}
          poolStats={wlrsUSDCPoolStats}
          account={account}
        />
        <FarmCard
          bankName="xWLRS"
          activesOnly={props.activesOnly}
          bank={xWLRSBank}
          poolStats={xWLRSBankStatsPool}
          account={account}
        />
        <FarmCard
          bankName="TOSHARE-USDC.e LP (TOMBSHI)"
          activesOnly={props.activesOnly}
          bank={wShareUSDCEarningWLRSBank}
          poolStats={wShareUSDCEarningWLRSStatsPool}
          account={account}
        />
        <FarmCard
          bankName="TOSHARE-USDC.e LP"
          activesOnly={props.activesOnly}
          bank={wShareUSDCBank}
          poolStats={wShareUSDCPoolStats}
          account={account}
        />
        <FarmCard
          bankName="NRWL-YUSD LP"
          activesOnly={props.activesOnly}
          bank={nrwlBank}
          poolStats={nrwlPoolStats}
          account={account}
        />
        <FarmCard
          bankName="TOSHBOND"
          activesOnly={props.activesOnly}
          bank={bondBank}
          poolStats={bondPool}
          account={account}
        /> */}
      </Grid>
    </>
  );
}
export default Farms;
