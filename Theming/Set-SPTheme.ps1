<#
.REQUIREMENTS
Requires PnP-PowerShell version 2.7.1609.3 or later
https://github.com/OfficeDev/PnP-PowerShell/releasess

.SYNOPSIS
Set a custom theme for a specific web. If a site collection is also provided, then use the site colleciton theme folder for theme storage

.EXAMPLE
PS C:\> .\Set-SPTheme.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite/marketing" -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" 

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\Set-SPTheme.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -MasterUrl "oslo.master" -Credentials $creds
#>

[CmdletBinding()]
param
(
    [Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target web, e.g. 'https://intranet.mydomain.com/sites/targetWeb'")]
    [String]
    $targetWebUrl,

	[Parameter(Mandatory = $false, HelpMessage="Enter the URL of the target asset location, i.e. site collection root web, e.g. 'https://intranet.mydomain.com/sites/targetWeb'")]
    [String]
    $targetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="The theme master page url, relateive to Master Page Gallery of the target Web Url. Defaults to seattle.master")]
    [String]
    $masterUrl,

    [Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)

if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}
if ($targetSiteUrl -eq "")
{
    $targetSiteUrl = $targetWebUrl
}
if ($masterUrl -eq "")
{
    $masterUrl = "seattle.master"
}

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                   Set Custom Theme                   |"
Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host ""
Write-Host -ForegroundColor Yellow "Target web: $($targetWebUrl)"
Write-Host -ForegroundColor Yellow "Target asset location : $($targetSiteUrl)"
Write-Host ""

try
{
	Connect-SPOnline $targetSiteUrl -Credentials $Credentials

	Write-Host -ForegroundColor White "Provisioning asset files to $($targetSiteUrl)"
	Apply-SPOProvisioningTemplate -Path .\Custom.SPTheme.Infrastructure.xml -Handlers Files

	#If the asset and target locations are different, then open up the target web now
	if($targetSiteUrl -ne $targetWebUrl)
	{	
		Disconnect-SPOnline
		Connect-SPOnline $targetWebUrl -Credentials $Credentials
	}

	$rootPath = $targetSiteUrl.Substring($targetSiteUrl.IndexOf('/',8))
	$colorPaletteUrl = "$rootPath/_catalogs/theme/15/custom.theme.spcolor"
	$bgImageUrl = "$rootPath/SiteAssets/custom.theme.bg.jpg"

	Write-Host -ForegroundColor White "Setting composed look for $($targetWebUrl)"

	#https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOTheme.md
	Set-SPOTheme -ColorPaletteUrl $colorPaletteUrl -BackgroundImageUrl $bgImageUrl

	#now set the master page
	$webRootPath = $targetWebUrl.Substring($targetWebUrl.IndexOf('/',8))
	$masterUrl = "$webRootPath/_catalogs/masterpage/$masterUrl"
	Write-Host -ForegroundColor White "Setting master page to $($masterUrl)"

    #https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md
	Set-SPOWeb -MasterUrl $masterUrl

	Write-Host ""
	Write-Host -ForegroundColor Green "Composed Look applied"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}