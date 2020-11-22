import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    title,
    link,
    handleTitleChange,
    handleLinkChange,
}) {
    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: title,
            link: link,
        });
    }

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            formName="addPlace"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    className="form__item form__item_type_title"
                    type="text"
                    value={title || ""}
                    onChange={handleTitleChange}
                    placeholder="Название"
                    name="formTitle"
                    id="formTitle"
                    maxLength="30"
                    minLength="1"
                    required
                />
                <span className="form__error" id="formTitle-error" />
            </label>
            <label className="form__label">
                <input
                    className="form__item form__item_type_image-link"
                    type="url"
                    value={link || ""}
                    onChange={handleLinkChange}
                    placeholder="Ссылка на картинку"
                    name="formImageLink"
                    id="formImageLink"
                    required
                />
                <span className="form__error" id="formImageLink-error" />
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
