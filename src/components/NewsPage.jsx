import { useParams } from 'react-router';
import NewsList from './NewsList';
import { useEffect, useState } from 'react';
import Categories from './Categories';

const categories = [
  { name: 'all', text: '전체보기' },
  { name: 'business', text: '비즈니스' },
  { name: 'entertainment', text: '엔터테인먼트' },
  { name: 'health', text: '건강' },
  { name: 'science', text: '과학' },
  { name: 'sports', text: '스포츠' },
  { name: 'technology', text: '기술' },
  ];

const NewsPage = () => {
  // articles 상태 변수를 생성하고 초기값을 빈 배열로 설정
  const [articles, setArticles] = useState([]);

  // useParams 훅을 사용하여 URL 파라미터를 가져옴
  const param = useParams();
  // path 변수를 설정, URL 파라미터 중 '*'를 가져오고 값이 없으면 'all'로 설정
  const path = param['*'] || 'all';
  
  // path 변수 값 콘솔에 출력
  console.log(path);

  useEffect(() => {
    // 비동기 데이터 가져오는 함수 정의
    const fetchData = async () => {
      // path가 'all'이면 빈 문자열, 아니면 `&category=${path}` 설정
      const query = path == 'all' ? '' : `&category=${path}`;
      // 뉴스 데이터를 가져오는 API 호출
      const data = await fetch(
        'https://newsapi.org/v2/top-headlines' +
        '?country=kr&apiKey=9f5baf7d9f3f42879a20d7d19d9886e4' +
        `${query}`
      );
      // 응답 데이터를 JSON 형태로 파싱
      const response = await data.json();
      // articles 상태 변수를 응답 데이터의 articles로 설정
      setArticles(response.articles);
    };
    // fetchData 함수 호출하여 데이터 가져오기
    fetchData();
  }, [path]); // path가 변경될 때마다 useEffect 실행

  return (
    <>
      <Categories categories={categories} />
      {/* NewsList 컴포넌트를 렌더링하고 articles 데이터를 props로 전달 */}
      <NewsList articles={articles} />
    </>
  );
};

export default NewsPage;
