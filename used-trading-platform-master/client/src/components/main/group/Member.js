import React from 'react';
import styled from 'styled-components';
import { MemberCreate } from '../..';
import callApi from '../../../utils/callApi';

const MemberBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const MemberBox = styled.div`
  width: 320px;
  height: 370px;
  margin: 8px;
  border: 1px solid black;
  position: relative;
  margin-bottom: 20px;

  .memberImgBox {
    position: absolute;
    z-index: 9;
    margin: 9px;
    width: 300px;
    height: 300px;
    overflow: hidden;
    border: 1px solid black;

    &:hover {
      transition: 0.7s ease-in-out;
      z-index: 1;
      filter: brightness(30%);
    }
  }

  .memberImg {
    width: 300px;
    height: 300px;
  }

  .memberInfoBox {
    position: absolute;
    z-index: 5;
    top: 9px;
    font-size: 17px;
    padding: 20px;
    width: 300px;
    height: 200px;
    color: white;
    margin: 0 9px;
  }

  .memberName {
    width: 100%;
    font-weight: bold;
    font-size: 25px;
    line-height: 55px;
  }

  .memberInfo {
    width: 100%;
    margin-bottom: 3px;
    line-height: 30px;
  }

  .buttonBox {
    margin-top: 319px;
    width: 300px;
    height: 39px;
    margin-left: 9px;
    display: flex;
    justify-content: right;
  }

  .memberBtn {
    width: 45px;
    height: 39px;
    line-height: 39px;
    border: 1px solid black;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .updateBtn {
    background-color: #dfdfde;
  }

  .deleteBtn {
    margin-left: 10px;
    background-color: #ff5050;
  }
`;

function Member({ members, setVisible, setSelectId }) {
  const handelDeleteMember = e => {
    const mb_id = e.target.id;
    callApi('delete', '/group/delete', { params: { mb_id } });
  };

  return (
    <MemberBlock>
      <MemberCreate></MemberCreate>
      {members.length > 0 &&
        members.map((member, index) => (
          <MemberBox key={index} member={member}>
            <div className='memberImgBox'>
              <img alt='' src={member.image} className='memberImg' />
            </div>
            <div className='memberInfoBox'>
              <div className='memberName'>{member.name}</div>
              <div className='memberInfo'>Mobile. {member.mb_tell}</div>
              <div className='memberInfo'>{member.introduction}</div>
            </div>
            <div className='buttonBox'>
              <div
                className='memberBtn updateBtn'
                id={member.mb_id}
                onClick={e => {
                  setSelectId(e.target.id);
                  setVisible();
                }}
              >
                수정
              </div>
              <div
                className='memberBtn deleteBtn'
                id={member.mb_id}
                onClick={handelDeleteMember}
              >
                삭제
              </div>
            </div>
          </MemberBox>
        ))}
    </MemberBlock>
  );
}

export default Member;
