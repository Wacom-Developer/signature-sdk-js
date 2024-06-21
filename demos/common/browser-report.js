/*
 * Detect browser name and version and os name and version.
 * Based on the project https://github.com/keithws/browser-report
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Keith Shaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
async function getBrowserNameAndOS() {
	// initialize object to store results
    const report = {
        "browser": {
            "name": null,
            "version": null
        },
        "os": {
            "name": null,
            "version": null
        }
    };
	
	//try to use the experimental Usre-Agent Client Hints API
	const navigatorUAData = navigator.userAgentData;
	 
	if (navigatorUAData) {
	    const values = await navigatorUAData.getHighEntropyValues(["platformVersion"]);
		const brandList = ['chrome', 'opera', 'safari', 'edge', 'firefox']
		
		let found = false;
		for (const agentBrand of values.brands) {
		    const agentBrandEntry = agentBrand.brand.toLowerCase();
			const foundBrand = brandList.find(brand => { //eslint-disable-line
                if (agentBrandEntry.includes(brand)) {
                    return brand
                }
            })
			if (foundBrand) {
                report.browser.name = agentBrand.brand;
				report.browser.version = agentBrand.version;
				found = true;
                break
            }
		}
		
		if (!found) {
			report.browser.name = values.brands[0].brand;
			report.browser.version = values.brands[0].version;
		}
		
		
		report.os.name = values.platform;
		report.os.version = values.platformVersion;
	} else {	
        const userAgent = navigator.userAgent;    

        // extract browser name from user agent
        if (userAgent.indexOf("Trident") >= 0 || userAgent.indexOf("MSIE") >= 0) {
            if (userAgent.indexOf("Mobile") >= 0) {
                report.browser.name = "IE Mobile";
            } else {
                report.browser.name = "Internet Explorer";
            }
        }

        if (userAgent.indexOf("Firefox") >= 0 && userAgent.indexOf("Seamonkey") === -1) {
            if (userAgent.indexOf("Android") >= 0) {
                report.browser.name = "Firefox for Android";
            } else {
                report.browser.name = "Firefox";
            }
        }

        if (userAgent.indexOf("Safari") >= 0 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Chromium") === -1 && userAgent.indexOf("Android") === -1) {
            if (userAgent.indexOf("CriOS") >= 0) {
                report.browser.name = "Chrome for iOS";
            } else if (userAgent.indexOf("FxiOS") >= 0) {
                report.browser.name = "Firefox for iOS";
            } else {
                report.browser.name = "Safari";
            }
        }

        if (userAgent.indexOf("Chrome") >= 0) {
            if (userAgent.match(/\bChrome\/[.0-9]* Mobile\b/)) {
                if (userAgent.match(/\bVersion\/\d+\.\d+\b/) || userAgent.match(/\bwv\b/)) {
                    report.browser.name = "WebView on Android";
                } else {
                    report.browser.name = "Chrome for Android";
                }
            } else {
                report.browser.name = "Chrome";
            }
        }

        if (userAgent.indexOf("Android") >= 0 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Chromium") === -1 && userAgent.indexOf("Trident") === -1 && userAgent.indexOf("Firefox") === -1) {
            report.browser.name = "Android Browser";
        }

        if (userAgent.indexOf("Edge") >= 0) {
            report.browser.name = "Edge";
        }

        if (userAgent.indexOf("UCBrowser") >= 0) {
            report.browser.name = "UC Browser for Android";
        }

        if (userAgent.indexOf("SamsungBrowser") >= 0) {
            report.browser.name = "Samsung Internet";
        }

        if (userAgent.indexOf("OPR") >= 0 || userAgent.indexOf("Opera") >= 0) {
            if (userAgent.indexOf("Opera Mini") >= 0) {
                report.browser.name = "Opera Mini";
            } else if (userAgent.indexOf("Opera Mobi") >= 0 || userAgent.indexOf("Opera Tablet") >= 0 || userAgent.indexOf("Mobile") >= 0) {
                report.browser.name = "Opera Mobile";
            } else {
                report.browser.name = "Opera";
            }
        }

        if (userAgent.indexOf("BB10") >= 0 || userAgent.indexOf("PlayBook") >= 0 || userAgent.indexOf("BlackBerry") >= 0) {
            report.browser.name = "BlackBerry";
        }

        if (userAgent.indexOf("MQQBrowser") >= 0) {
            report.browser.name = "QQ Browser";
        }


        // extract browser version number from user agent
        let match = null;

        switch (report.browser.name) {
            case "Chrome":
            case "Chrome for Android":
            case "WebView on Android":
                match = userAgent.match(/Chrome\/((\d+\.)+\d+)/);
                break;
            case "Firefox":
            case "Firefox for Android":
                match = userAgent.match(/Firefox\/((\d+\.)+\d+)/);
                break;
            case "Firefox for iOS":
                match = userAgent.match(/FxiOS\/((\d+\.)+\d+)/);
                break;
            case "Edge":
            case "Internet Explorer":
            case "IE Mobile":

                if (userAgent.indexOf("Edge") >= 0) {
                    match = userAgent.match(/Edge\/((\d+\.)+\d+)/);
                } else if (userAgent.indexOf("rv:11") >= 0) {
                    match = userAgent.match(/rv:((\d+\.)+\d+)/);
                } else if (userAgent.indexOf("MSIE") >= 0) {
                    match = userAgent.match(/MSIE ((\d+\.)+\d+)/);
                }

                break;
            case "Safari":
                match = userAgent.match(/Version\/((\d+\.)+\d+)/);
                break;
            case "Android Browser":
                match = userAgent.match(/Android ((\d+\.)+\d+)/);
                break;
            case "UC Browser for Android":
                match = userAgent.match(/UCBrowser\/((\d+\.)+\d+)/);
                break;
            case "Samsung Internet":
                match = userAgent.match(/SamsungBrowser\/((\d+\.)+\d+)/);
                break;
            case "Opera Mini":
                match = userAgent.match(/Opera Mini\/((\d+\.)+\d+)/);
                break;
            case "Opera":
                if (userAgent.match(/OPR/)) {
                    match = userAgent.match(/OPR\/((\d+\.)+\d+)/);
                } else if (userAgent.match(/Version/)) {
                    match = userAgent.match(/Version\/((\d+\.)+\d+)/);
                } else {
                    match = userAgent.match(/Opera\/((\d+\.)+\d+)/);
                }
                break;
            case "BlackBerry":
                match = userAgent.match(/Version\/((\d+\.)+\d+)/);
                break;
            case "QQ Browser":
                match = userAgent.match(/MQQBrowser\/((\d+\.)+\d+)/);
                break;
            default:
                match = userAgent.match(/\/((\d+\.)+\d+)$/);
                break;
        }

        if (match && match[1]) {
            report.browser.version = match[1];
        }


        // extract operating system name from user agent
        if (userAgent.indexOf("Windows") >= 0) {
            if (userAgent.indexOf("Windows Phone") >= 0) {
                report.os.name = "Windows Phone";
            } else {
                report.os.name = "Windows";
            }
        }

        if (userAgent.indexOf("OS X") >= 0 && userAgent.indexOf("Android") === -1) {
            report.os.name = "OS X";
        }

        if (userAgent.indexOf("Linux") >= 0) {
            report.os.name = "Linux";
        }

        if (userAgent.indexOf("like Mac OS X") >= 0) {
            report.os.name = "iOS";
        }

        if ((userAgent.indexOf("Android") >= 0 || userAgent.indexOf("Adr") >= 0) && userAgent.indexOf("Windows Phone") === -1) {
            report.os.name = "Android";
        }

        if (userAgent.indexOf("BB10") >= 0) {
            report.os.name = "BlackBerry";
        }

        if (userAgent.indexOf("RIM Tablet OS") >= 0) {
            report.os.name = "BlackBerry Tablet OS";
        }

        if (userAgent.indexOf("BlackBerry") >= 0) {
            report.os.name = "BlackBerryOS";
        }

        if (userAgent.indexOf("CrOS") >= 0) {
            report.os.name = "Chrome OS";
        }

        if (userAgent.indexOf("KAIOS") >= 0) {
            report.os.name = "KaiOS";
        }

        // extract operating system version from user agent
        match = null;

        switch (report.os.name) {
            case "Windows":
            case "Windows Phone":
                if (userAgent.indexOf("Win16") >= 0) {
                    report.os.version = "3.1.1";
                } else if (userAgent.indexOf("Windows CE") >= 0) {
                    report.os.version = "CE";
                } else if (userAgent.indexOf("Windows 95") >= 0) {
                    report.os.version = "95";
                } else if (userAgent.indexOf("Windows 98") >= 0) {
                    if (userAgent.indexOf("Windows 98; Win 9x 4.90") >= 0) {
                        report.os.version = "Millennium Edition";
                    } else {
                        report.os.version = "98";
                    }
                } else {
                    match = userAgent.match(/Win(?:dows)?(?: Phone)?[ _]?(?:(?:NT|9x) )?((?:(\d+\.)*\d+)|XP|ME|CE)\b/);

                    if (match && match[1]) {
                        switch (match[1]) {
                        case "6.4":
                            // some versions of Firefox mistakenly used 6.4
                            match[1] = "10.0";
                            break;
                        case "6.3":
                            match[1] = "8.1";
                            break;
                        case "6.2":
                            match[1] = "8";
                            break;
                        case "6.1":
                            match[1] = "7";
                            break;
                        case "6.0":
                            match[1] = "Vista";
                            break;
                        case "5.2":
                            match[1] = "Server 2003";
                            break;
                        case "5.1":
                            match[1] = "XP";
                            break;
                        case "5.01":
                            match[1] = "2000 SP1";
                            break;
                        case "5.0":
                            match[1] = "2000";
                            break;
                        case "4.0":
                            match[1] = "4.0";
                            break;
                        default:
                            // nothing
                            break;
                        }
                    }
                }
                break;
            case "OS X":
                match = userAgent.match(/OS X ((\d+[._])+\d+)\b/);
                break;
            case "Linux":
                // linux user agent strings do not usually include the version
                report.os.version = null;
                break;
            case "iOS":
                match = userAgent.match(/OS ((\d+[._])+\d+) like Mac OS X/);
                break;
            case "Android":
                match = userAgent.match(/(?:Android|Adr) (\d+([._]\d+)*)/);
                break;
            case "BlackBerry":
            case "BlackBerryOS":
                match = userAgent.match(/Version\/((\d+\.)+\d+)/);
                break;
            case "BlackBerry Tablet OS":
                match = userAgent.match(/RIM Tablet OS ((\d+\.)+\d+)/);
                break;
            case "Chrome OS":
                report.os.version = report.browser.version;
                break;
            case "KaiOS":
                match = userAgent.match(/KAIOS\/(\d+(\.\d+)*)/);
                break;
            default:
                // no good default behavior
                report.os.version = null;
                break;
        }

        if (match && match[1]) {
            // replace underscores in version number with periods
            match[1] = match[1].replace(/_/g, ".");
            report.os.version = match[1];
        }

        // handle Mac OS X / OS X / macOS naming conventions
        if (report.os.name === "OS X" && report.os.version) {
            const versions = report.os.version.split(".");
            if (versions.length >= 2) {
                const minorVersion = parseInt(versions[1], 10);
                if (minorVersion <= 7) {
                    report.os.name = "Mac OS X";
                } else if (minorVersion >= 12) {
                    report.os.name = "macOS";
                } else {
                    report.os.name = "OS X";
                }
            }
        }
	}

    return report;
}

export { getBrowserNameAndOS }