import React from 'react' 

class NewBentoInfo extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log(this.props)
    return (
<div className="inner contact">
                <div className="contact-form">
                    <form id="contact-us" method="post" action="#">
                        <div className="col-xs-6 wow animated slideInLeft" data-wow-delay=".5s">
                            <label>Name</label>
                            <input type="text" name="name" id="name" required="required" className="form" placeholder="Name" />
                            <label>Subject</label>
                            <input type="text" name="subject" id="subject" required="required" className="form" placeholder="Subject" />
                        </div>
                        <div className="col-xs-6 wow animated slideInRight" data-wow-delay=".5s">
                            <label>Description</label>
                            <textarea name="message" id="message" className="form textarea"  placeholder="Description"></textarea>
                        </div>
                        <div className="ops-div relative fullwidth col-xs-12">
                            <button type="submit" id="submit" name="submit" className="form-btn semibold pull-right">Save Bento</button> 
                        </div>
                        <div className="clear"></div>
                    </form>

                    <div className="mail-message-area">
                        <div className="alert gray-bg mail-message not-visible-message">
                            <strong>Thank You !</strong> Your email has been delivered.
                        </div>
                    </div>

                </div>
            </div>
    );
  }
}

export default NewBentoInfo
