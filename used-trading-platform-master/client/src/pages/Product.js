import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProductContent, ProductReplies } from '../components';
import {useParams} from 'react-router-dom';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const PostBlock = styled.div``;

function reloadIt() {
  if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
  }
}



function Product() {
  const [products, setProducts] = useState([{}]);
  const [replies, setReplies] = useState([{}]);
  
  const {p_id} = useParams();

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.post('http://localhost:5000/productContent/'+p_id,{},{withCredentials:true});
      setProducts(res.data);
    };
    callApi();
  }, [p_id]);
  
  useEffect(() => {
    const callApi = async () => {
      const res = await axios.post('http://localhost:5000/productreply/'+p_id,{},{withCredentials:true});
      setReplies(res.data);
    };
    callApi();
  }, [p_id]);
  
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
          'http://localhost:5000/productreply/write/'+p_id,
          inputs,
          { withCredentials: true }
        );
        console.log(res.data);
      };
      try {
        callApi();
        reloadIt();
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
      <ProductContent products={products}/>
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
      <ProductReplies replies={replies}/>
    </PostBlock>
  );
}
export default Product;
