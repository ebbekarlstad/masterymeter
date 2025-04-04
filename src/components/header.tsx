import React from "react";

// Creates a header
function Header() {
	// Header buttons
	const handleLinkClick = () => {
        // Redirect here
		console.log("Link button clicked!");
    };
	const handleHomeClick = () => {
        console.log("Home button clicked!");
    };

	return (
		<header className = "h-28 bg-[#18191A] bg-opacity-50 shadow-lg shadow-black/10 backdrop-blur-md px-4 py-2 fixed top-0 left-0 w-full flex items-center justify-between z-50">
		<div onClick = {handleHomeClick} className = "px-6 text-white text-lg font-medium cursor-pointer select-none">Home</div>
		<div onClick = {handleLinkClick} className = "px-6 text-white text-lg font-medium cursor-pointer select-none">Link</div>
		</header>
	);
}

export default Header;