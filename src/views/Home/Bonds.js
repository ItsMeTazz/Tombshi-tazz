import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import BondCard from './BondCard';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import useTokenBalance from '../../hooks/useTokenBalance';
import useTombFinance from '../../hooks/useTombFinance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import { BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import { useTransactionAdder } from '../../state/transactions/hooks';

const Bonds = (props) => {
  const frozenWlrs = useTombFinance();
  const addTransaction = useTransactionAdder();
  const {
    contracts: { Treasury },
  } = useTombFinance();

  // TOMBSHI BOND
  const bcashPrice = useCashPriceInLastTWAP();
  const bbondsPurchasable = useBondsPurchasable();
  const bWlrsBalance = useTokenBalance(frozenWlrs?.TOMBSHI);
  const bbondBalance = useTokenBalance(frozenWlrs?.TBOND);
  const [bApproveStatus, bApprove] = useApprove(frozenWlrs?.TOMBSHI, Treasury.address);
  const bIsBondRedeemable = useMemo(() => bcashPrice.gt(BOND_REDEEM_PRICE_BN), [bcashPrice]);

  const bBuyBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} NBOND with ${amount} NRWL`,
      });
    },
    [frozenWlrs, addTransaction],
  );

  const bRedeemBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} NBOND` });
    },
    [frozenWlrs, addTransaction],
  );

  return (
    <Grid container direction="column" spacing={2}>
      <BondCard
        tokenName="TOMBSHI"
        bondName="TOSHBOND"
        activesOnly={props.activesOnly}
        price={Number(bcashPrice) / 1e18}
        availableForPurchase={Number(bbondsPurchasable) / 1e18}
        walletBalance={Number(bWlrsBalance) / 1e18}
        bondBalance={Number(bbondBalance) / 1e18}
        approveStatus={bApproveStatus}
        isRedeemable={bIsBondRedeemable}
        onPurchase={bBuyBonds}
        onApprove={bApprove}
        onRedeem={bRedeemBonds}
      />
    </Grid>
  );
};
export default Bonds;
