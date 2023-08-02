/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { saleData } from 'constants/saleData';
import { serverResponses } from 'constants/test';
import { useParams, useSearchParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import './index.scss';

import { useSelector } from 'react-redux';
import AdsItem from '../ads-item';
import SaleFilters from '../sale-filters';

const SaleAds = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [renderData, setRenderData] = useState();
  const productsQuery = searchParams.get('products');
  const data = saleData.find((item) => item.link.slice(1) === params.category);
  const sortCategory = useSelector((state) => state.advert.sort);
  const { section } = data;
  const dataRef = useRef();
  dataRef.current = renderData;
  const subsection =
    params.type && params.category !== 'search'
      ? data.items.find((item) => item.search === params.type).subsection
      : '';
  const sortItems = (items) => {
    if (sortCategory === 'По дате') {
      return [...items.sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))];
    }
    if (sortCategory === 'Дороже') {
      const getPrice = (price) => parseFloat(price.replace(/\s/g, '').replace(',', '.'), 10);
      return [...items.sort((a, b) => getPrice(b.price) - getPrice(a.price))];
    }
    if (sortCategory === 'Дешевле') {
      const getPrice = (price) => parseFloat(price.replace(/\s/g, '').replace(',', '.'), 10);
      return [...items.sort((a, b) => getPrice(a.price) - getPrice(b.price))];
    }
    return items;
  };
  useEffect(() => {
    setRenderData(
      params.category !== 'search'
        ? sortItems(
            serverResponses.filter((item) => {
              if (subsection) {
                return item.section === section && item.subsection === subsection;
              }
              return item.section === section;
            })
          )
        : sortItems(
            serverResponses.filter(
              (item) =>
                item.title.toLowerCase().includes(productsQuery) ||
                item.description.toLowerCase().includes(productsQuery) ||
                item.price.toLowerCase().includes(productsQuery)
            )
          )
    );
  }, [params.category, productsQuery, section, sortCategory, subsection]);
  return (
    <section className="sale-ads-wrapper" id="sale">
      {renderData && (
        <>
          <SaleFilters data={data} setRenderData={setRenderData} renderData={renderData} />
          <div className="sale-ads">
            {renderData.length === 0 ? (
              <div className="sale-ads__empty">
                <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
              </div>
            ) : (
              renderData.map((e) => <AdsItem key={e.advertId} item={e} type="long" />)
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SaleAds;
