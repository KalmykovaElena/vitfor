import { setUserTheme } from 'http/setUserTheme';
import React, { useRef, useState } from 'react';
import exitPng from 'assets/exit.png';
import settingsPng from 'assets/settings.png';
import { ReactComponent as Reader } from 'assets/reader.svg';
import { ReactComponent as Messages } from 'assets/mail-unread.svg';
import { ReactComponent as Favourite } from 'assets/fafourite.svg';
// import { ReactComponent as Notification } from 'assets/notifications.svg';
import { Menu, Switch } from 'antd';
import './index.scss';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setTheme } from 'redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import switch1 from 'assets/swtch1.png';
import switch2 from 'assets/switch2.png';

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
  const theme = useSelector((state) => state.auth.theme);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsMenuOpen(false));

  const onExit = () => {
    dispatch(setIsAuth(false));
    dispatch(setTheme('dark'));
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const items = [
    getItem('Мои объявления', 'userAdds', () => navigate('/search/userads'), <Reader />),
    getItem('Сообщения', 'messages', () => navigate('/chat'), <Messages />),
    getItem('Избранное', 'favourites', () => navigate('/search/favourites'), <Favourite />),
    // getItem('Уведомления', 'notifications', null, <Notification />),
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
