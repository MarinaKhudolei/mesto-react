import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import imgPath from "../images/change-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    selectedCard,
    onClose,
    cards,
}) => {
    /**bind the context */
    const currentUser = React.useContext(CurrentUserContext);
    
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
                                src={currentUser.avatar}
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
                                <p className="profile__name">
                                    {currentUser.name}
                                </p>
                                <p className="profile__profession">
                                    {currentUser.about}
                                </p>
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
                    {cards.map((props) => (
                        <Card key={props._id} {...props} />
                    ))}
                </section>
            </main>

            <ImagePopup onClose={onClose} card={selectedCard} />

            <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                formName="deleteCard"
                buttonTitle="Да"
                onClose={onClose}
            />
        </>
    );
};

export default Main;
