import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = React.useState("");

    function handleChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar,
        });

        onClose();
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            formName="changeAvatar"
            buttonTitle="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    className="form__item form__item_type_avatar-link"
                    type="url"
                    value={avatar || ""}
                    onChange={handleChange}
                    placeholder="Ссылка на аватар"
                    name="formAvatarLink"
                    id="formAvatarLink"
                    required
                />
                <span className="form__error" id="formAvatarLink-error" />
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
