import React, {Component} from 'react'

class Landing extends Component {
  constructor(props){
    super(props);
  }

                        // <ul className="list-inline intro-social-buttons">
                        //     <li>
                        //         <a href="https://twitter.com/SBootstrap" className="btn btn-default btn-lg"><i className="fa fa-twitter fa-fw"></i> <span className="network-name">Twitter</span></a>
                        //     </li>
                        //     <li>
                        //         <a href="https://github.com/IronSummitMedia/startbootstrap" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">Github</span></a>
                        //     </li>
                        //     <li>
                        //         <a href="#" className="btn btn-default btn-lg"><i className="fa fa-linkedin fa-fw"></i> <span className="network-name">Linkedin</span></a>
                        //     </li>
                        // </ul>

	// <a  name="contact"></a>
  //   <div className="banner">

  //       <div className="container">

  //           <div className="row">
  //               <div className="col-lg-6">
  //                   <h2>Connect to Start Bootstrap:</h2>
  //               </div>
  //               <div className="col-lg-6">
  //                   <ul className="list-inline banner-social-buttons">
  //                       <li>
  //                           <a href="https://twitter.com/SBootstrap" className="btn btn-default btn-lg"><i className ="fa fa-twitter fa-fw"></i> <span className ="network-name">Twitter</span></a>
  //                       </li>
  //                       <li>
  //                           <a href="https://github.com/IronSummitMedia/startbootstrap" className="btn btn-default btn-lg"><i className="fa fa-github fa-fw"></i> <span className="network-name">Github</span></a>
  //                       </li>
  //                       <li>
  //                           <a href="#" className="btn btn-default btn-lg"><i className="fa fa-linkedin fa-fw"></i> <span className="network-name">Linkedin</span></a>
  //                       </li>
  //                   </ul>
  //               </div>
  //           </div>
  //       </div>
  //   </div>
    // <footer>
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-lg-12">
    //                 <ul className="list-inline">
    //                     <li>
    //                         <a href="#">Home</a>
    //                     </li>
    //                     <li className="footer-menu-divider">&sdot;</li>
    //                     <li>
    //                         <a href="#about">About</a>
    //                     </li>
    //                     <li className="footer-menu-divider">&sdot;</li>
    //                     <li>
    //                         <a href="#services">Services</a>
    //                     </li>
    //                     <li className="footer-menu-divider">&sdot;</li>
    //                     <li>
    //                         <a href="#contact">Contact</a>
    //                     </li>
    //                 </ul>
    //                 <p className="copyright text-muted small">Copyright &copy; Your Company 2014. All Rights Reserved</p>
    //             </div>
    //         </div>
    //     </div>
    // </footer>
  render() {
    return (
    <div>
    <a name="about"></a>
    <div className="intro-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="intro-message">
                        <h1>Obento</h1>
                        <h3>The Newest Flash   Generator Of The 21st Century</h3>
                        <hr className="intro-divider"/>
                    </div>
                </div>
            </div>
        </div>
    </div>


	<a  name="services"></a>
    <div className="content-section-a">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-sm-6">
                    <hr className="section-heading-spacer"/>
                    <div className="clearfix"></div>
                    <h2 className="section-heading">Discover Popular Bentos Made By Other Creators:<br/></h2>
                    <p className="lead">Discover Popular Bentos Made By Other Creators for providing the photographs that you see in this template. Visit their website to become a member.</p>
                </div>
                <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                    <img className="img-responsive" src="img/landingImage.jpg" alt=""/>
                </div>
            </div>
        </div>
    </div>

    <div className="content-section-a">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-sm-6">
                    <hr className="section-heading-spacer"/>
                    <div className="clearfix"></div>
                    <h2 className="section-heading">Create Your Own Nori(s)<br/>with Awesome Skins and Customizations</h2><p>Unlimited Bentos and Nori(s)! Get started now with your first Nori!</p>
                </div>
                <div className="col-lg-5 col-lg-offset-2 col-sm-6">
                    <img className="img-responsive" src="img/flashcards.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
    
    <div className="content-section-b">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                    <hr className="section-heading-spacer"/>
                    <div className="clearfix"></div>
                    <h2 className="section-heading">Study With Alexa<br/>from Amazon</h2>
                    <p className="lead">Take your headphones off and finish your study bento when you get home. Check out how to take your learning to the next level</p>
                </div>
                <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                    <img className="img-responsive" src="img/Amazon-Echo.jpg" alt=""/>
                </div>
            </div>
        </div>
    </div>



    </div>
    )
  }
}

export default Landing;