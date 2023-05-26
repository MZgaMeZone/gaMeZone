import React, { useEffect } from 'react';

interface DefaultPageProps {
  children: React.ReactNode;
  setGameName: (name: string) => void;
}

const DefaultPage: React.FC<DefaultPageProps> = ({ children, setGameName }) => {
  useEffect(() => {
    setGameName(`${children}`);
  }, [setGameName]);

  return (
    <div
      style={{
        width: '45rem',
        height: '55rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="game">
        게임이 준비 중입니다.. <br />
        잠시만 기다려주세요..
      </div>
    </div>
  );
};

export default DefaultPage;
