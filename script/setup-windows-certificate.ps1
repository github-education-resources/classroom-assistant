$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

$env:KEY_LINK | Out-File "$scriptPath\windows-certificate.p7b"

$env:ELECTRON_FORGE_ELECTRON_WINSTALLER_CONFIG_CERTIFICATE_FILE = "$scriptPath\windows-certificate.p7b"

echo $env:ELECTRON_FORGE_ELECTRON_WINSTALLER_CONFIG_CERTIFICATE_FILE
