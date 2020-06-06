import React from 'react'
import { connect } from 'react-redux'
import { fetchPeers } from 'reducers/peers'
import { fetchDescribeNetwork } from 'reducers/network'
import { setIsWalletOpen } from 'reducers/wallet'
import { updateAutopilotNodeScores } from 'reducers/autopilot'
import { initActivityHistory } from 'reducers/activity'
import { fetchTransactions } from 'reducers/transaction'
import { appSelectors } from 'reducers/app'
import { finishLnurlAuth, lnurlSelectors } from 'reducers/lnurl'
import { finishLnurlWithdraw, paySelectors } from 'reducers/pay'
import { initBackupService } from 'reducers/backup'
import { setModals, modalSelectors } from 'reducers/modal'
import { channelsSelectors, finishLnurlChannel, fetchSuggestedNodes } from 'reducers/channels'
import { initTickers } from 'reducers/ticker'
import App from 'components/App'
import ModalStack from './ModalStack'
import AppErrorBoundary from './ErrorBoundary'

const mapStateToProps = state => ({
  isAppReady: appSelectors.isAppReady(state),
  redirectPayReq: state.pay.redirectPayReq,
  modals: modalSelectors.getModalState(state),
  lnurlWithdrawParams: paySelectors.lnurlWithdrawParams(state),
  willShowLnurlAuthPrompt: lnurlSelectors.willShowLnurlAuthPrompt(state),
  willShowLnurlWithdrawPrompt: paySelectors.willShowLnurlWithdrawPrompt(state),
  willShowLnurlChannelPrompt: channelsSelectors.willShowLnurlChannelPrompt(state),
})

const mapDispatchToProps = {
  fetchDescribeNetwork,
  fetchPeers,
  updateAutopilotNodeScores,
  initActivityHistory,
  setIsWalletOpen,
  fetchTransactions,
  setModals,
  initTickers,
  initBackupService,
  fetchSuggestedNodes,
  finishLnurlAuth,
  finishLnurlChannel,
  finishLnurlWithdraw,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

const AppWithErrorBoundaries = props => (
  <AppErrorBoundary>
    <ConnectedApp {...props} />
    <ModalStack />
  </AppErrorBoundary>
)

export default AppWithErrorBoundaries
