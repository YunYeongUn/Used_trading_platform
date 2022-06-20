import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BoardContent, BoardReplies } from '../components';
import {useParams} from 'react-router-dom';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
const PostBlock = styled.div`
  
`;





function Post() {
  const [posts, setPosts] = useState([{}]);
  const [replies, setReplies] = useState([{}]);
  const {post_id} = useParams();

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.post('http://localhost:5000/boardContent/'+post_id,{},{withCredentials:true});
      setPosts(res.data);
    };
    const callApi2 = async () => {
      const res = await axios.post('http://localhost:5000/boardreply/'+post_id, {}, {withCredentials:true});
      setReplies(res.data);
    };
    callApi2();
    callApi();
  }, [post_id]);
  

  //url 이동을 위한 useNavigate
  const navigate = useNavigate();

  const { loggedIn } = useContext(Context);
  const [inputs, setInputs] = useState({
    content: '',
  });

  const { content } = inputs;

  const handleInputs = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (loggedIn) {
      const callApi = async () => {
        const res = await axios.post(
          'http://localhost:5000/boardreply/write/'+post_id,
          inputs,
          { withCredentials: true }
        );
        console.log(res.data);
      };
      try {
        callApi();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('로그인 후 이용해주세요');
      navigate('/login');
    }
  };

  return (
    <PostBlock>
      <BoardContent posts={posts}/>
      <form onSubmit={handleSubmit}>
        <div className='textareaBox'>
          <div className='inputTitle'>내용</div>
          <textarea
            name='content'
            placeholder='댓글 내용을 입력해주세요'
            value={content}
            onChange={handleInputs}
          />
        </div>
        <div className='charCnt'>0/100</div>

        <div className='writePostBtnGroup'>
          <button className='writeBtn' type='submit'>
            작성하기
          </button>
        </div>
      </form>
      <BoardReplies replies={replies}/>
    </PostBlock>
  );
}

export default Post;
