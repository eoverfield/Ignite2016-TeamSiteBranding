<#
.REQUIREMENTS
Requires PnP-PowerShell version 2.7.1609.3 or later
https://github.com/OfficeDev/PnP-PowerShell/releasess

.SYNOPSIS
Disabled custom master page and logo

.EXAMPLE
PS C:\> .\Disable-Level3Branding.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite/marketing" 

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\Disable-Level3Branding.ps1 -TargetSiteUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
#>

[CmdletBinding()]
param
(
    [Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target site, e.g. 'https://intranet.mydomain.com/sites/targetWeb'")]
    [String]
    $targetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)

if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                Diable Level 3 Branding               |"
Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host ""
Write-Host -ForegroundColor Yellow "Target site: $($targetSiteUrl)"
Write-Host ""

try
{
	Connect-SPOnline $targetSiteUrl -Credentials $Credentials

	Write-Host -ForegroundColor White "Resetting master page"

	$webRootPath = $targetSiteUrl.Substring($targetSiteUrl.IndexOf('/',8))
	$masterUrl = "$webRootPath/_catalogs/masterpage/seattle.master"

    #https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md
	Set-SPOWeb -MasterUrl $masterUrl -SiteLogoUrl ""

	Write-Host ""
	Write-Host -ForegroundColor Green "Custom master page removed"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}