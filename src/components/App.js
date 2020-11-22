import React, { useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    /**create state variables*/
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
        false
    );
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
        false
    );

    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");

    const [avatar, setAvatar] = React.useState("");

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

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    /**change profile info*/
    const handleUpdateUser = (data) => {
        api.changeProfileInfo(data)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(closeAllPopups)
            .catch((err) => console.log(err));
    };

    /**handle popup openings*/
    const handleEditAvatarClick = () => {
        setAvatar("");
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setTitle("");
        setLink("");
        setIsAddPlacePopupOpen(true);
    };

    const handleUpdateAvatar = (data) => {
        api.changeAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(closeAllPopups)
            .catch((err) => console.log(err));
    };

    /**handle popup closings*/
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    };

    /**handle cards*/
    const handleAddPlaceSubmit = (data) => {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(closeAllPopups)
            .catch((err) => console.log(err));
    };

    const handleCardClick = useCallback((card) => {
        setSelectedCard(card);
    }, []);

    const handleCardLike = useCallback(
        (card) => {
            const isLiked = card.likes.some((i) => i._id === currentUser._id);
            api.changeLikeCardStatus(card._id, !isLiked)
                .then((newCard) => {
                    const newCards = cards.map((c) =>
                        c._id === card._id ? newCard : c
                    );
                    setCards(newCards);
                })
                .catch((err) => console.log(err));
        },
        [cards, currentUser._id]
    );

    const handleCardDelete = useCallback(
        (card) => {
            api.deleteCard(card._id)
                .then(() => {
                    const newCards = cards.filter((c) =>
                        c._id === card._id ? "" : c
                    );
                    setCards(newCards);
                })
                .catch((err) => console.log(err));
        },
        [cards]
    );

    /**set profile and cards info*/
    React.useEffect(() => {
        Promise.all([api.setProfileInfo(), api.getAllCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        isEditProfilePopupOpen={isEditProfilePopupOpen}
                        isAddPlacePopupOpen={isAddPlacePopupOpen}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                        selectedCard={selectedCard}
                        onClose={closeAllPopups}
                        cards={cards}
                        handleCardClick={handleCardClick}
                        handleCardLike={handleCardLike}
                        handleCardDelete={handleCardDelete}
                    />
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        name={name}
                        description={description}
                        handleNameChange={handleNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        avatar={avatar}
                        handleAvatarChange={handleAvatarChange}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        title={title}
                        link={link}
                        handleTitleChange={handleTitleChange}
                        handleLinkChange={handleLinkChange}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
