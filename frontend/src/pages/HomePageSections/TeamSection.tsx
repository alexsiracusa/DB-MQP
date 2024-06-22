import React from "react";
import PersonCard from "../../components/PersonCard.tsx";
import '../../styles/HomePage.css'
import Luke from '../../assets/ProfileImages/Luke.jpg'
import Alex from '../../assets/ProfileImages/Alex.jpeg'
import Hanna from '../../assets/ProfileImages/Hanna.png'
import Wong from '../../assets/ProfileImages/Wong.png'

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
            image: Wong
        },
        {
            name: "Ashleigh Perez",
            description: "Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem.",
            image: Wong
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
                <h1>Meet The Team</h1>
                <div className="card-container">
                    <div className="column">
                        {
                            left_column.map((person) => {
                                return (
                                    <PersonCard
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
                            right_column.map((person) => {
                                return (
                                    <PersonCard
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