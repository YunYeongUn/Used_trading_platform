import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const BoardListBlk = styled.div`
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
`;

function BoardList({ posts }) {
  return (
    <BoardListBlk>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>조회수</th>
            <th>추천수</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post, index) => (
              <tr key={index}>
                <td style={{ width: '10%' }}>{post.post_id}</td>
                <td style={{ width: '40%' }}>
                  <NavLink to={`/board/${post.post_id}`} className='postTitle'>
                    {post.title}
                  </NavLink>
                </td>
                <td style={{ width: '15%' }}>{post.nickname}</td>
                <td style={{ width: '15%' }}>
                  {('' + post.regdate).slice(0, 10)}
                </td>
                <td style={{ width: '10%' }}>{post.views}</td>
                <td style={{ width: '10%' }}>{post.recommends}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </BoardListBlk>
  );
}

export default BoardList;
