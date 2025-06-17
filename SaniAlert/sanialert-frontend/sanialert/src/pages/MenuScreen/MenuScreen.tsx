import React from "react";
import "./MenuScreen.css";
import SaneparImage from "../../assets/water-quality.jpg";
import cityImage from "../../assets/city-water.png";

const MenuScreen: React.FC = () => {
  return (
    <div className="menu-screen">
      <section className="hero-section">
        <img
          src={SaneparImage}
          alt="Qualidade da Água"
          className="hero-image"
        />
        <div className="hero-text">
          <h2>A Importância da Qualidade da Água em Maringá</h2>
          <p>
            Maringá é conhecida pela boa qualidade da sua água, mas isso não
            elimina a necessidade de um acompanhamento constante, principalmente
            em áreas que utilizam poços artesianos. O SaniAlert é uma plataforma
            colaborativa que permite o registro de análises da água feitas por
            moradores e técnicos. Com essas informações, é possível monitorar a
            qualidade da água em diferentes regiões da cidade, identificar
            possíveis alterações e auxiliar nas decisões que garantem a
            segurança hídrica da população.
          </p>
        </div>
      </section>
      <section className="secondary-section">
        <img src={cityImage} alt="Cidade e Água" className="secondary-image" />
        <div className="secondary-text">
          <h3>Saneamento Básico: Um Direito de Todos</h3>
          <p>
            Investir em saneamento básico é investir na saúde pública e na
            qualidade de vida. O SaniAlert reforça o compromisso com a
            universalização do acesso à água potável e ao tratamento de esgoto,
            promovendo a conscientização e a participação cidadã.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MenuScreen;
