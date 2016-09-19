SharePoint Branding Workshop - 2016
==============

This repository contains all of the source code for my SharePoint 2013/2016/O365 branding workshop presented in 2016.

#Installing pre-reqs

Install NodeJs
Install Ruby
Install Sass
Install Git
	add to path, i.e.
		$env:path += ";E:\Program Files (x86)\Git\bin\Git\bin"

Install Bower
	npm install -g bower
Install gulp-cli (or grunt, but webapp by Yeoman team uses gulp)
	npm install -g gulp-cli

Install bower (package manager)
	npm install -g bower
	
Install Yeoman globally
	npm install -g yo
	
Install Yeoman webapp generator globally
	npm install -g generator-webapp
	
Change to the folder you want to create your new local SP app
	lots of generators out there (https://github.com/yeoman/generator-webapp)
	yo webapp
	possibly
		npm install
		bower install
		
Change gulpfile.babel.js
	add https: true and remove port for "serve"
	
	
#Changes made

Once the Yeoman app was created, I added a grunt file to use Grunt instead of Gulp. I like Grunt's sass implemenation better.

So after cloning this project run the following commands in PowerShell

npm install

bower install

grunt

This will take what is in the app folder, including css and js and compile to .tmp folder. .tmp folder contains what we want SP to use.


#Other notes

##PnP Responsive UI

Installing SPO PowerShell
	https://technet.microsoft.com/en-us/library/fp161362(v=office.15).aspx
	
Installing PnP PowerShell
	https://github.com/OfficeDev/PnP-PowerShell
		get Setup files from
			https://github.com/officedev/pnp-powershell/releases
			PnPPowerShellCommands16.msi for SPO
		
		in PS, running as admin
			Invoke-Expression (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/OfficeDev/PnP-PowerShell/master/Samples/Modules.Install/Install-OfficeDevPnPPowerShell.ps1')

Ensure can execute scripts
	Set-ExecutionPolicy RemoteSigned

PnP Example provision template
	https://github.com/OfficeDev/PnP-Provisioning-Schema/tree/master/Samples
	
PnP Provisioning Schema
	https://github.com/OfficeDev/PnP-Provisioning-Schema/blob/master/ProvisioningSchema-2015-12.md
	
PnP Responsive Package
	https://github.com/OfficeDev/PnP-Tools/tree/master/Solutions/SharePoint.UI.Responsive
	

#PS commands to provision IA - need to be able to execute Connect-SPOnline
#install common IA
Set-ExecutionPolicy RemoteSigned
$creds = Get-Credential
.\provisionIA.ps1 -TargetSiteUrl "https://pixelmill.sharepoint.com/sites/demo-branding-workshop" -Credentials $creds


#to installed responsive UI components - from SharePoint.UI.Responsive folder
$creds = Get-Credential
.\Enable-SPResponsiveUI.ps1 -TargetSiteUrl "https://pixelmill.sharepoint.com/sites/demo-branding-workshop" -Credentials $creds
.\Disable-SPResponsiveUI.ps1 -TargetSiteUrl "https://pixelmill.sharepoint.com/sites/demo-branding-workshop" -Credentials $creds