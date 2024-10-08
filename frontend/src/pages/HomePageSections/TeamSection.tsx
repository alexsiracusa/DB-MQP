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
            description: "A junior Computer Science major at Worcester Polytechnic Institute from Recife, Brazil. Passionate about learning new languages, playing musical instruments and complex coding problems.",
            image: Luke
        },
        {
            name: "Gabe Olafsson",
            description: "A junior at Worcester Polytechnic Institute studying Computer Science with a passion for Networking and Web Dev. Loves to dive into the nitty gritty of what he is working on to understand his work better.",
            image: Gabe
        },
        {
            name: "Ashleigh Perez",
            description: "A senior Computer Science and Data Science double major at Worcester Polytechnic Institute with a passion for full-stack software development and learning about its applications within data analytics. Very design-oriented and has a passion for pursuing personal growth.",
            image: Ashleigh
        },
        {
            name: "Alex Siracusa",
            description: "A junior pursuing a BS in Computer Science and an MS in Data Science at Worcester Polytechnic Institute. Alex has a strong interest in database management systems and their applications. He also likes making iOS apps.",
            image: Alex
        },
        {
            name: "Hanna Trinh",
            description: "A senior Computer Science major at Worcester Polytechnic Institute from Ho Chi Minh City, Vietnam. I’m passionate about solving complex problems and bringing innovative ideas to life.",
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