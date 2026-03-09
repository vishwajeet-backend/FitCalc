# Test Feedback Email Functionality
# This script tests the feedback form by sending a test submission

Write-Host "Testing FitCalc Feedback Email..." -ForegroundColor Cyan
Write-Host ""

# Test data
$testData = @{
    name = "Test User"
    email = "test@example.com"
    phone = "123-456-7890"
    company = "Test Company"
    rating = 5
    feedback = "This is a test feedback to verify the email functionality is working correctly!"
    acceptPrivacy = $true
} | ConvertTo-Json

Write-Host "Sending test feedback..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/feedback' `
        -Method POST `
        -Body $testData `
        -ContentType 'application/json' `
        -ErrorAction Stop
    
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Green
    Write-Host $response.message -ForegroundColor White
    Write-Host ""
    Write-Host "Check your email at: vishwajeetbackend@gmail.com" -ForegroundColor Cyan
    Write-Host "Subject: FitCalc Feedback from Test User - 5 Stars" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "FAILED!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor White
    Write-Host ""
    
    if ($_.ErrorDetails) {
        Write-Host "Details:" -ForegroundColor Red
        Write-Host $_.ErrorDetails.Message -ForegroundColor White
    }
}
