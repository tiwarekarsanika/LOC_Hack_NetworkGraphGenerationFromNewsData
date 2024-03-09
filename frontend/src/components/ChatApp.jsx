import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send'
import NewsCard from './NewsCard'
import StocksCard from './StockCard'
import logo from '../assets/logo2.png'
import VisNetworkComponent from './VisNetworkComponent'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
`

const News = styled.div`
  height: 100;
  flex: 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    font-size: 1.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    margin-left: 10%;
    color: var(--primary-color);
  }
`

const NewsListwrapper = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 90%;
`

const ChatWrapper = styled.div`
  height: 100;
  flex: 6;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
`

const ChatContent = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4%;
  overflow: auto;

  .patientName {
    font-weight: 700;
    font-size: 2.3rem;
    width: 85%;
    margin-bottom: 0.5%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const ChatInput = styled.div`
  height: 15%;
  margin-top: 2%;
  display: flex;
  justify-content: center;

  textarea {
    width: 70%;
    height: 50%;
    border-radius: 10px;
    border: 1px solid var(--primary-color);
    padding: 10px;
    outline: none;
    overflow: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;

    resize: none;
  }

  button {
    width: 5%;
    height: 50%;
    background-color: var(--secondary-color);
    margin-left: 3%;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MessageBot = styled.div`
  width: 85%;
  height: auto;
  padding: 20px;
  background-color: white;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  display: flex;
  ${'' /* align-items: center; */}
  white-space: pre-wrap;
  overflow-wrap: break-word;

  img {
    margin-right: 20px;
    height: 30px;
    width: 50px;
  }
`

const MessageInput = styled.div`
  width: 85%;
  height: auto;
  padding: 20px;
  background-color: #c0e9fc;
  border-radius: 15px;
  margin: 2%;
  color: var(--primary-color);
  white-space: pre-wrap;
  overflow-wrap: break-word;
`

const Stocks = styled.div`
  height: 100;
  flex: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    font-size: 1.5rem;
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    margin-left: 10%;
    color: var(--primary-color);
  }
`

const StocksListwrapper = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 90%;
`

const ChatApp = () => {
  const [news, setNews] = useState([
    { title: 'Ambani wedding big hit' },
    { title: 'Ambani wedding big hit' },
    { title: 'Ambani wedding big hit fasdlfadslfjsdkfjads;klfjdsk;ok;l' }
  ])
  const [stocks, setStocks] = useState([
    { title: 'Reliance' },
    { title: 'Reliance' },
    { title: 'Reliance' }
  ])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState([
    { message: `Hey ! Let me help you with your Stonks`, role: 'bot' }
  ])
  const [conversationState, setConversationState] = useState('human')

  const handleSend = () => {
    if (query.trim() !== '') {
      setMessage([...message, { message: query.trim(), role: 'human' }])
      setQuery('')
      setConversationState('bot')
    }
  }

  useEffect(() => {
    if (conversationState === 'bot') {
      // API Call idhar hoga

      setTimeout(() => {
        setMessage(prevMessages => [
          ...prevMessages,
          { message: <VisNetworkComponent />, role: 'bot' }
        ])
        setConversationState('human')
      }, 1000)
    }
  }, [conversationState])

  return (
    <Wrapper>
      <News>
        <div className='title'>
          {' '}
          <img
            src={logo}
            style={{ height: '50px', width: '90px' }}
            alt='Logo'
          />
          News
        </div>
        <NewsListwrapper>
          {news.map(p => (
            <NewsCard title={p.title}></NewsCard>
          ))}
        </NewsListwrapper>
      </News>

      <ChatWrapper>
        <ChatContent>
          {message.map((ans, index) =>
            ans.role === 'bot' ? (
              <MessageBot key={index}>
                <img src={logo} alt='Bot' />
                {ans.message}
              </MessageBot>
            ) : (
              <MessageInput key={index}>{ans.message}</MessageInput>
            )
          )}
        </ChatContent>

        <ChatInput>
          <textarea onChange={e => setQuery(e.target.value)} value={query} />
          <button onClick={handleSend}>
            <SendIcon style={{ color: 'white' }} />
          </button>
        </ChatInput>
      </ChatWrapper>

      <Stocks>
        <div className='title'>
          {' '}
          <img
            src={logo}
            style={{ height: '50px', width: '90px' }}
            alt='Logo'
          />
          Stocks
        </div>
        <StocksListwrapper>
          {stocks.map(p => (
            <NewsCard title={p.title}></NewsCard>
          ))}
        </StocksListwrapper>
      </Stocks>
    </Wrapper>
  )
}

export default ChatApp