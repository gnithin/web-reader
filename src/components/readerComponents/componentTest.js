import React, { Component } from 'react';
import ParagraphWithText from './imageParagraph.js';
import OnlyParagraph from './onlyParagraph.js';

class ReaderComponentTest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ParagraphWithText 
                    imgSrc="https://embedwistia-a.akamaihd.net/deliveries/2d21af5d1d065597a5799041c61a927f8ef79eff.webp"
                    description="Northeastern University (NU or NEU) is a private research university in Boston, Massachusetts, established in 1898. It is categorized as an R1 institution (Doctoral Universities: Highest Research Activity) by the Carnegie Classification of Institutions of Higher Education.[4] The university offers undergraduate and graduate programs on its main campus in Boston. The university has satellite campuses in Charlotte, North Carolina; Seattle, Washington; San Jose, California; Toronto, Canada, and Portland, Maine that exclusively offer graduate degrees. Northeastern recently purchased the New College of the Humanities in London and plans to open an additional campus in Vancouver, Canada. The university's enrollment is approximately 18,000 undergraduate students and 8,000 graduate students.[5]Northeastern features a cooperative education program, more commonly known as 'co-op' that integrates classroom study with professional experience and contains over 3,100 partners across all seven continents.[6] The program has been a key part of Northeastern's curriculum of experiential learning for more than a hundred years and is one of the largest co-op/internship programs in the world. While it is not required for students of all academic disciplines to participate in the co-op program, participation is nearly universal among undergraduate students as it helps distinguish their university experience from that of other universities. Northeastern also has a comprehensive study abroad program that spans more than 170 universities and colleges.Northeastern is a large, highly residential university. Most students choose to live on campus but upperclassmen have the option to live off campus. More than 75% of Northeastern students receive some form of financial aid. In the 2019–20 school year, the university has committed $296.2 million in grant and scholarship assistance.[8]"
                    isImgLeft={false} 
                    imgWidth={400} 
                    imgHeight={300} 
                    imgTitle="This is the description for northeastern pic"
                />

                <OnlyParagraph description="Northeastern University (NU or NEU) is a private research university in Boston, Massachusetts, established in 1898. It is categorized as an R1 institution (Doctoral Universities: Highest Research Activity) by the Carnegie Classification of Institutions of Higher Education.[4] The university offers undergraduate and graduate programs on its main campus in Boston. The university has satellite campuses in Charlotte, North Carolina; Seattle, Washington; San Jose, California; Toronto, Canada, and Portland, Maine that exclusively offer graduate degrees. Northeastern recently purchased the New College of the Humanities in London and plans to open an additional campus in Vancouver, Canada. The university's enrollment is approximately 18,000 undergraduate students and 8,000 graduate students.[5]Northeastern features a cooperative education program, more commonly known as 'co-op' that integrates classroom study with professional experience and contains over 3,100 partners across all seven continents.[6] The program has been a key part of Northeastern's curriculum of experiential learning for more than a hundred years and is one of the largest co-op/internship programs in the world. While it is not required for students of all academic disciplines to participate in the co-op program, participation is nearly universal among undergraduate students as it helps distinguish their university experience from that of other universities. Northeastern also has a comprehensive study abroad program that spans more than 170 universities and colleges.Northeastern is a large, highly residential university. Most students choose to live on campus but upperclassmen have the option to live off campus. More than 75% of Northeastern students receive some form of financial aid. In the 2019–20 school year, the university has committed $296.2 million in grant and scholarship assistance.[8]"/>
            </div>
        );
    }
}

export default ReaderComponentTest;