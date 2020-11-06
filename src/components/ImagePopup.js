import React from 'react';
function PopupWithImage({onClose, card}) {
    console.log(card, card != null);
    return(
        <div className={`modal modal_type_popup ${card != null ? 'modal_opened' : ''}`}>
            <figure className="modal__popup-container">
                <button
                    className="modal__close-button"
                    type="button"
                    name="popupCloseButton"
                    aria-label="Закрыть картинку"
                    onClick={onClose}
                ></button>
                <img className="modal__image" src={card != null ? card.link : '#'} alt={card != null ? card.alt : ''} />
                <figcaption className="modal__caption">{card != null ? card.name : ''}</figcaption>
            </figure>
        </div>
    );
}

export default PopupWithImage;