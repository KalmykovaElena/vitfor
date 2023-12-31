import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import logo from 'assets/logo.svg';
import Button from 'components/common/button';
import Logo from 'components/logo';
import { useSelector } from 'react-redux';
import ModalMenu from 'components/modal-menu';
import { news } from 'constants/url';
import { Menu } from 'antd';
import { categories } from 'constants/categories';

const Header = ({ className }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userImg = useSelector((state) => state.auth.user.photo);
  const userName = useSelector((state) => state.auth.user.userName);
  const nickName = useSelector((state) => state.auth.user.nickName);
  const theme = useSelector((state) => state.auth.theme);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const renderNavigate = current !== '/authorization' && current !== '/registration';
  const onClick = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };
  const color = userImg?.includes('data:image') ? '' : userImg;

  const toggleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header header_${theme} ${className}`}>
      <Logo
        name="app"
        img={logo}
        text="VitFor"
        textLocation="right"
        handler={() => navigate('/')}
        isTextActive="true"
      />
      {renderNavigate && (
        <nav className="header-nav">
          <NavLink to="/"> Главная</NavLink>
          <NavLink to={news}> Новости</NavLink>
          <NavLink to="/weather"> Погода</NavLink>
          <div className="submenu">
            Категории
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={categories}
              triggerSubMenuAction="click"
              className="submenu-menu"
              theme="dark"
            />
          </div>
          <NavLink to="/questions"> Вопрос-ответ</NavLink>
          <NavLink to="/aboutus"> О нас</NavLink>
        </nav>
      )}
      <div className="header-controls">
        {/* <Select data={['РУС', 'EN', 'BY']} onchangeSelect={(e) => console.log(e)} /> */}
        {isAuth ? (
          <>
            <Logo
              name="userlogo"
              img={userImg}
              color={color}
              text={nickName}
              subtext={userName}
              handler={toggleOpenMenu}
            />
            {isMenuOpen && <ModalMenu setIsMenuOpen={setIsMenuOpen} />}
          </>
        ) : (
          <Link to="/authorization" className={renderNavigate ? '' : 'hidden'}>
            <Button name="Вход" type={renderNavigate ? 'enter' : 'hidden'} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
