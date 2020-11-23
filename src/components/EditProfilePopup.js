import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
}) {
    const currentUser = React.useContext(CurrentUserContext); 

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

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
