import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../../components/Scrollbar';

import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageList({ messages }) {
  const scrollRef = useRef(null);

 
  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>

        {messages && messages.map((msg, index) => (
              <ChatMessageItem msg={msg} key={index}/>
        ))}
       
         
   
      </Scrollbar>

    </>
  );
}
