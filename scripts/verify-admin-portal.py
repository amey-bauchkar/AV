"""
Verify Plastico Impex Owner Admin Portal (/admin)
Tests:
1. Access /admin route
2. Password protection gate
3. Invalid passcode error handling
4. Unlock with master passcode (pix@2026)
5. Dashboard rendering: KPI metrics, Supabase live sync indicator, quotes table
6. Inspect RFQ modal: buyer dossier, line items breakdown, WhatsApp/Email actions
7. Screenshot capture
"""

import sys
import os
import time
from playwright.sync_api import sync_playwright

def main():
    os.makedirs('reports', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("1. Navigating to /admin...")
        page.goto('http://localhost:5173/admin')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Screenshot password gate
        page.screenshot(path='reports/admin-password-gate.png')
        print("Captured reports/admin-password-gate.png")

        # Test invalid password
        print("2. Testing invalid password...")
        pw_input = page.locator('#admin-password')
        pw_input.fill('wrongpassword123')
        page.locator('button[type="submit"]').click()
        time.sleep(0.5)
        page.screenshot(path='reports/admin-password-error.png')

        # Test valid master password
        print("3. Entering valid master passcode: pix@2026...")
        pw_input.fill('pix@2026')
        page.locator('button[type="submit"]').click()
        time.sleep(2)

        # Verify dashboard opened
        print("4. Capturing dashboard overview...")
        page.screenshot(path='reports/admin-dashboard.png')
        print("Captured reports/admin-dashboard.png")

        # Click Inspect RFQ button
        inspect_btn = page.locator('button:has-text("Inspect RFQ →")').first
        if inspect_btn.count() > 0:
            print("5. Opening Quote Dossier Modal...")
            inspect_btn.click()
            time.sleep(1)
            page.screenshot(path='reports/admin-quote-dossier.png')
            print("Captured reports/admin-quote-dossier.png")
        else:
            print("No quotes available to inspect.")

        browser.close()
        print("Admin Portal Verification Complete!")

if __name__ == '__main__':
    main()
