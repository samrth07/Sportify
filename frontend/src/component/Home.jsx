import React from 'react'
import LiveScore from '../Sports/LiveComponent';
import CreateMatch from '../Sports/createMatch';
import LiveScore from './LiveComponent';

const HomeOld = () => {
  return (
    <div>
                <p>Hello from home</p>
                <LiveScore/>
                <CreateMatch/>
                <LiveScore/>
    </div>
  )
}

export default HomeOld
