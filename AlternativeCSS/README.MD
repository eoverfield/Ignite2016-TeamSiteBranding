# SharePoint Online Apply Custom Theming #

This is demonstration code on how to set a custom theme within SharePoint Online using PnP PowerShell.
This PowerShell script opens a SharePoint Online site, uploads necessary assets such as the spcolor file and a background image to an assets site, i.e. a site collection root site and then sets theme for a given web that utilizes the uploaded assets. A custom master page is also set with this script.

Concepts and code adapted from the following resources. A big thank you to the Microsoft PnP team for doing all of the heavy lifting in providing not only the PnP project, but also the CSS, JS and other assets used in this demo.
<a href="https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive">https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive</a>.

>**Note**: This is an **Open Source** project, and any contribution from the community
is more than welcome. 

# Setup Instructions #
In order to setup the solution and to apply a custom theme on a target Web, you simply need to:
* [Download the files included in this solution](#download)
* [Setup software requirements](#requirements)
* [Execute the *Set-SPTheme* cmdlet](#execute)

You may also set the web in question to utilize an existing Composed Look via the "Change the Look" opition found in Site Settings.

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

<a name="execute"></a>
## Execute the *Set-SPTheme* cmdlet
Once you have installed the OfficeDevPnP.PowerShell commands, you can simply open a 
PowerShell console, go to the path where you stored the files and execute the *Set-SPTheme*
cmdlet, which is included in the
<a href="./Set-SPTheme.ps1">Set-SPTheme.ps1</a> script file of this solution.

The *Set-SPTheme* cmdlet accepts the following three parameters:
* **targetWebUrl**: it is a mandatory parameter, which declares what web to apply the custom theme, like for example: https://intranet.mydomain.com/sites/targetSite
* **TargetSiteUrl**: it is an optional parameter, which declares the web where theme assets including the spcolor file and background image should be provisiioned. If this parameter is not provided, then TargetWebUrl is assumed as the provisions asset site as well, such as: https://intranet.mydomain.com/sites/targetSite
* **MasterUrl**: it is an optional paramater, and specifies the master page that this theme should utilze. The value provided should be relative to the targetWebUrl's master page gallery llyer in question. Seattle.master is assumed if no MasterUrl is provided.
* **Credentials**: it is an optional parameter, which defines the user credentials that will be used to authenticate against both the target Site Collection and the infrastructure Site Collection, if any. Should be the credentials of a user, who is Site Collection Administrator for the target Site Collections. If you don't provide this parameter, the script will directly prompt you for credentials.

Here you can see a couple of examples about how to invoke the *Set-SPTheme* cmdlet:

###EXAMPLE 1
```PowerShell
PS C:\> .\Set-SPTheme.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite/marketing" -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" 
```

The example above provisions theme assets to the site collection root web, https://intranet.mydomain.com/sites/targetSite, while enabling the theme only at https://intranet.mydomain.com/sites/targetSite/marketing.

###EXAMPLE 2
```PowerShell
PS C:\> $creds = Get-Credential
PS C:\> .\Set-SPTheme.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -MasterUrl "oslo.master" -Credentials $creds
```

The example above provisions theme assets to the same location as where the theme should be applied, while also setting the master page to oslo.moaster. The user's credentials are  provided through the *$creds* variable.

<a name="disable"></a>
# Disable the Custom theme#
Disable the custom theme by applying an OOTB spcolor file and resetting the background image, or "Change the look" of the web in question via the browser.

<a name="overview"></a>
# Solution Overview #
The solution leverages the SharePoint theming commands to set a custom spcolor and background image.

# Helpful Links #

PnP Deploying Custom Theming Inspiration Project
https://github.com/OfficeDev/PnP/tree/master/Samples/Branding.DeployCustomThemeWeb

PnP Responsive UI Inspiration Project
https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive