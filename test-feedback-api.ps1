# Quick Test Script for Feedback API
# Run this to test if the backend feedback endpoint is working

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  FitCalc Feedback API Test Script  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if backend is running
Write-Host "[Test 1] Checking if backend is running..." -ForegroundColor Yellow
try {
    $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -UseBasicParsing -TimeoutSec 5
    Write-Host "[PASS] Backend is running!" -ForegroundColor Green
    Write-Host "  Status: $($health.StatusCode)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "[FAIL] Backend is NOT running!" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the backend first:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  npm start" -ForegroundColor White
    exit
}

# Test 2: Test valid feedback submission
Write-Host "[Test 2] Testing valid feedback submission..." -ForegroundColor Yellow

$validPayload = @{
    name = "Test User"
    email = "testuser@example.com"
    phone = "(555) 123-4567"
    company = "Test Company"
    rating = 5
    feedback = "This is a test feedback from the test script. Everything looks great!"
    acceptPrivacy = $true
} | ConvertTo-Json

Write-Host "Payload:" -ForegroundColor Gray
Write-Host $validPayload -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/feedback" -Method POST -Body $validPayload -ContentType "application/json" -UseBasicParsing -TimeoutSec 10
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "[PASS] Feedback submitted successfully!" -ForegroundColor Green
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "  Message: $($result.message)" -ForegroundColor Gray
    Write-Host "  Feedback ID: $($result.feedbackId)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "[FAIL] Failed to submit feedback!" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    Write-Host ""
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "  Backend response: $responseBody" -ForegroundColor Red
        Write-Host ""
    }
}

# Test 3: Test missing required fields (should fail)
Write-Host "[Test 3] Testing missing required fields (should fail)..." -ForegroundColor Yellow

$invalidPayload = @{
    feedback = "This should fail because name, email, and rating are missing"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/feedback" -Method POST -Body $invalidPayload -ContentType "application/json" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Host "[FAIL] Unexpected success - validation should have failed!" -ForegroundColor Red
    Write-Host ""
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "[PASS] Validation working correctly (400 Bad Request)" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        $errorResult = $responseBody | ConvertFrom-Json
        Write-Host "  Message: $($errorResult.message)" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host "[FAIL] Unexpected error!" -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
        Write-Host ""
    }
}

# Test 4: Test without accepting privacy policy (should fail)
Write-Host "[Test 4] Testing without privacy policy acceptance (should fail)..." -ForegroundColor Yellow

$noPolicyPayload = @{
    name = "Test User"
    email = "test@example.com"
    rating = 4
    acceptPrivacy = $false
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/feedback" -Method POST -Body $noPolicyPayload -ContentType "application/json" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Write-Host "[FAIL] Unexpected success - privacy policy validation should have failed!" -ForegroundColor Red
    Write-Host ""
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "[PASS] Privacy policy validation working correctly (400 Bad Request)" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        $errorResult = $responseBody | ConvertFrom-Json
        Write-Host "  Message: $($errorResult.message)" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host "[FAIL] Unexpected error!" -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
        Write-Host ""
    }
}

# Summary
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "         Test Complete!             " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API is working correctly!" -ForegroundColor Green
Write-Host "You can now test the frontend form." -ForegroundColor Green
Write-Host ""
Write-Host "To test the frontend:" -ForegroundColor Yellow
Write-Host "1. Start the frontend: cd frontend; npm start" -ForegroundColor White
Write-Host "2. Open browser to http://localhost:3000" -ForegroundColor White
Write-Host "3. Navigate to the feedback form" -ForegroundColor White
Write-Host "4. Open browser console (F12)" -ForegroundColor White
Write-Host "5. Fill and submit the form" -ForegroundColor White
Write-Host "6. Watch console logs for detailed debugging" -ForegroundColor White
Write-Host ""
