import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import imgPath from '../images/change-button.svg';
import Card from './Card';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, handleCardClick, isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard, onClose}) => {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    React.useEffect(() => {
            api.setProfileInfo()
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((err) => console.log(err));
    }, []);

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getAllCards()
        .then((cardsData) => {
            setCards(cardsData.map((item => ({
                id: item._id,
                link: item.link,
                alt: item.name,
                name: item.name,
                likes: item.likes.length,
                onCardClick: handleCardClick
            }))));
        })
        .catch((err) => console.log(err));
    }, [handleCardClick]);

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__content">
                        <div
                            className="profile__image-container"
                            onClick={onEditAvatar}
                        >
                            <img
                                className="profile__image"
                                src={userAvatar}
                                alt="Фото профиля."
                            />
                            <img
                                className="profile__image-shadow"
                                src={imgPath}
                                alt="Изменить аватар."
                            />
                        </div>
                        <div className="profile__container">
                            <div className="profile__info">
                                <p className="profile__name">{userName}</p>
                                <p className="profile__profession">{userDescription}</p>
                            </div>
                            <button
                                type="button"
                                className="profile__change-button"
                                name="changeButton"
                                aria-label="Изменить профиль"
                                onClick={onEditProfile}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="content__add-button"
                        name="addButton"
                        aria-label="Добавить карточку"
                        onClick={onAddPlace}
                    />
                </section>
                <section className="places">
                    {cards.map(({id, ...props}) => <Card key={id} {...props}/>)}
                </section>
            </main>

            <ImagePopup 
                onClose={onClose}
                card={selectedCard}
            />

            <PopupWithForm
                name="change-profile"
                title="Редактировать профиль"
                formName="changeProfile"
                buttonTitle="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={onClose}
            >
                <label className="form__label">
                    <input
                        className="form__item form__item_type_name"
                        type="text"
                        defaultValue=""
                        name="formName"
                        id="formName"
                        maxLength="40"
                        minLength="2"
                        required
                    />
                    <span className="form__error" id="formName-error"/>
                </label>
                <label className="form__label">
                    <input
                        className="form__item form__item_type_profession"
                        type="text"
                        defaultValue=""
                        name="formProf"
                        id="formProf"
                        maxLength="200"
                        minLength="2"
                        required
                    />
                    <span className="form__error" id="formProf-error"/>
                </label>
            </PopupWithForm>

            <PopupWithForm
                name="add-place"
                title="Новое место"
                formName="addPlace"
                buttonTitle="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={onClose}
            >
                <label className="form__label">
                    <input
                        className="form__item form__item_type_title"
                        type="text"
                        defaultValue=""
                        placeholder="Название"
                        name="formTitle"
                        id="formTitle"
                        maxLength="30"
                        minLength="1"
                        required
                    />
                    <span className="form__error" id="formTitle-error"/>
                </label>
                <label className="form__label">
                    <input
                        className="form__item form__item_type_image-link"
                        type="url"
                        defaultValue=""
                        placeholder="Ссылка на картинку"
                        name="formImageLink"
                        id="formImageLink"
                        required
                    />
                    <span
                        className="form__error"
                        id="formImageLink-error"
                    />
                </label>
            </PopupWithForm>

            <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                formName="deleteCard"
                buttonTitle="Да"
                onClose={onClose}
            />

            <PopupWithForm
                name="change-avatar"
                title="Обновить аватар"
                formName="changeAvatar"
                buttonTitle="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={onClose}
            >
                <label className="form__label">
                    <input
                        className="form__item form__item_type_avatar-link"
                        type="url"
                        defaultValue=""
                        placeholder="Ссылка на аватар"
                        name="formAvatarLink"
                        id="formAvatarLink"
                        required
                    />
                    <span
                        className="form__error"
                        id="formAvatarLink-error"
                    />
                </label>
            </PopupWithForm>
        </>
    );
};

export default Main;
