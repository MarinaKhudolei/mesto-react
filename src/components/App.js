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
    const [currentUser, setCurrentUser] = React.useState([]);
    const [cards, setCards] = React.useState([]);

    /**set profile info*/
    React.useEffect(() => {
        api.setProfileInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    /**change profile info*/
    const handleUpdateUser = (data) => {
        api.changeProfileInfo(data)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    };

    /**handle popup openings*/
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleUpdateAvatar = (data) => {
        api.changeAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
            })
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

    React.useEffect(() => {
        api.getAllCards()
            .then((cardsData) => {
                setCards(
                    cardsData.map((item) => ({
                        _id: item._id,
                        link: item.link,
                        alt: item.name,
                        name: item.name,
                        likes: item.likes,
                        owner: item.owner,
                        onCardClick: handleCardClick,
                        onCardLike: handleCardLike,
                        onCardDelete: handleCardDelete,
                    }))
                );
            })
            .catch((err) => console.log(err));
    }, [handleCardClick, handleCardLike, handleCardDelete]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        handleCardClick={handleCardClick}
                        isEditProfilePopupOpen={isEditProfilePopupOpen}
                        isAddPlacePopupOpen={isAddPlacePopupOpen}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                        selectedCard={selectedCard}
                        onClose={closeAllPopups}
                        cards={cards}
                    />
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
