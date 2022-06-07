import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import Card from './Card';



function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    


    React.useEffect(() => {
        api.getUserData().then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        }).catch((err) => console.error(err));
    }, []);

    React.useEffect(() => {
        api.getInitialCards().then((data) => {
            setCards(data);
        }).
            catch((err) => console.error(err));

    }, []);



    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__photo-edit">
                        <img src={userAvatar} className="profile__photo" />
                        <button type="button" className="profile__photo-edit-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__text">
                        <div className="profile__firstline">
                            <h1 className="profile__name">{userName}</h1>
                            <button
                                id="editButton"
                                type="button"
                                className="profile__edit-button"
                                onClick={props.onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button id="addButton" type="button" className="profile__button" onClick={props.onAddPlace}>
                    +
                </button>
            </section>
            <section class="places">

            {cards.map((card) => (
                <Card card={card} onCardClick = {props.onCardClick} />
            ))}

            </section>

            <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isEditAvatarPopupOpen} onClose={props.onCloseAll}>
                <input
                    className="form__input"
                    type="url"
                    id="avatarLink"
                    name="avatarlink"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="form__error" id="avatarlink-error"></span>
                <input
                    id="submit_avatar"
                    className="form__submit form__submit_inactive"
                    type="submit"
                    value="Сохранить"
                    disabled
                />

            </PopupWithForm>


            <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseAll} >
                <input
                    className="form__input"
                    type="text"
                    id="name"
                    name="name2"
                    placeholder="Имя"
                    required
                    minlength="2"
                    maxlength="40"
                />
                <span className="form__error" id="name2-error"></span>
                <input
                    className="form__input"
                    type="text"
                    id="occupation"
                    name="occupation"
                    placeholder="Профессия"
                    required
                    minlength="2"
                    maxlength="200"
                />
                <span className="form__error" id="occupation-error"></span>
                <input
                    id="form__submit"
                    className="form__submit form__submit_inactive"
                    type="submit"
                    value="Сохранить"
                    disabled
                />

            </PopupWithForm>


            <PopupWithForm name="place" title="Новое место" isOpen={props.isAddPlacePopupOpen} onClose={props.onCloseAll}>
                <input
                    className="form__input"
                    type="text"
                    id="picName"
                    name="name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="form__error" id="name-error"></span>
                <input
                    className="form__input"
                    type="url"
                    id="picLink"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="form__error" id="link-error"></span>

                <input
                    id="submit_add"
                    className="form__submit form__submit_inactive"
                    type="submit"
                    value="Создать"
                    disabled
                />
            </PopupWithForm>



            <section id="popupCon" className="popup">
                <div className="popup__container popup__container_confirm">
                    <h2 className="popup__title">Вы уверены?</h2>
                    <form id="formCon" name="card-form" className="form" novalidate>
                        <input
                            id="submit_confirm"
                            className="form__submit form__submit_active"
                            type="submit"
                            value="Да"
                        />
                    </form>
                    <button
                        id="popupСonClose"
                        type="button"
                        className="popup__close"
                    ></button>
                </div>
            </section>

            <ImagePopup card={props.selectedCard} onClose={props.onCloseAll} />
        </main>
    );
}

export default Main;