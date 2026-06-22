Add-Type -AssemblyName System.IO.Compression.FileSystem

$outDir = "C:\Users\hp\perShare_Production\frontend-nextjs\out"
$zipPath = "C:\Users\hp\perShare_Production\frontend-nextjs\out.zip"

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

Get-ChildItem -Path $outDir -Recurse -File | ForEach-Object {
    $rel = $_.FullName.Substring($outDir.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel) | Out-Null
}

$zip.Dispose()
Write-Host "ZIP created: $zipPath"
