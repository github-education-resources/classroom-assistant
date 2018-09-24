$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

# Output Base64 encoded Certificate to File
$env:KEY_LINK | Out-File "$scriptPath\windows-certificate-base64.txt"

# Decode certificate
certutil -decode "$scriptPath\windows-certificate-base64.txt" "$scriptPath\windows-certificate.pfx"

# Remove base64 file
Remove-Item "$scriptPath\windows-certificate-base64.txt"
