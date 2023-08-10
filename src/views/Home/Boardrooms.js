import React, { useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import BoardroomCard from './BaordroomCard';

import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import useGetBoardroomPrintRate from '../../hooks/useGetBoardroomPrintRate';
import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useTombFinance from '../../hooks/useTombFinance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useApprove from '../../hooks/useApprove';
import useStakeToMasonry from '../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../hooks/useWithdrawFromMasonry';
import useWithdrawCheckWlrs from '../../hooks/masonry/useWithdrawCheck';
import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
import useHarvestFromMasonry from '../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../hooks/useEarningsOnMasonry';
import useClaimRewardTimerMasonry from '../../hooks/masonry/useClaimRewardTimerMasonry';
import useUnstakeTimerMasonry from '../../hooks/masonry/useUnstakeTimerMasonry';
import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';

const Boardrooms = (props) => {
  const tombFinance = useTombFinance();
  const wsharePrice = useStakedTokenPriceInDollars('TOSHARE', tombFinance.TOSHARE);
  const wlrsPrice = useStakedTokenPriceInDollars('TOMBSHI', tombFinance.ETH);
  const wshareBalance = useTokenBalance(tombFinance.TOSHARE);

  // TOMBSHI
  const wlrsCurrentEpoch = useCurrentEpoch();
  const wlrsBRStat = useCashPriceInEstimatedTWAP();
  const wlrsTotalStaked = useTotalStakedOnMasonry();
  const wlrsAPR = useFetchMasonryAPR();
  const wlrsTwap = useMemo(() => (wlrsBRStat ? Number(wlrsBRStat.priceInDollars).toFixed(4) : null), [wlrsBRStat]);
  const wlrsNextEpochTimer = useTreasuryAllocationTimes();
  const wlrsNextEpochDate = useMemo(() => (wlrsNextEpochTimer ? wlrsNextEpochTimer.to : null), [wlrsNextEpochTimer]);
  const wlrsAbovePeg = useGetBoardroomPrintRate();
  const wlrsStakedBalance = useStakedBalanceOnMasonry();
  const wlrsTokenPriceInDollars = useMemo(
    () =>
      wsharePrice ? (Number(wsharePrice) * Number(getDisplayBalance(wlrsStakedBalance))).toFixed(2).toString() : null,
    [wsharePrice, wlrsStakedBalance],
  );
  const [wlrsApproveStatus, wlrsApprove] = useApprove(tombFinance.TOSHARE, tombFinance.contracts.Masonry.address);
  const wlrsOnStake = useStakeToMasonry();
  const wlrsOnWithdraw = useWithdrawFromMasonry();
  const wlrsCanWithdrawFromMasonry = useWithdrawCheckWlrs();
  const wlrsCanClaimReward = useClaimRewardCheck();

  const wlrsEarnings = useEarningsOnMasonry();
  const wlrsOnRedeem = useRedeemOnMasonry();
  const wlrsOnClaim = useHarvestFromMasonry();
  const wlrsClaimTimers = useClaimRewardTimerMasonry();
  const wlrsClaimTimerTo = useMemo(() => (wlrsClaimTimers ? wlrsClaimTimers.to : null), [wlrsClaimTimers]);
  const wlrsClaimTimerFrom = useMemo(() => (wlrsClaimTimers ? wlrsClaimTimers.from : null), [wlrsClaimTimers]);

  const wlrsWithdrawTimers = useUnstakeTimerMasonry();
  const wlrsWithdrawTimerTo = useMemo(() => (wlrsWithdrawTimers ? wlrsWithdrawTimers.to : null), [wlrsWithdrawTimers]);
  const wlrsWithdrawTimerFrom = useMemo(
    () => (wlrsWithdrawTimers ? wlrsWithdrawTimers.from : null),
    [wlrsWithdrawTimers],
  );

  return (
    <Grid container direction="column" spacing={2}>
      <BoardroomCard
        boardroomName="TOMBSHI BOARDROOM"
        activesOnly={props.activesOnly}
        currentEpoch={Number(wlrsCurrentEpoch)}
        nextEpoch={wlrsNextEpochDate}
        twap={wlrsTwap}
        apr={wlrsAPR.toFixed(2)}
        dailyApr={(wlrsAPR / 365).toFixed(2)}
        abovePeg={wlrsAbovePeg.toFixed(2)}
        totalStaked={(Number(wlrsTotalStaked) / 1e18).toFixed(2)}
        stakedBalance={Number(wlrsStakedBalance / 1e18).toFixed(3)}
        stakedBalanceValue={wlrsTokenPriceInDollars}
        wshareBalance={Number(wshareBalance) / 1e18}
        approveStatus={wlrsApproveStatus}
        canWithdraw={wlrsCanWithdrawFromMasonry}
        canClaim={wlrsCanClaimReward}
        earnings={Number(wlrsEarnings) / 1e18}
        earningsTokenPrice={wlrsPrice}
        claimTimerTo={wlrsClaimTimerTo}
        claimTimerFrom={wlrsClaimTimerFrom}
        withdrawTimerTo={wlrsWithdrawTimerTo}
        withdrawTimerFrom={wlrsWithdrawTimerFrom}
        onApprove={wlrsApprove}
        onStake={wlrsOnStake.onStake}
        onWithdraw={wlrsOnWithdraw.onWithdraw}
        onRedeem={wlrsOnRedeem.onRedeem}
        onClaim={wlrsOnClaim.onReward}
      />
    </Grid>
  );
};
export default Boardrooms;
