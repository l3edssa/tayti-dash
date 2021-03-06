import React, { useState } from "react";

import { IoSearchSharp } from "react-icons/io5";

import {
  HContainer,
  PageTitle,
  HeaderCenter,
  HCleft,
  SearchContainer,
  SearchInput,
} from "./Header.styles";
import { Hamburger, Line } from "../Mix/Mix.styles";

const Header = ({ setLeft, left }) => {
  const [burger, setBurger] = useState(true);
  const toggleBurger = () => {
    setBurger(!left);
    setLeft(!left);
  };
  return (
    <HContainer>
      <Hamburger onClick={toggleBurger} isActive={burger}>
        <Line />
        <Line />
        <Line />
      </Hamburger>
      <HeaderCenter>
        <HCleft>
          <PageTitle>Acceuil</PageTitle>
          <SearchContainer>
            <SearchInput type="text" />
            <span>
              <IoSearchSharp />
            </span>
          </SearchContainer>
        </HCleft>
      </HeaderCenter>
    </HContainer>
  );
};

export default Header;
