#===================================================================================
#
# This is the main entry point for the deployment process
#
#===================================================================================

param(
	[Parameter(Mandatory = $true, HelpMessage="Enter the URL of the target site, e.g. 'https://intranet.mydomain.com/sites/targetSite'")]
    [String]
    $targetSiteUrl,

    [Parameter(Mandatory = $false, HelpMessage="Serve assets from localhost, default is false")]
    [Bool]
    $serveLocal,

    [Parameter(Mandatory = $false, HelpMessage="Is publishing enabled? Default is true")]
    [Bool]
    $publishing,

	[Parameter(Mandatory = $false, HelpMessage="Optional administration credentials")]
    [PSCredential]
    $Credentials
)


#===================================================================================
# Func: Get-ScriptDirectory
# Desc: Get the script directory from variable
#===================================================================================
function Get-ScriptDirectory
{
  $Invocation = (Get-Variable MyInvocation -Scope 1).Value
  Split-Path $Invocation.MyCommand.Path
}

#===================================================================================
# Func: ApproveMasterPageGallery
# Desc: Checkout and check in all files in MPG
# Comments: Adapted from https://skodvinhvammen.wordpress.com/2015/10/23/download-files-and-folders-using-office-365-dev-pnp-powershell-cmdlets/
#===================================================================================
function ApproveMasterPageGallery($url, [int]$levels)
{
	$web = Get-SPOWeb

    $root = $web.GetFolderByServerRelativeUrl($url);
    $files = $root.Files;
    $web.Context.Load($root);
    $web.Context.Load($files);
    $web.Context.ExecuteQuery();
 
    foreach($file in $files)
    {   
	    Write-Host "Publishing: " $file.Name
        Set-SPOFileCheckedOut -Url $file.serverRelativeUrl
		Set-SPOFileCheckedIn -Url $file.serverRelativeUrl -CheckinType MajorCheckIn -Comment "Initial Publish"
    }
 
    if($levels -gt 0)
    {
        $folders = $root.Folders;
        $web.Context.Load($folders);
        $web.Context.ExecuteQuery();
 
        foreach($folder in $folders)
        {
            ApproveMasterPageGallery $folder.ServerRelativeUrl ($levels - 1)
        }    
    }
}

#===================================================================================
# Set current script location
#===================================================================================
$currentDir = Get-ScriptDirectory
Set-Location -Path $currentDir

#===================================================================================
# Verify Credentials
#===================================================================================
if($Credentials -eq $null)
{
	$Credentials = Get-Credential -Message "Enter Admin Credentials"
}

#===================================================================================
# Verify if serving assets locally for local dev - default to false
#===================================================================================
if ($serveLocal -ne $true)
{
	$serveLocal = $false
}

#===================================================================================
# Installing to site with publishing enabled? default is true
#===================================================================================
if ($publishing -eq $null)
{
	$publishing = $true
}

#===================================================================================
# Confirm the environment
#===================================================================================
Write-Host -ForegroundColor Cyan "		SharePoint site collection URL: " -nonewline; Write-Host -ForegroundColor White $targetSiteUrl
Write-Host ""

Write-Host -ForegroundColor White "--------------------------------------------------------"
Write-Host -ForegroundColor White "|                  Set Level 3 Branding                |"
Write-Host -ForegroundColor White "--------------------------------------------------------"

Write-Host -ForegroundColor Yellow "Target Site URL: $targetSiteUrl"

try
{
    Connect-SPOnline $targetSiteUrl -Credentials $Credentials
    if ($publishing -eq $true)
    {
    	Apply-SPOProvisioningTemplate -Path .\templates\root-publishing.xml
    }
    else
    {
    	Apply-SPOProvisioningTemplate -Path .\templates\root.xml
    }

	$webRootPath = $targetSiteUrl.Substring($targetSiteUrl.IndexOf('/',8))
	$masterUrl = "$webRootPath/_catalogs/masterpage/custom-branding/contoso.master"
	$logoUrl = "$webRootPath/SiteAssets/ContosoNavLogo.png"

	Write-Host -ForegroundColor White "Setting master page to $($masterUrl)"

	#must approve MPG files for now as pnp:FileLevel Level="Published" does not appear to be working as expected
	ApproveMasterPageGallery "$($webRootPath)/_catalogs/masterpage/custom-branding" 4

    #https://github.com/OfficeDev/PnP-PowerShell/blob/master/Documentation/SetSPOWeb.md
	Set-SPOWeb -MasterUrl $masterUrl -SiteLogoUrl $logoUrl

    Write-Host -ForegroundColor Green "Custom Master Page deployment complete"
}
catch
{
    Write-Host -ForegroundColor Red "Exception occurred!" 
    Write-Host -ForegroundColor Red "Exception Type: $($_.Exception.GetType().FullName)"
    Write-Host -ForegroundColor Red "Exception Message: $($_.Exception.Message)"
}