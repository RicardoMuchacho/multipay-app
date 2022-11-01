import { useState } from 'react'

const useModal = () => {
  const [visibleReceive, setVisibleReceive] = useState('none')
  const [visibleSend, setVisibleSend] = useState('none')
  const [visibleBuy, setVisibleBuy] = useState('none')

  function openReceiveModal() {
    setVisibleReceive('block')
  }

  function hideReceiveModal() {
    setVisibleReceive('none')
  }

  function openSendModal() {
    setVisibleSend('block')
  }

  function hideSendModal() {
    setVisibleSend('none')
  }

  function openBuyModal() {
    setVisibleBuy('block')
  }

  function hideBuyModal() {
    setVisibleBuy('none')
  }

  return {
    visibleReceive,
    visibleSend,
    visibleBuy,
    openReceiveModal,
    hideReceiveModal,
    openSendModal,
    hideSendModal,
    openBuyModal,
    hideBuyModal,
  }
}

export default useModal
