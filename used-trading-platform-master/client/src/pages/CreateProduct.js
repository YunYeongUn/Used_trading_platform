import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import defaultImage from '../image/default.png';
import callApi from '../utils/callApi';

const CreateProductBlock = styled.div`
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

  .inputBox {
    width: 924px;
    display: flex;
    margin-top: 30px;
  }

  .inputTitle {
    width: 170px;
    padding-left: 20px;
    font-size: 22px;
    line-height: 50px;
  }

  input {
    width: 480px;
    margin-right: 10px;
    padding: 17px;
    font-size: 16px;
    font-family: 'GyeonggiBatang';
    border: 1px solid black;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
  }

  .titleCharCnt {
    font-size: 20px;
    line-height: 51px;
    height: 50px;
    font-weight: bold;
  }

  .bottomLine {
    height: 30px;
    border-bottom: 1px solid lightgrey;
  }

  .imageUpload {
    width: 230px;
    height: 230px;
    border: 1px solid black;
    border-radius: 3px;
  }
  
  .imgPreview {
    width: 230px;
    height: 230px;
    margin-left: 20px;
    border: 1px solid black;
    border-radius: 3px;
  }

  select {
    font-family: 'GyeonggiBatang';
    border: 1px solid black;
    border-radius: 3px;
    width: 150px;
    padding: 10px;
    font-size: 16px;
  }

  .textareaBox {
    display: flex;
    margin-top: 30px;
  }

  .priceInput {
    width: 250px;
  }

  .won {
    font-size: 20px;
    line-height: 50px;
    font-weight: bold;
  }

  textarea {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 734px;
    height: 250px;
    line-height: 30px;
    padding: 15px;
    resize: none;
    border: 1px solid black;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
  }

  .descriptCharCnt {
    text-align: right;
    padding: 10px 27px; 10px 10px;
    font-size: 20px;
    font-weight: bold;
  }

  .writePostBtnGroup {
    display: flex;
    justify-content: right;
    padding: 0 20px;
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

  .writeBtn {
    background-color: green;
    color: white;
    margin-left: 30px;
  }
`;

function CreateProduct() {
  //url 이동을 위한 useNavigate
  const navigate = useNavigate();
  const imageInput = useRef();
  const [categories, setCategories] = useState([{}]);
  const [postInfo, setPostInfo] = useState({
    title: '',
    cat_id: '1',
    price: '',
    descript: '',
  });
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '',
  });
  const [titleCnt, setTitleCnt] = useState(0);
  const [descriptCnt, setDescriptCnt] = useState(0);

  const { title, descript, cat_id, price } = postInfo;

  const handleInputs = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setPostInfo({
      ...postInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  useEffect(() => {
    try {
      callApi('get', '/market/category', null, setCategories);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    setTitleCnt(title.length);
  }, [title]);

  useEffect(() => {
    setDescriptCnt(descript.length);
  }, [descript]);

  const onClickImageUpload = e => {
    imageInput.current.click();
  };

  const onChangeImageInput = e => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('descript', descript);
      formData.append('cat_id', cat_id);
      formData.append('price', price);
      formData.append('image', image.image_file);
      callApi('post', '/market/create', formData);
      //성공하면 해당 url로 이동
      navigate('/market');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateProductBlock>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='pageTitle'> 상품 판매 게시글 작성</div>
        <div className='inputBox'>
          <div className='inputTitle'>제목</div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleInputs}
            placeholder='상품 제목을 입력해주세요'
          />
          <div className='titleCharCnt'>{titleCnt}/40</div>
        </div>
        <div className='bottomLine'></div>

        {/* 이미지 */}
        <div className='inputBox'>
          <div className='inputTitle'>이미지</div>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={imageInput}
            accept='image/*'
            required
            onChange={onChangeImageInput}
          />
          <div>
            <img
              alt=''
              src={defaultImage}
              className='imageUpload'
              onClick={onClickImageUpload}
            ></img>
          </div>
          {image.preview_URL !== '' ? (
            <img alt='' src={image.preview_URL} className='imgPreview'></img>
          ) : null}
        </div>
        <div className='bottomLine'></div>

        {/* 카테고리 */}
        <div className='inputBox'>
          <div className='inputTitle'>카테고리</div>
          <select name='category' onChange={handleInputs}>
            {categories.map((category, index) => (
              <option value={index + 1} key={index}>
                {category.cat_name}
              </option>
            ))}
          </select>
        </div>
        <div className='bottomLine'></div>

        <div className='inputBox'>
          <div className='inputTitle'>가격</div>
          <input
            className='priceInput'
            type='number'
            name='price'
            value={price}
            onChange={handleInputs}
            placeholder='숫자만 입력해주세요'
          />
          <div className='won'>원</div>
        </div>
        <div className='bottomLine'></div>

        <div className='textareaBox'>
          <div className='inputTitle'>설명</div>
          <textarea
            name='descript'
            placeholder='상품 설명을 입력해주세요'
            value={descript}
            onChange={handleInputs}
          />
        </div>
        <div className='descriptCharCnt'>{descriptCnt}/100</div>
        <div className='bottomLine'></div>

        <div className='writePostBtnGroup'>
          <button>
            <NavLink to='/market' className='backToList'>
              목록으로
            </NavLink>
          </button>
          <button className='writeBtn' type='submit'>
            작성하기
          </button>
        </div>
      </form>
    </CreateProductBlock>
  );
}

export default CreateProduct;
