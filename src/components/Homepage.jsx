import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { Cryptocurrencies, News } from '../components'

import axios from 'axios'

import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography

const Homepage = () => {
  // const { data, isFetching } = useGetCryptosQuery();
  // console.log('data----',data);

  const [data, setData] = useState({})
  console.log('data----',data);
  const gloabalStats = data?.data?.stats;

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': '19a33a0bffmsh82c19ca18827982p12ca85jsn4d29e864f895',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  },[])

  return (
    <>
      <Title level={2} className='heading'> Global Crypto Stats </Title>
      <Row>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value={data && data.data ? gloabalStats.total : ''} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value={millify(data && data.data ? gloabalStats.totalExchanges : '')} /></Col>
        <Col span={12}><Statistic title='Total Market Cap' value={millify(data && data.data ? gloabalStats.totalMarketCap : '')} /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value={millify(data && data.data ? gloabalStats.total24hVolume : '')} /></Col>
        <Col span={12}><Statistic title='Total Markets' value={millify(data && data.data ? gloabalStats.totalMarkets : '')} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'> Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'> <Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'> Latest Crypto News</Title>
        <Title level={3} className='show-more'> <Link to='/news'>Show More</Link></Title>
      </div>
      <News />
    </>
  )
}

export default Homepage