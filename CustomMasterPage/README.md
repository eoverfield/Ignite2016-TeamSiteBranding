# SharePoint Online Apply a Custom Master Page #

This is demonstration code on how to set a custom Master Page within SharePoint Online using PnP PowerShell. This is a proof of concept for demo purposes, the custom Master Page updates themselves could have been achieved with JavaScript and CSS alone.
This PowerShell script opens a SharePoint Online site, uploads necessary assets to an assets site, i.e. a site collection root site and then sets the custom Master Page.

Concepts and code adapted from the following resources. A big thank you to the Microsoft PnP team for doing all of the heavy lifting in providing not only the PnP project, but also the CSS, JS and other assets used in this demo.
<a href="https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive">https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive</a>.

>**Note**: This is an **Open Source** project, and any contribution from the community
is more than welcome. 
	
# Setup Instructions #
In order to setup the solution and to apply a custom theme on a target Web, you simply need to:
* [Download the files included in this solution](#download)
* [Setup software requirements](#requirements)
* [Execute the *Set-Level3Branding.ps1* cmdlet within the solution folder](#execute)

<a name="download"></a>
## Download the files
You can download the files manually, one by one, or you can download the entire branch

<a name="requirements"></a>
## Setup software requirements
This solution requires the OfficeDevPnP.PowerShell commands, which you can install
from the following link:

* <a href="https://github.com/OfficeDev/PnP-PowerShell/releases">OfficeDevPnP.PowerShell Release - Minumum relase for this script - version 2.7.1609.3 or later</a>

If you want, you can also read the following 
<a href="https://github.com/OfficeDev/PnP-PowerShell#installation">instructions</a>
for further details about installing OfficeDevPnP.PowerShell.

# Installing pre-reqs #

Install NodeJs
Install Ruby
Install Sass
Install gulp-cli (or grunt, but webapp by Yeoman team uses gulp)
	npm install -g gulp-cli
	
The pre-reqs are necessary if you want to re-compile css and js included in this package, or if you want to serve files locally for testing. Once the pre-reqs are installed, execute the comment:
*gulp serve*
from this folder.

<a name="execute"></a>
## Execute the *Set-Level3Branding.ps1* cmdlet
Once you have installed the OfficeDevPnP.PowerShell commands, you can simply open a 
PowerShell console, go to the path where you stored the files, look within the "solution" folder and execute the *Set-Level3Branding.ps1*
cmdlet, which is included in the
<a href="./solution/Set-Level3Branding.ps1">solution/Set-Level3Branding.ps1</a> script file of this solution.

The *Set-Level3Branding* cmdlet accepts the following parameters:
* **targetWebUrl**: it is a mandatory parameter, which declares what web to apply the custom components, like for example: https://intranet.mydomain.com/sites/targetSite
* **TargetSiteUrl**: it is an optional parameter, which declares the web where components assets including the CSS/JS/Images. If this parameter is not provided, then TargetWebUrl is assumed as the provisions asset site as well, such as: https://intranet.mydomain.com/sites/targetSite\\
* **Credentials**: it is an optional parameter, which defines the user credentials that will be used to authenticate against both the target Site Collection and the infrastructure Site Collection, if any. Should be the credentials of a user, who is Site Collection Administrator for the target Site Collections. If you don't provide this parameter, the script will directly prompt you for credentials.
* **ServeLocal**: it is an optional parameter, default is false. If $true, then SharePoint will be told to look at the localhost for serving JS and CSS files during development. If $true, be sure to execute "gulp serve" within this folder to spin up the local web server.

Here you can see a couple of examples about how to invoke the *Set-Level3Branding* cmdlet:

###EXAMPLE 1
```PowerShell
PS C:\> $creds = Get-Credential
PS C:\> .\Set-Level3Branding.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds -ServeLocal $true
```

The example above provisions assets to the site collection root web, https://intranet.mydomain.com/sites/targetSite, uses the credentials pre-provided with Get-Credential, and also has SharePoint set to direct browsers to the localhost for custom CSS/JS/Images.

###EXAMPLE 2
```PowerShell
PS C:\> $creds = Get-Credential
PS C:\> .\Set-Level3Branding.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
```

The example above provisions assets to the same location as where the custom components should be applied. The user's credentials are  provided through the *$creds* variable and SharePoint will host the custom files as well.

<a name="disable"></a>
# Disable the custom Master Page#
The *Set-Level3Branding* cmdlet accepts the following parameters:
* **targetWebUrl**: it is a mandatory parameter, which declares what web to deactivate the custom components, for example: https://intranet.mydomain.com/sites/targetSite
* **Credentials**: it is an optional parameter, which defines the user credentials that will be used to authenticate against both the target Site Collection and the infrastructure Site Collection, if any. Should be the credentials of a user, who is Site Collection Administrator for the target Site Collections. If you don't provide this parameter, the script will directly prompt you for credentials.

###EXAMPLE 1
```PowerShell
PS C:\> $creds = Get-Credential
PS C:\> .\Disable-Level3Branding.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds

<a name="overview"></a>
# Solution Overview #
The solution leverages the PnP to upload and set a custom Master Page.

# Helpful Links #

PnP Deploying Custom Theming Inspiration Project
https://github.com/OfficeDev/PnP/tree/master/Samples/Branding.DeployCustomThemeWeb

PnP Responsive UI Inspiration Project
https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive