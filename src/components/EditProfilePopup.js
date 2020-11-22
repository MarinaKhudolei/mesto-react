import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    name,
    description,
    handleNameChange,
    handleDescriptionChange,
}) {
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="change-profile"
            title="Редактировать профиль"
            formName="changeProfile"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    className="form__item form__item_type_name"
                    type="text"
                    value={name || ""}
                    onChange={handleNameChange}
                    name="formName"
                    id="formName"
                    maxLength="40"
                    minLength="2"
                    required
                />
                <span className="form__error" id="formName-error" />
            </label>
            <label className="form__label">
                <input
                    className="form__item form__item_type_profession"
                    type="text"
                    value={description || ""}
                    onChange={handleDescriptionChange}
                    name="formProf"
                    id="formProf"
                    maxLength="200"
                    minLength="2"
                    required
                />
                <span className="form__error" id="formProf-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
