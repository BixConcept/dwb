import React, { Component } from "react";
import css from "../../styles/home.module.scss";
import isElectron from "is-electron";
import { BrowserView, MobileView, isBrowser, isMobile, isAndroid } from "react-device-detect";

class DownloadField extends Component {
    render() {
        const { t } = this.props;
        
        function detactFileType() { 
            let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            file = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
          file = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          file = 'iOS'; 
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          file = 'Windows';
        } else if (/Android/.test(userAgent)) {
          file = 'Android';
        } else if (!file && /Linux/.test(platform)) {
          file = 'Linux';
        }
        return file;
      }
        let file = detactFileType();
        if (isElectron()) {
            return (
                null
            )
        }
        else {
            return (
                <BrowserView>
                    <section className="p-2 text-center bg-light">
                        <div className="container">
                            <button className={css.downloadBtn}>
                                <a href={file} download>
                                    <i className="fa fa-download"></i>
                                 &nbsp; the dwb-App</a>
                            </button>
                    </div>
                    </section>
                </BrowserView>
            )
        }
    }
}

export default DownloadField;