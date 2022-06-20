import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, ProductList, Pagination } from '../components';
import { useLocation, useParams } from 'react-router-dom';
import callApi from '../utils/callApi';

const MarketBlock = styled.div`
  width: 954px;
  margin: 40px auto;

  .listTitle {
    font-size: 20px;
    margin: 40px 0 20px 10px;
    text-align: bottom;
  }

  .value {
    font-weight: bold;
  }

  .count {
    font-family: 'YES24';
    font-size: 15px;
    color: silver;
    letter-spacing: 0.5px;
  }
`;

function Market() {
  const { state } = useLocation();

  const pagePer = 20;
  const [prods, setProds] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([{}]);

  const [selectedCatId, setSelectedCatId] = useState();
  const params = useParams();

  // 전체 게시물 개수
  const totalProdsCnt = prods.length;

  useEffect(() => {
    setSelectedCatId(params.cat_id);
    setCurrentPage(1);
  }, [selectedCatId, params]);

  useEffect(() => {
    setStart((currentPage - 1) * pagePer);
    setEnd(currentPage * pagePer);
  }, [currentPage]);

  const toggleCurrentPage = e => {
    setCurrentPage(e);
  };

  useEffect(() => {
    try {
      if (state) {
        callApi(
          'get',
          '/market/product',
          { params: { state: state.query } },
          setProds
        );
      } else {
        callApi(
          'get',
          '/market/product',
          { params: { cat_id: selectedCatId } },
          setProds
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedCatId, state]);

  useEffect(() => {
    callApi('get', '/market/category', {}, setCategories);
    callApi('get', '/market/product', {}, setProds);
  }, []);

  return (
    <MarketBlock>
      <Category categories={categories} />
      {state ? (
        <div className='listTitle'>
          <span className='value'>'{state.query}'</span>에 대한 검색결과 &nbsp;
          <span className='count'>{prods.length}개</span>
        </div>
      ) : selectedCatId ? (
        <div className='listTitle'>
          <span className='value'>
            {categories[selectedCatId - 1].cat_name}
          </span>
          &nbsp;&nbsp;
          <span className='count'>{prods.length}개</span>
        </div>
      ) : (
        <div className='listTitle'>
          <span className='value'>전체 상품</span>
          &nbsp;&nbsp;
          <span className='count'>{prods.length}개</span>
        </div>
      )}
      <ProductList prods={prods.slice(start, end)} />
      <Pagination
        pagePer={pagePer}
        totalPostCnt={totalProdsCnt}
        currentPage={currentPage}
        toggleCurrentPage={e => toggleCurrentPage(e)}
      />
    </MarketBlock>
  );
}

export default Market;
