import React, { Component } from 'react'
import sha256 from 'crypto-js/sha256'

export default class genPw extends Component {
    render() {
        let message = "Hello";
        let nonce = null;
        return (
            <div>
            {
                console.log(sha256(nonce + message))

            }               
            </div>
        )
    }
}
