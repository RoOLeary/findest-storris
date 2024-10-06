import Windmill from './WindMill';
import styled from '@emotion/styled';

const FooterContainer = styled.div`
    background: #000;
    color: white; 
    display: flex; 
    flex-direction: row; 
    align-items: flex-end;
    justify-content: center;
    padding: 10px;
    gap: 10px;
`;

const Footer = () => {

    const goToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    return (
        <FooterContainer>
            <h1>Made by <a href="https://ronan-oleary.com" target="_blank" className="text-red-500 hover:text-white">Ro O'Leary</a></h1>
            <a onClick={goToTop} className="cursor-pointer">
                <Windmill />
            </a>
        </FooterContainer>
    );
};

export default Footer;
