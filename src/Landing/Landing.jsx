import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import Features from './components/features';
import About from './components/about';
import Services from './components/services';
import Gallery from './components/gallery';
import Testimonials from './components/testimonials';
import Team from './components/Team';
import Contact from './components/contact';
import JsonData from './data/data.json';

export class Landing extends Component {
    state = {
        landingPageData: {},
    }
    getlandingPageData() {
        this.setState({ landingPageData: JsonData })
    }

    componentDidMount() {
        this.getlandingPageData();
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="css/style.css" />
                <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/nivo-lightbox.css" />
                <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/default.css" />
                <link rel="stylesheet" type="text/css" href="fonts/font-awesome/css/font-awesome.css" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900" rel="stylesheet" />
                <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
                <script type="text/javascript" src="js/bootstrap.js"></script>
                <script type="text/javascript" src="js/SmoothScroll.js"></script>
                <script type="text/javascript" src="js/nivo-lightbox.js"></script>
                <script type="text/javascript" src="js/jqBootstrapValidation.js"></script>
                <script type="text/javascript" src="js/contact_me.js"></script>
                <script type="text/javascript" src="js/main.js"></script>

                <Navigation />
                <Header data={this.state.landingPageData.Header} />
                <Features data={this.state.landingPageData.Features} />
                <About data={this.state.landingPageData.About} />
                {/* <Services data={this.state.landingPageData.Services} /> */}
                {/* <Gallery /> */}
                <Testimonials data={this.state.landingPageData.Testimonials} />
                {/* <Team data={this.state.landingPageData.Team} /> */}
                <Contact data={this.state.landingPageData.Contact} />
            </div>
        )
    }
}

export default Landing;