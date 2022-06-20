import React from 'react';
import styled from 'styled-components';

const BoardRepliesListBlk = styled.div`
width: 984px;
margin: 0 auto;
display: flex;
flex-direction: column;
padding: 50px 0 60px 0;
background-color: #f8f9fa;

`;

function BoardReplies({ replies }) {
  return (
    <BoardRepliesListBlk>
      <div className='textareaBox'>
        <table>
          <tbody>
              {replies.map((reply, index) => (
                  <tr key={index}>
                  <td >{reply.content}</td>
                  <td >{reply.nickname}</td>
                  <td>
                    {('' + reply.regdate).slice(0, 10)}
                  </td>
                </tr>   
          ))}
      </tbody>
    </table>
    </div>
    </BoardRepliesListBlk>
  );
}

export default BoardReplies;
