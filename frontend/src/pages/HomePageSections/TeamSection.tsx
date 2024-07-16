import React from "react";
import PersonCard from "../../components/PersonCard.tsx";
import '../../styles/HomePage.css'
import Luke from '../../assets/ProfileImages/Luke.jpg'
import Gabe from '../../assets/ProfileImages/Gabe.png'
import Alex from '../../assets/ProfileImages/Alex.jpeg'
import Hanna from '../../assets/ProfileImages/Hanna.png'
import Ashleigh from '../../assets/ProfileImages/Ashleigh.jpeg'

const TeamSection: React.FC = () => {

    const people = [
        {
            name: "Lucas Lamenha",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Luke
        },
        {
            name: "Gabe Olafsson",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Gabe
        },
        {
            name: "Ashleigh Perez",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Ashleigh
        },
        {
            name: "Alex Siracusa",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Alex
        },
        {
            name: "Hanna Trinh",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Hanna
        }
    ]

    const half_length = Math.ceil(people.length / 2);
    const left_column = people.slice(0, half_length);
    const right_column = people.slice(half_length);

    return (
        <div className="team">
            <div className="content">
                <h2>Meet The Team</h2>
                <div className="card-container">
                    <div className="column">
                        {
                            left_column.map((person, index) => {
                                return (
                                    <PersonCard
                                        key={index}
                                        name={person.name}
                                        description={person.description}
                                        image={person.image}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="column">
                        {
                            right_column.map((person, index) => {
                                return (
                                    <PersonCard
                                        key={index}
                                        name={person.name}
                                        description={person.description}
                                        image={person.image}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSection;