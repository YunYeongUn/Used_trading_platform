import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Member, MemberUpdateModal } from '../components';
import callApi from '../utils/callApi';

const GroupBlock = styled.div`
  width: 1008px;
  margin: 40px auto;
`;

function Group() {
  const [members, setMembers] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectId, setSelectId] = useState();

  useEffect(() => {
    callApi('get', '/group', {}, setMembers);
  }, []);

  return (
    <GroupBlock>
      <Member
        members={members}
        setSelectId={e => {
          setSelectId(e);
        }}
        setVisible={e => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <MemberUpdateModal
          selectId={selectId}
          setVisible={e => {
            setVisible(!visible);
          }}
        />
      )}
    </GroupBlock>
  );
}

export default Group;
