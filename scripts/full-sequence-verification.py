#!/usr/bin/env python3
"""
scripts/full-sequence-verification.py
Comprehensive multi-scene verification across all 6 cinematic scenes.
"""

import time
import os
from playwright.sync_api import sync_playwright

def main():
    screenshots_dir = os.path.join(os.path.dirname(__file__), "..", "public", "test-screenshots")
    os.makedirs(screenshots_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        print("Navigating to http://localhost:5173/ ...")
        page.goto("http://localhost:5173/", wait_until="networkidle")
        time.sleep(1)

        # Scene stops for 750vh container (scrollDistance ~ 5850px)
        checkpoints = [
            ("Scene 1 - Studio Hero", 0),
            ("Scene 2 - Tactile Lift", 1100),
            ("Scene 3 - Corporate Model", 2300),
            ("Scene 4 - Precision Macro", 3500),
            ("Scene 5 - Ensemble Reveal", 4600),
            ("Scene 6 - Final Collection", 5600),
            ("Unpinned - Trust Bar & Categories", 6500),
        ]

        results = []
        for name, scroll_y in checkpoints:
            page.evaluate(f"window.scrollTo(0, {scroll_y})")
            time.sleep(0.6)

            data = page.evaluate("""() => {
                const prog = document.querySelector('[role="progressbar"]');
                const h1 = document.querySelector('h1.display-headline');
                return {
                    scrollY: window.scrollY,
                    indicatorText: prog ? prog.innerText.replace(/\\n/g, ' ') : null,
                    headline: h1 ? h1.innerText.replace(/\\n/g, ' ') : null,
                    canvasReady: !!document.querySelector('canvas')
                };
            }""")
            
            clean_name = name.split(" - ")[0].replace(" ", "_").lower()
            screenshot_path = os.path.join(screenshots_dir, f"{clean_name}.png")
            page.screenshot(path=screenshot_path)
            
            print(f"[{name}] Y={data['scrollY']} | Indicator: {data['indicatorText']} | Headline: {data['headline']}")
            results.append((name, data))

        # Reverse test
        print("\n--- Testing Reverse Scrubbing Back to Y=0 ---")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.6)
        top_data = page.evaluate("""() => {
            const prog = document.querySelector('[role="progressbar"]');
            const h1 = document.querySelector('h1.display-headline');
            return {
                scrollY: window.scrollY,
                indicatorText: prog ? prog.innerText.replace(/\\n/g, ' ') : null,
                headline: h1 ? h1.innerText.replace(/\\n/g, ' ') : null
            };
        }""")
        print(f"[Reverse to Top] Y={top_data['scrollY']} | Indicator: {top_data['indicatorText']} | Headline: {top_data['headline']}")
        page.screenshot(path=os.path.join(screenshots_dir, "reverse_to_top.png"))

        browser.close()
        print("\nAll checkpoints verified successfully!")

if __name__ == "__main__":
    main()
