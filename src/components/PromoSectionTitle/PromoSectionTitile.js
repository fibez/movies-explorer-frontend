import './PromoSectionTitile.css';

function PromoSectionTitle(props) {
    return <h2 className={`section-title ${props.marginClass}`}>{props.title}</h2>;
}

export default PromoSectionTitle;
