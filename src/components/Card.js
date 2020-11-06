import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick({link: props.link, name: props.name, alt: props.alt});
      }  
    return(
        <div className="places__card card">
        <button
            type="button"
            className="card__delete-button"
            name="deleteButton"
            aria-label="Удалить карточку"
        ></button>
        <img className="card__image" src={props.link} alt={props.alt} onClick={handleClick}/>
        <div className="card__rating">
            <h2 className="card__title">{props.name}</h2>
            <div className="card__likes">
                <button
                    type="button"
                    className="card__button"
                    name="likeButton"
                    aria-label="Поставить лайк"
                ></button>
                <p className="card__like">{props.likes}</p>
            </div>
        </div>
    </div>
    )
}

export default Card;