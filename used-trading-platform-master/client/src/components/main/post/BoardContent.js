import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardContentBlk = styled.div`
width: 984px;
margin: 0 auto;
display: flex;
flex-direction: column;
padding: 50px 0 60px 0;
background-color: #f8f9fa;

form {
  margin: 0 auto;
}

.pageTitle {
  font-size: 33px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 2px solid black;
}

.contentTitle {
  font-size: 22px;
  line-height: 50px;
  text-align: right;
  padding-right: 40px;
}

.textareaBox {
  display: flex;
  margin-top: 30px;
  padding: 0 20px;
}

.textarea {
  font-family: 'GyeonggiBatang';
  width: 704px;
  height: 350px;
  font-size: 16px;
  line-height: 30px;
  padding: 15px;
  resize: none;
  border: 1px solid black;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
}

.writePostBtnGroup {
  display: flex;
  justify-content: right;
  padding-right: 20px;
}

button {
  font-family: 'GyeonggiBatang';
  padding: 12px;
  font-size: 18px;
  background-color: white;
  font-weight: bold;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
  }
}

.backToList {
  text-decoration: none;
  color: black;
}
`;

function reloadIt() {
  if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
  }
}

function BoardContent({ posts }) {
    const navigate = useNavigate();
    const isWriter = posts[0].writer === posts[0].reader; 

    const handleSubmit = e => {
      e.preventDefault();
      const callApi = async () => {
        await axios.delete(
          'http://localhost:5000/boardContent/'+posts[0].post_id,
        );
        
      };
      try {
        callApi();
        navigate('/board'); //성공하면 해당 url로 이동
        setTimeout(reloadIt(), 1000)();
      } catch (error) {
        console.error(error);
      }
    };

    const goodUpdate = e => {
      e.preventDefault();
      const callApi = async () => {
        await axios.patch(
          'http://localhost:5000/boardContent/'+posts[0].post_id,
        );
        
      };
      try {
        callApi();
        setTimeout(reloadIt(), 1000)();
      } catch (error) {
        console.error(error);
      }
    };


    return (
      <BoardContentBlk>
        <form onSubmit={handleSubmit}>
       <div className='pageTitle'>{posts[0].title}</div>
       <div className='textareaBox'>
          <div className='contentTitle'>내용</div>
          <div className='textarea' >{posts[0].content}</div>
        </div>
        <div className='writePostBtnGroup'>
        {isWriter === true && (
        <button className='backToList' type='submit'>
          삭제하기
        </button>
        )}
        
          <button>
            <NavLink to='/board' className='backToList'>
              목록으로
            </NavLink>
          </button>
        </div>
        </form>
        <form onSubmit={goodUpdate}>
          <div>{posts[0].recommends}</div>
        <button type='submit'>
          추천
        </button>
        </form>
      </BoardContentBlk>
    );
  }

  export default BoardContent;