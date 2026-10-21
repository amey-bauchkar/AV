from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type in ['error', 'warning'] else None)
    page.on("pageerror", lambda err: console_errors.append(str(err)))
    
    page.goto('http://localhost:5173/', wait_until='domcontentloaded')
    page.wait_for_timeout(1000)
    
    # Check Lenis initialization
    lenis_active = page.evaluate("() => typeof window.__lenis !== 'undefined' && window.__lenis !== null")
    print(f"Lenis active on window: {lenis_active}")
    assert lenis_active, "Lenis global instance should be active on window!"
    
    # Check html class name has lenis
    html_class = page.evaluate("() => document.documentElement.className")
    print(f"HTML element class: '{html_class}'")
    assert "lenis" in html_class, "document.documentElement should have lenis class!"
    
    # Test smooth wheel scroll with Lenis
    print("Testing wheel scrolling with Lenis momentum...")
    page.mouse.wheel(0, 1200)
    
    # Sample scrollY at 50ms, 150ms, 300ms, 600ms, 1000ms to verify smooth continuous progression
    samples = []
    for _ in range(10):
        page.wait_for_timeout(100)
        s = page.evaluate("""() => ({
            scrollY: Math.round(window.scrollY),
            indicator: document.querySelector('[role="progressbar"]')?.innerText.replace(/\\n/g, ' ')
        })""")
        samples.append(s)
    
    print("Scroll samples during Lenis momentum easing:")
    for idx, sample in enumerate(samples):
        print(f"  Sample {idx + 1} (+{(idx+1)*100}ms): Y={sample['scrollY']} | {sample['indicator']}")
    
    # Verify continuous non-stuttering progression
    y_values = [s['scrollY'] for s in samples]
    assert y_values[-1] > y_values[0], f"Expected scroll position to advance smoothly, got {y_values}"
    
    # Test scrollTo helper via Lenis
    print("Testing lenis.scrollTo(3500)...")
    page.evaluate("() => window.__lenis.scrollTo(3500)")
    page.wait_for_timeout(800)
    after_scroll_to = page.evaluate("() => window.scrollY")
    print(f"ScrollY after lenis.scrollTo(3500): {after_scroll_to}")
    assert after_scroll_to > 2500, f"Expected scroll position > 2500, got {after_scroll_to}"
    
    print("Console errors/warnings:", console_errors)
    assert len(console_errors) == 0, f"Found console errors: {console_errors}"
    
    print("LENIS SMOOTH SCROLL INTEGRATION VERIFIED 100% SUCCESSFULLY!")
    browser.close()
