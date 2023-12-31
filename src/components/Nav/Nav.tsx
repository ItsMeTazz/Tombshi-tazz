import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppBar, Drawer, IconButton, Toolbar, useMediaQuery, ListItem, Grid } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ClickAwayListener } from '@material-ui/core';
import AccountButton from './AccountButton';
import logo from '../../assets/img/logo.png';
import farmsIcon from '../../assets/img/SVG_Icons_and_web_bg/Farms.svg';
import boardroomsIcon from '../../assets/img/SVG_Icons_and_web_bg/Boardrooms.svg';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useTombStats from '../../hooks/useTombStats';
import useNrwlStats from '../../hooks/useNrwlStats';
import CountUp from 'react-countup';
import useShareStats from '../../hooks/usetShareStats';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  logo: {
    width: 50,
  },
  label: {
    fontSize: '22px',
    marginRight: '25px',
  },
  appBar: {
    fontSize: '18px',
    color: '#FCFCFC',
    'background-color': 'transparent',
    // marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#12141D',
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'nowrap',
    marginTop: '20px',
    marginBottom: '20px',
  },
  toolbarTitle: {
    fontSize: '30px',
  },
  tvlLabel: {
    color: '#b54bfc',
    marginRight: '8px',
  },
  wlrsLabel: {
    color: '#37c3ff',
    marginRight: '8px',
  },
  shareLabel: {
    color: '#fe6e4c',
    marginRight: '8px',
  },
  noDecoration: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  link: {
    color: '#FCFCFC',
    fontSize: '18px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  metricBox: {
    border: '1px solid #282C42',
    padding: '10px 10px',
    borderRadius: '10px',
  },
  productIcons: {
    marginTop: '4px',
    marginRight: '8px',
    height: '16px',
    width: '16px',
  },
  defiProducts: {
    cursor: 'pointer',
  },
  defiProductsTitle: {
    fontSize: '21px',
  },
  defiProductsDescription: {
    fontSize: '14px',
    color: '#9AA4DA',
    marginTop: '20px',
  },
  defiProductsModal: {
    zIndex: 10,
    position: 'absolute',
    left: '25%',
    right: '25%',
    marginTop: '60px',
    width: '60%',
    margin: 'auto',
    background: '#12141D',
    borderRadius: '20px',
  },
  brandLink: {
    textDecoration: 'none',
    color: '#4B4453',
    '&:hover': {
      textDecoration: 'none',
    },
    fontSize: 30,
    fontWeight: 900,
  },
  '@media only screen and (max-width: 1600px)': {
    link: {
      fontSize: '17px',
      margin: '3.5%',
    },
  },
  black: {
    color: '#000000 !important',
  },
  closeDrawerIcon: {
    color: '#fcfcfc',
    marginTop: '20px',
  },
}));

type NavProps = {
  fromParent: string;
};

const Nav: React.FC<NavProps> = ({ fromParent }) => {
  const matches = useMediaQuery('(min-width:1225px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const TVL = useTotalValueLocked();

  const tombStats = useTombStats();
  const shareStats = useShareStats();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const defiProductsOpen = Boolean(anchorEl);
  const handleDefiProductsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDefiProductsClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <ClickAwayListener onClickAway={handleDefiProductsClose}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Link to="/" className={classes.brandLink}>
                        <div
                          className={classes.label}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img alt="logo" className={classes.logo} src={logo} />
                          <div className={classes.shareLabel} style={{ fontWeight: 900, marginLeft: '10px' }}>
                            TOMB<span className={classes.wlrsLabel}>SHI</span>
                          </div>
                        </div>
                      </Link>
                    </Grid>
                    <Grid item>
                      <div className={classes.metricBox}>
                        <span className={classes.tvlLabel}>TVL</span>
                        {TVL ? <CountUp end={TVL} separator="," prefix="$" /> : '-----'}
                      </div>
                    </Grid>
                    <Grid item>
                      <div className={classes.metricBox}>
                        <span className={classes.wlrsLabel}>TOMBSHI</span> $
                        {tombStats ? tombStats.priceInDollars : '-.--'}
                      </div>
                    </Grid>
                    <Grid item>
                      <div className={classes.metricBox}>
                        <span className={classes.shareLabel}>TOSHARE</span> $
                        {shareStats ? shareStats.priceInDollars : '-.--'}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                      <div
                        id="defi-products"
                        className={classes.defiProductsModal}
                        hidden={!defiProductsOpen}
                        onMouseLeave={handleDefiProductsClose}
                      >
                        <Grid container spacing={3} style={{ padding: '50px' }}>
                          <Grid item xs={6}>
                            <Link to="/home#farms" className={classes.noDecoration}>
                              <Grid container wrap="nowrap" spacing={3}>
                                <Grid item>
                                  <img src={farmsIcon} alt="Farms" />
                                </Grid>
                                <Grid item>
                                  <div className={classes.defiProductsTitle}>Farms</div>
                                  <div className={classes.defiProductsDescription}>
                                    Stake your assets to earn rewards!
                                  </div>
                                </Grid>
                              </Grid>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Link to="/home#boardrooms" className={classes.noDecoration}>
                              <Grid container wrap="nowrap" spacing={3}>
                                <Grid item>
                                  <img src={boardroomsIcon} alt="boardrooms" />
                                </Grid>
                                <Grid item>
                                  <div className={classes.defiProductsTitle}>Boardrooms</div>
                                  <div className={classes.defiProductsDescription}>
                                    Stake shares for NRWL and TOMBSHI.
                                  </div>
                                </Grid>
                              </Grid>
                            </Link>
                          </Grid>

                          {/* <Grid item xs={6}>
                            <Link to="/home#rebates" className={classes.noDecoration}>
                              <Grid container wrap="nowrap" spacing={3}>
                                <Grid item>
                                  <img src={rebatesIcon} alt="Rebates" />
                                </Grid>
                                <Grid item>
                                  <div className={classes.defiProductsTitle}>Rebates</div>
                                  <div className={classes.defiProductsDescription}>
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout.{' '}
                                  </div>
                                </Grid>
                              </Grid>
                            </Link>
                          </Grid> */}
                        </Grid>
                      </div>
                      {/* {fromParent === 'page' && (
                        <div className={classes.defiProducts} onMouseEnter={handleDefiProductsClick}>
                          <img alt="defi products" className={classes.productIcons} src={productIcons} />
                          Defi Products
                        </div>
                      )} */}
                    </Grid>

                    {/* <Grid item>
                      <Link to="/home#farms" className={classes.link}>
                        Farms
                      </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/home#boardrooms" className={classes.link}>
                        Boardroom
                      </Link>
                    </Grid> */}
                    <Grid item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.frozenwalrus.finance/welcome"
                        className={classes.link}
                      >
                        Docs
                      </a>
                    </Grid>

                    <Grid item>
                      <div
                        style={{
                          width: 'auto',
                          marginLeft: 'auto',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <AccountButton text="Connect" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ClickAwayListener>
          </>
        ) : (
          <>
            <Grid container alignItems="center" spacing={1} style={{ marginLeft: '15px' }}>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Link to="/" className={classes.brandLink}>
                  <div
                    className={classes.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img alt="logo" className={classes.logo} src={logo} />
                    <div style={{ fontWeight: 900 }}></div>
                  </div>
                </Link>
              </Grid>
              <Grid item>
                <div className={classes.metricBox}>
                  <span className={classes.tvlLabel}>TVL</span>{' '}
                  {TVL ? <CountUp end={TVL} separator="," prefix="$" /> : '-----'}
                </div>
              </Grid>
              <Grid item>
                <div className={classes.metricBox}>
                  <span className={classes.wlrsLabel}>TOMBSHI</span> ${tombStats ? tombStats.priceInDollars : '-.--'}
                </div>
              </Grid>
              <Grid item>
                <div className={classes.metricBox}>
                  <span className={classes.shareLabel}>TOSHARE</span> ${shareStats ? shareStats.priceInDollars : '-.--'}
                </div>
              </Grid>
            </Grid>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose} className={classes.closeDrawerIcon}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Link color="textPrimary" to="/" className={classes.link}>
                  <div style={{ margin: '4px 20px' }}>Home</div>
                </Link>
                <a
                  href="https://dashboard.frozenwalrus.finance"
                  rel="noreferrer noopener"
                  target="_blank"
                  className={classes.link}
                >
                  <div style={{ margin: '4px 20px' }}>Dashboard</div>
                </a>
                <a
                  href="https://shop.frozenwalrus.finance/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={classes.link}
                >
                  Shop
                </a>
                <a
                  href="https://win.frozenwalrus.finance/"
                  rel="noreferrer noopener"
                  target="_blank"
                  className={classes.link}
                >
                  <div style={{ margin: '4px 20px' }}>Lottery</div>
                </a>
                <Link to="/compound" className={classes.link}>
                  {' '}
                  <div style={{ margin: '4px 20px' }}>Compound</div>
                </Link>

                <a
                  href="https://mint.frozenwalrus.finance/"
                  rel="noreferrer noopener"
                  target="_blank"
                  className={classes.link}
                >
                  <div style={{ margin: '4px 20px' }}>NFTs</div>
                </a>
                <a
                  href="https://docs.frozenwalrus.finance/welcome"
                  rel="noreferrer noopener"
                  target="_blank"
                  className={classes.link}
                >
                  <div style={{ margin: '4px 20px' }}>Docs</div>
                </a>

                <Link color="textPrimary" to="/media" className={classes.link}>
                  <div style={{ margin: '4px 20px' }}>Media</div>
                </Link>

                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
              </div>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
