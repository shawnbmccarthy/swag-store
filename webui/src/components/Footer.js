import React, { Component } from 'react';
import './Footer.css'

export default class Footer extends Component {
    render(){
        return(
            <div className='footer'>
                <div className='footerContent'>
                    <div className='footerMain crlfix'>
                        <div className='footerBlock'>
                            <div>
                                <p></p>
                                <p> </p>
                            </div>
                        </div>
                        <div className='footerBlock'>
                            <p>&copy; All Rights Reserved</p>
                        </div>
                        <div className='footerBlock clrfix'>
                            <ul className='social'>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}