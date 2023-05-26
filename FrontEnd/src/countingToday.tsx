import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const Tracker = () => {
  const location = useLocation();
  const [init, setInit] = useState(false);
  const [pageViews, setPageViews] = useState(0); // 추적 정보를 저장할 상태

  useEffect(() => {
    if (!window.location.href.includes('gamezone.gomao9.com')) {
      ReactGA.initialize(
        process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID as string
      );
    }
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      ReactGA.pageview(location.pathname + location.search);
      setPageViews((prevPageViews) => prevPageViews + 1); // 페이지 뷰 카운트 증가
    }
  }, [init, location]);

  return (
    <div style={{ display: 'flex', margin: '10px 10px' }}>
      <p>Page views: {pageViews}</p>
    </div>
  );
};
export default Tracker;
