import React from "react";

function PopupWithForm({
    name,
    title,
    formName,
    buttonTitle,
    children,
    isOpen,
    onClose
}) {
    return (
        <div
            className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}
        >
            <div className="modal__container">
                <h3 className="modal__title">{title}</h3>
                <form
                    className={`form form_type_${name}`}
                    name={`${formName}Form`}
                    id={`${formName}Form`}
                    noValidate
                >
                    {children}
                    <button
                        className="form__submit-button"
                        type="submit"
                        name="submitButton"
                        aria-label="Сохранить изменения"
                    >
                        {buttonTitle}
                    </button>
                </form>
                <button
                    className="modal__close-button"
                    type="button"
                    name={`${formName}CloseButton`}
                    aria-label="Закрыть форму"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default PopupWithForm;
