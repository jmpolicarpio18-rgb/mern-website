# install_nodejs.ps1 — Install Node.js LTS via winget with admin elevation and verify

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Node.js LTS Installation Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "`n⚠️  This script needs admin privileges. Requesting elevation..." -ForegroundColor Yellow
    Start-Process powershell.exe -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit
}

Write-Host "`n✅ Running with admin privileges." -ForegroundColor Green

# Check if winget is available
Write-Host "`nChecking for winget..." -ForegroundColor Cyan
$wingetCheck = Get-Command winget -ErrorAction SilentlyContinue
if (-not $wingetCheck) {
    Write-Host "❌ winget not found. Please install winget or Node.js manually from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ winget found." -ForegroundColor Green

# Check if Node.js is already installed
Write-Host "`nChecking if Node.js is already installed..." -ForegroundColor Cyan
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCheck) {
    $version = node --version
    Write-Host "✅ Node.js is already installed: $version" -ForegroundColor Green
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
    Write-Host "`nNo installation needed. Proceeding to next steps..." -ForegroundColor Green
} else {
    Write-Host "Node.js not found. Installing Node.js LTS..." -ForegroundColor Yellow
    winget install --id OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements
    
    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Verify installation
    $nodeCheck = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCheck) {
        $version = node --version
        Write-Host "`n✅ Node.js installed successfully: $version" -ForegroundColor Green
        $npmVersion = npm --version
        Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Node.js installation failed or PATH not updated. Please restart PowerShell and try again." -ForegroundColor Red
        exit 1
    }
}

# Install backend dependencies
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Installing Backend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$backendPath = "$PSScriptRoot\backend"
if (Test-Path $backendPath) {
    Set-Location $backendPath
    Write-Host "📁 Installing npm packages in: $backendPath" -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Backend dependencies installed successfully." -ForegroundColor Green
    } else {
        Write-Host "`n❌ Backend installation failed." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Backend folder not found at $backendPath" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Installing Frontend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$frontendPath = "$PSScriptRoot\frontend"
if (Test-Path $frontendPath) {
    Set-Location $frontendPath
    Write-Host "📁 Installing npm packages in: $frontendPath" -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Frontend dependencies installed successfully." -ForegroundColor Green
    } else {
        Write-Host "`n❌ Frontend installation failed." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Frontend folder not found at $frontendPath" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Navigate to project root: cd '$PSScriptRoot'" -ForegroundColor White
Write-Host "2. Run the application: .\run_all.bat" -ForegroundColor White
Write-Host "3. Backend will run on http://localhost:5000" -ForegroundColor White
Write-Host "4. Frontend will run on http://localhost:3000" -ForegroundColor White
Write-Host "`nPress any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
