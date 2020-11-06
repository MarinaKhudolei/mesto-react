import React from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };
    
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    return (
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
                />
                <Footer />
            </div>
        </div>
    );
}

export default App;
