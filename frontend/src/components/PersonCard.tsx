import '../styles/PersonCard.css'

type PersonCardProps = {
    name: string;
    description: string;
    image: string;
}

function PersonCard(props: PersonCardProps) {

    return (
        <div className="person-card-container">
            <img src={props.image} />
            <div className="about">
                <h4>
                    {props.name}
                </h4>
                <p>
                    {props.description}
                </p>
            </div>
        </div>
    );
}

export default PersonCard;