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
            
            let macPath =     "dwbFiles/dwb-.";
            let iosPath =     "dwbFiles/dwb-.";
            let windowsPath = "dwbFiles/dwb-.";
            let androidPath = "dwbFiles/dwb-.";
            let linuxPath =   "dwbFiles/dwb-.";

        if (macosPlatforms.indexOf(platform) !== -1) {
          file = macPath;
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          file = iosPath; 
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          file = windowsPath;
        } else if (/Android/.test(userAgent)) {
          file = androidPath;
        } else if (!file && /Linux/.test(platform)) {
          file = linuxPath;
        }
        return file;}
        
        let file = detactFileType();

        if (isElectron()) {
            return null
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