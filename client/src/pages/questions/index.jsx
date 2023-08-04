/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

const getItems = () => [
  {
    key: '1',
    label: 'Как зарегистрироваться на форуме города?',
    children: (
      <p>
        Для регистрации на форуме VitFor необходимо, кликнув в правом верхнем углу значок «Вход», ввести свою
        электронную почту и пароль из не менее 8-ми символов. Далее необходимо заполнить личную информацию (имя
        пользователя, отображаемое имя, дату рождения).
      </p>
    ),
    showArrow: false,
  },
  {
    key: '2',
    label: 'Как создать новое объявление на форуме?',
    children: (
      <p>
        Для создания нового объявления необходимо авторизоваться на сайте, затем перейти в соответствующий раздел и
        нажать кнопку «Подать объявление».
      </p>
    ),
    showArrow: false,
  },
  {
    key: '3',
    label: 'Как создать новую тему на форуме?',
    children: (
      <>
        <p>
          Для создания новой темы в одном из форумов щелкните соответствующую кнопку на странице темы или форума.
          Например: Главная – Форум – Добавить тему для обсуждения.
        </p>
        <p>Обращаем внимание, что Вам придется зарегистрироваться перед отправкой сообщения или созданием темы. </p>
      </>
    ),
    showArrow: false,
  },
  {
    key: '4',
    label: 'Как искать информацию на форуме?',
    children: (
      <p>
        Для поиска необходимой Вам информации воспользуйтесь строкой поискового ввода и введите нужное Вам слово или
        символы, которые Вы хотели бы найти на платформе. Поисковой запрос автоматически сгенерируется системой в
        соответствии с Вашим запросом.
      </p>
    ),
    showArrow: false,
  },
  {
    key: '5',
    label: 'Как сообщить о нарушении правил на форуме?',
    children: (
      <p>
        Если Вы желаете сообщить о нарушении правил на форуме, обратитесь к модератору, кликнув на раздел «помощь» в
        личном кабинете, или напишите на почту vitfor@dreamsoft.by.
      </p>
    ),
    showArrow: false,
  },
  {
    key: '6',
    label: 'Как добавить свою фотографию в профиль?',
    children: (
      <p>
        Чтобы добавить фотографию в свой профиль, необходимо войти в поле «личная информация» следующим путем:
        Регистрация – личная информация – поле «Добавить фото» - загрузить.
      </p>
    ),
    showArrow: false,
  },
  {
    key: '7',
    label: 'Какие темы запрещены для обсуждения на форуме?',
    children: (
      <>
        <p>На форуме VitFor запрещено:</p>
        <p>- Публиковать заведомо ложнyю инфоpмацию.</p>
        <p>
          - Использовать нецензурную лексику, угрозы и обвинения, политические высказывания (в том числе в
          замаскированной форме).
        </p>
        <p>
          - Оскорблять кого-либо в прямой или косвенной форме, высказывать неуважение и/или хамить участникам форума.
        </p>
        <p>- Создавать сообщения, содержащие в любой форме порнографическую информацию, расизм, нетерпимость.</p>
      </>
    ),
    showArrow: false,
  },
];

const Questions = () => {
  const theme = useSelector((state) => state.auth.theme);

  return (
    <section className={`questions questions_${theme}`}>
      <Header />
      <main>
        <h1>Часто задаваемые вопросы</h1>
        <Collapse
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          items={getItems()}
          style={{
            width: '90%',
            margin: '0 auto',
          }}
        />
      </main>
      <Footer />
    </section>
  );
};
export default Questions;
