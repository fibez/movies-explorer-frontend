import './PromoSectionTitile.css';

function PromoSectionTitle(props) {
    return <h2 className={`section-title ${props.margin}`}>{props.title}</h2>;
}

export default PromoSectionTitle;
