import PropTypes from "prop-types";

const InfoButton = ({ link, main_text, secondary_text }) => {
  InfoButton.propTypes = {
    link: PropTypes.string,
    main_text: PropTypes.string,
    secondary_text: PropTypes.string,
  };
  return (
    <a href={link}>
      <div className="info">
        <p className="main-text">{main_text}</p>
        <p className="secondary-text">{secondary_text}</p>
      </div>
    </a>
  );
};

export default InfoButton;
