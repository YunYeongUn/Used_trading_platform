import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../../context/Context';
import callApi from '../../../utils/callApi';

const ReplyUpdateBlock = styled.div`
  textarea {
    border: 1px solid lightgrey;
    color: black;
    padding: 10px;
    letter-spacing: 2px;
    font-size: 18px;
    font-family: 'GyeonggiBatang';
    display: block;
    resize: none;
    width: 100%;
    height: 80px;
    background-color: white;

    &:focus {
      outline: none;
    }
  }

  .buttonGroup {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-top: 5px;
    padding: 7px;
    font-size: 18px;
    border: 1px solid silver;
    border-radius: 4px;
    color: black;
    font-family: 'GyeonggiBatang';
    background-color: #f3f3f3;

    &:hover {
      cursor: pointer;
      background-color: silver;
      transform: scale(0.97);
    }
  }

  .inputNum {
    margin-top: 7px;
    margin-left: 8px;
    font-size: 20px;
  }
`;

function ReplyUpdate({ replyId, beforeContent }) {
  const [updateData, setUpdateData] = useState({
    reply_id: replyId,
    content: beforeContent,
  });
  const [inputNum, setInputNum] = useState(0);

  const handleTextarea = e => {
    const { value, name } = e.target;
    if (value.length <= 50) {
      setUpdateData({ ...updateData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    callApi('put', '/semester/update', updateData);
  };

  useEffect(() => {
    setInputNum(updateData.content.length);
  }, [updateData.content]);

  return (
    <ReplyUpdateBlock>
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          placeholder='후기를 남겨주세요'
          value={updateData.content}
          onChange={handleTextarea}
          required
        />
        <div className='buttonGroup'>
          <div className='inputNum'>{inputNum}/50</div>
          <button type='submit'>수정하기</button>
        </div>
      </form>
    </ReplyUpdateBlock>
  );
}

export default ReplyUpdate;
