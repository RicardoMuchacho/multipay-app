import { useState } from 'react'

const useModal = () => {
  const [visibleReceive, setVisibleReceive] = useState('none')
  const [visibleSend, setVisibleSend] = useState('none')

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

  return {
    visibleReceive,
    visibleSend,
    openReceiveModal,
    hideReceiveModal,
    openSendModal,
    hideSendModal,
  }
}

export default useModal
