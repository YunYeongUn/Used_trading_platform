import React from 'react';
/* import styled from 'styled-components'; */

/* const BoardListBlk = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border-top: 1px solid black;
  }

  th {
    background-color: #dfdfde;
  }

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid black;
    text-align: center;
  }

  .postTitle {
    text-decoration: none;
    color: black;

    &:hover {
      font-weight: bold;
    }
  }
`; */

function ProductReplies({ replies }) {
  return (

    <table>
      <tbody>
      {replies.map((reply, index) => (
            <tr key={index}>
              <td >{reply.reply_content}</td>
              <td >{reply.nickname}</td>
              <td >
                {('' + reply.regdate).slice(0, 10)}
              </td>
            </tr>   
          ))}
      </tbody>
    </table>
  );
}

export default ProductReplies;
