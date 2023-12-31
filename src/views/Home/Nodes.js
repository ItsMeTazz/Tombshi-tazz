import React from 'react';
import { Grid } from '@material-ui/core';
import NodeCard from './NodeCard';
import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import { useWallet } from 'use-wallet';

const Nodes = (props) => {

  const { account } = useWallet();

  // TOMBSHI-USDC.e LP Node
  const wlrsUSDCBank = useBank('PegLPNode');
  const wlrsUSDCPool = useStatsForPool(wlrsUSDCBank);

  // TOSHARE-USDC.e LP Node
  const wshareUSDCBank = useBank('ShareLPNode');
  const wshareUSDCPool = useStatsForPool(wshareUSDCBank);

  // NRWL-YUSD LP Node
  const nrwlYUSDBank = useBank('LPNrwlNode');
  const nrwlYUSDPool = useStatsForPool(nrwlYUSDBank);

  // GRAPE-TOMBSHI LP Node
  const grapeWLRSBank = useBank('LPWlrsNode');
  const grapeWLRSPool = useStatsForPool(grapeWLRSBank);
  
  return (
    <Grid container direction="column" spacing={2}>
      <NodeCard nodeName="TOMBSHI-USDC.e LP Node" activesOnly={props.activesOnly} bank={wlrsUSDCBank} pool={wlrsUSDCPool} account={account}/>
      <NodeCard nodeName="TOSHARE-USDC.e LP Node" activesOnly={props.activesOnly} bank={wshareUSDCBank} pool={wshareUSDCPool} account={account} />
      <NodeCard nodeName="NRWL-YUSD LP Node" activesOnly={props.activesOnly} bank={nrwlYUSDBank} pool={nrwlYUSDPool}  account={account}/>
      <NodeCard nodeName="GRAPE-TOMBSHI LP Node" activesOnly={props.activesOnly} bank={grapeWLRSBank} pool={grapeWLRSPool}  account={account}/>
    </Grid>
  );
};
export default Nodes;
