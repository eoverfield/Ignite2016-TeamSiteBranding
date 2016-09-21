<#
.REQUIREMENTS
Requires PnP-PowerShell version 2.7.1609.3 or later
https://github.com/OfficeDev/PnP-PowerShell/releasess

.SYNOPSIS
Set Alternative CSS and a custom logo

.EXAMPLE
PS C:\> .\Disable-Level2Branding.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite/marketing" 

.EXAMPLE
PS C:\> $creds = Get-Credential
PS C:\> .\Disable-Level2Branding.ps1 -TargetWebUrl "https://intranet.mydomain.com/sites/targetSite" -Credentials $creds
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

    [Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)

if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                Diable Level 2 Branding               |"
Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host ""
Write-Host -ForegroundColor Yellow "Target web: $($targetWebUrl)"
Write-Host ""

try
{
	Connect-SPOnline $targetWebUrl -Credentials $Credentials

	Write-Host -ForegroundColor White "Resetting alternative css"

    #https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md
	Set-SPOWeb -SiteLogoUrl "" -AlternateCssUrl " "

	$customAction = Get-SPOCustomAction -Scope Site | where { $_.Name -eq "PnPResponsiveUI" }
	if ($customAction -ne $null)
	{
    	Remove-SPOCustomAction -Identity $customAction.Id -Scope Site -Force
    }

	Write-Host ""
	Write-Host -ForegroundColor Green "Alterntive CSS removed"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}