import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { ReplyList } from '../components';
import callApi from '../utils/callApi';

const SemesterBlock = styled.div`
  width: 100%;
  background-color: #f3f3f3;

  .container {
    width: 800px;
    margin: 0 auto;
    color: black;
    background-color: #f3f3f3;
    position: relative;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
  }

  .backBtn {
    padding: 5px;
    position: absolute;
    left: 25px;
    top: 20px;
    font-size: 35px;
    color: black;

    &:hover {
      cursor: pointer;
    }
  }

  .header {
    padding-top: 40px;
    width: 100%;
    height: 130px;
    font-size: 40px;
    line-height: 90px;
    text-align: center;
    border-bottom: 2px solid black;
  }

  .main {
    padding: 20px 40px;
  }

  p {
    font-size: 18px;
    line-height: 35px;
    letter-spacing: 2px;
  }

  .line {
    border-top: 2px solid lightgrey;
    margin: 0 30px;
  }

  .replyContainer {
    padding: 30px;
    background-color: #f3f3f3;
  }
`;

function Semester() {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    // 댓글 정보들
    callApi('get', '/semester', {}, setReplies);
  }, []);

  return (
    <SemesterBlock>
      <div className='container'>
        <NavLink to='/'>
          <MdArrowBackIos className='backBtn' />
        </NavLink>
        <div className='header'>일본 현지 학기제</div>
        <div className='main'>
          <p>
            우리 영진전문대학교에서는 일본IT주문반을 포함하여 일본 취업을 위한
            특별 프로그램을 진행하고 있습니다.
            <br /> 이 중 2010년도 초기쯤부터 시작된 일본 현지 학기제는 현재
            2학년 일본어반 재학생 전체를 대상으로 2학기 말 겨울이 다가오는 무렵
            약 4~6주에 걸쳐 일본 후쿠오카에서 집중식 일본어 교육을 실시하고
            있습니다. <br /> 2020~2021년 코로나로 인하여 시행하지 못한 기간을
            제외, 매년 의무적으로 일본 현지 학기제를 운영중에 있습니다.
            <br />
            일본 현지 학기제의 실용적인 특성으로서 현지에서 교육받는 것에 큰
            메리트를 지니고 있습니다. 학생들의 일본어 실력을 토대로 분반하여
            수업을 진행하며 독해, 청해 실력 상승을 도모할 수 있습니다. <br />
            학생들은 6주라는 시간 속에 후쿠오카 현지에서 생활하며 지금껏 열심히
            학습했던 일본어로 직접적인 의사소통과 문화교류를 시행하며 일본어
            실력의 부족한 부분을 채우고 일본의 예절, 일본만의 특수한 문화 등
            다양한 활동과 체험을 피부로 느낄 기회를 가질 수 있습니다.
            <br />
            <br /> 1. 일본 취업을 위한 일본의 기업 문화를 익힐 수 있으며, 일본
            IT기업 견학 및 인사특강 현지 IT기업 환경 실상 및 비즈니스 마인드를
            고취하는 것이 가능합니다. <br /> <br /> 2. 비즈니스에 관련된 회화나
            매너, 커뮤니케이션 기술, 일본 사회 시스템에 대한 이해 등 일본에서의
            생활에 밀접한 여러 강의를 함께하고 있습니다.
            <br /> <br /> 3. 전문적인 현지 원어민 교수진들을 비롯한 뛰어난 교육
            커리큘럼을 제공하며 학생들 또한 일본 현지에 있어 여러 관광지를
            체험하고 원어민들과 소통하거나 하는 데에 있어 비약적인 성장을 보이고
            있습니다.
          </p>
        </div>
        <div className='line'></div>
        <div className='replyContainer'>
          <ReplyList replies={replies} />
        </div>
      </div>
    </SemesterBlock>
  );
}

export default Semester;
