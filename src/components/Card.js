import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
    /**bind the context */
    const currentUser = React.useContext(CurrentUserContext);

    /**handle delete card possibility*/
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `card__delete-button ${
        isOwn ? "" : "card__delete-button_invisible"
    }`;

    /**handle put likes possibility*/
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__button ${
        isLiked ? "card__button_liked" : ""
    }`;

    /**handle button clicks */
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="places__card card">
            <button
                type="button"
                className={cardDeleteButtonClassName}
                name="deleteButton"
                aria-label="Удалить карточку"
                onClick={handleDeleteClick}
            />
            <img
                className="card__image"
                src={card.link}
                alt={card.alt}
                onClick={handleClick}
            />
            <div className="card__rating">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__likes">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        name="likeButton"
                        aria-label="Поставить лайк"
                        onClick={handleLikeClick}
                    />
                    <p className="card__like">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
