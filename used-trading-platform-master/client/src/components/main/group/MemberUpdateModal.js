import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import callApi from '../../../utils/callApi';

const MemberUpdateModalBlock = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 11;

  .createForm {
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 500px;
    height: 500px;
    z-index: 100;
    box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
    padding: 30px;
    background-color: #dfdfde;
  }

  .formTitle {
    width: 120px;
    height: 45px;
    margin-bottom: 20px;
    border-bottom: 2px solid black;
    text-align: center;
    line-height: 45px;
    font-size: 30px;
  }

  .imageUploadBox {
    display: flex;
    margin-bottom: 15px;
  }

  .imageName {
    width: 100%;
    padding: 13px;
    border: 1px solid black;
    height: 40px;
    line-height: 40px;
    background-color: white;
    font-size: 17px;
    font-family: 'GyeonggiBatang';
    border-radius: 3px;
  }

  .imageUploadBtn {
    border-radius: 3px;
    width: 90px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid black;
    background-color: #495057;
    margin-left: 15px;
    color: white;
  }

  .cancelBtn {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid black;
    margin-left: 10px;
    color: white;
    background-color: #ff5050;
    border-radius: 3px;
  }

  .infoInput {
    border-radius: 3px;
    font-family: 'GyeonggiBatang';
    font-size: 17px;
    border: 1px solid black;
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    padding: 13px;

    &:focus {
      outline: none;
    }
  }

  textarea {
    border-radius: 3px;
    display: block;
    resize: none;
    padding: 13px;
    border: 1px solid black;
    width: 100%;
    height: 160px;
    font-family: 'GyeonggiBatang';
    font-size: 17px;
    margin-bottom: 15px;

    &:focus {
      outline: none;
    }
  }

  .updateBtnBox {
    display: flex;
    justify-content: right;
  }

  .updateSubmitBtn {
    display: block;
    border-radius: 3px;
    width: 60px;
    height: 40px;
    background-color: #4aa02c;
    color: white;
    font-family: 'GyeonggiBatang';
    font-size: 17px;
    border: 1px solid black;
  }

  .updateCancelBtn {
    width: 60px;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    text-align: center;
    border-radius: 3px;
    background-color: grey;
    color: white;
    border: 1px solid black;
  }
`;

function MemberUpdateModal({ selectId, setVisible }) {
  const updateImageInput = useRef();
  const [updateInfo, setUpdateInfo] = useState({
    name: '',
    mb_tell: '',
    introduction: '',
  });
  const [updateImage, setUpdateImage] = useState({
    image: '',
    preview: '',
  });
  const { name, mb_tell, introduction } = updateInfo;

  const handleImageInput = e => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setUpdateImage({
        image: e.target.files[0],
        preview: e.target.files[0].name,
      });
    };
  };

  const onClickImageUpload = e => {
    updateImageInput.current.click();
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setUpdateInfo({
      ...updateInfo,
      [name]: value,
    });
  };

  const handleTellInput = e => {
    const regex = /^[0-9\b]{0,11}$/;
    if (regex.test(e.target.value)) {
      setUpdateInfo({
        ...updateInfo,
        mb_tell: e.target.value,
      });
    }
  };

  const handleUploadCancel = e => {
    setUpdateImage({
      ...updateImage,
      preview: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mb_id', selectId);
    formData.append('name', name);
    formData.append('mb_tell', mb_tell);
    formData.append('introduction', introduction);
    formData.append('image', updateImage.image);
    callApi('put', '/group/update', formData);
    resetInput();
  };

  const resetInput = e => {
    setUpdateInfo({ name: '', mb_tell: '', introduction: '' });
    setUpdateImage({ image: '', preview: '' });
    setVisible(e);
  };

  return (
    <MemberUpdateModalBlock>
      <form
        className='createForm'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <div className='formTitle'>조원정보</div>
        <input
          type='text'
          name='name'
          className='infoInput'
          placeholder='조원 이름'
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type='file'
          style={{ display: 'none' }}
          ref={updateImageInput}
          accept='image/*'
          required
          onChange={handleImageInput}
        />
        <div className='imageUploadBox'>
          <input
            className='imageName'
            placeholder='파일명'
            value={updateImage.preview}
            disabled
          />
          <div className='imageUploadBtn' onClick={onClickImageUpload}>
            업로드
          </div>
          <div className='cancelBtn' onClick={handleUploadCancel}>
            취소
          </div>
        </div>
        <input
          type='text'
          placeholder='휴대폰번호'
          name='mb_tell'
          className='infoInput'
          value={mb_tell}
          onChange={handleTellInput}
          required
        />
        <textarea
          name='introduction'
          placeholder='자기소개글'
          value={introduction}
          onChange={handleChange}
          required
        />
        <div className='updateBtnBox'>
          <button className='updateSubmitBtn' type='submit'>
            수정
          </button>
          <div className='updateCancelBtn' onClick={resetInput}>
            취소
          </div>
        </div>
      </form>
    </MemberUpdateModalBlock>
  );
}

export default MemberUpdateModal;
