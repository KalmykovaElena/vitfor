import { setUserTheme } from 'http/setUserTheme';
import React, { useRef, useState } from 'react';
import exitPng from 'assets/exit.png';
import settingsPng from 'assets/settings.png';
import adverts from 'assets/reader.svg';
import messages from 'assets/mail-unread.svg';
import favourites from 'assets/fafourite.svg';
import notifications from 'assets/notifications.svg';
import { Menu, Switch } from 'antd';
import './index.scss';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setTheme } from 'redux/reducers/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import switch1 from 'assets/swtch1.png';
import switch2 from 'assets/switch2.png';

const advertsIcon = () => <img src={adverts} alt="adverts" />;
const messagesIcon = () => <img src={messages} alt="messages" />;
const favouritesIcon = () => <img src={favourites} alt="favourites" />;
const notificationsIcon = () => <img src={notifications} alt="notifications" />;
const exit = () => <img src={exitPng} alt="exit" />;
const settings = () => <img src={settingsPng} alt="profile" />;
function getItem(label, key, onClick, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  };
}

const ModalMenu = ({ setIsMenuOpen }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.auth.theme);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsMenuOpen(false));

  const onExit = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    if (location.pathname.includes('personal_info')) {
      navigate('/');
    }
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const items = [
    getItem('Мои объявления', 'userAdds', () => navigate('/sale/user_ads'), <Icon component={advertsIcon} />),
    getItem('Сообщения', 'messages', () => navigate('/chat'), <Icon component={messagesIcon} />),
    getItem('Избранное', 'favourites', () => navigate('/search/favourites'), <Icon component={favouritesIcon} />),
    getItem('Уведомления', 'notifications', null, <Icon component={notificationsIcon} />),
    getItem('Настройки профиля', 'settings', () => navigate('/personal_info/data'), <Icon component={settings} />),
    getItem('Выход', 'sub1', null, <Icon component={exit} />, [
      getItem(
        'Вы уверены, что хотите выйти?',
        'g1',
        null,
        null,
        [getItem('Да', 'exit', onExit), getItem('Нет', 'return', () => setOpenKeys([]))],
        'group'
      ),
    ]),
  ];
  const changeTheme = (value) => {
    dispatch(setTheme(value ? 'light' : 'dark'));
    setUserTheme(value ? 'light' : 'dark');
  };

  return (
    <div ref={ref} className={theme === 'dark' ? 'modal-menu modal-menu_dark' : 'modal-menu modal-menu_light'}>
      <div className="modal-menu-switch">
        <img src={switch1} alt="day" />
        <Switch
          onChange={changeTheme}
          checked={theme !== 'dark'}
          checkedChildren="день"
          unCheckedChildren="ночь"
          style={{ backgroundColor: theme === 'dark' ? '#6b2e5a' : 'orange' }}
        />
        <img src={switch2} alt="night" />
      </div>
      <Menu
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 317,
        }}
        mode="inline"
        items={items}
        theme={theme}
        onSelect={() => setIsMenuOpen(false)}
      />
    </div>
  );
};
export default ModalMenu;
