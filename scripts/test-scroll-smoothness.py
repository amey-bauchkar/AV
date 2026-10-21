from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type in ['error', 'warning'] else None)
    page.on("pageerror", lambda err: console_errors.append(str(err)))
    
    start_time = time.time()
    page.goto('http://localhost:5173/', wait_until='domcontentloaded')
    load_time = time.time() - start_time
    print(f"Page loaded in {load_time:.2f}s")
    
    page.wait_for_timeout(600)
    
    # Check initial scene
    pbar = page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')")
    print("Initial Scene:", pbar)
    assert "01 / 06" in pbar, f"Expected Scene 1, got {pbar}"
    
    # Perform gradual, smooth mouse wheel ticks simulating human scroll
    print("Simulating smooth human scroll down...")
    scenes_seen = set()
    scenes_seen.add(pbar)
    
    total_wheel_steps = 25
    step_delta = 350
    for i in range(total_wheel_steps):
        page.mouse.wheel(0, step_delta)
        page.wait_for_timeout(100) # 100ms between gestures allows LERP smoothing to glide
        current_pbar = page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')")
        scenes_seen.add(current_pbar)
    
    # Wait for LERP to settle
    page.wait_for_timeout(800)
    final_pbar = page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')")
    scenes_seen.add(final_pbar)
    
    print(f"Scenes traversed during smooth scroll: {sorted(list(scenes_seen))}")
    print("Final scene after scroll:", final_pbar)
    assert len(scenes_seen) >= 4, f"Expected to traverse at least 4 scenes, saw: {scenes_seen}"
    
    # Now reverse scroll smoothly
    print("Simulating smooth human scroll up (reverse)...")
    for i in range(20):
        page.mouse.wheel(0, -step_delta)
        page.wait_for_timeout(100)
        
    page.wait_for_timeout(800)
    reversed_pbar = page.evaluate("document.querySelector('[role=\"progressbar\"]').innerText.replace(/\\n/g, ' ')")
    print("Scene after reverse scroll:", reversed_pbar)
    assert "01 / 06" in reversed_pbar or "02 / 06" in reversed_pbar, f"Expected return towards opening scenes, got {reversed_pbar}"
    
    print("Console errors/warnings:", console_errors)
    assert len(console_errors) == 0, f"Found console errors: {console_errors}"
    
    print("ALL SMOOTH SCROLL CHECKS PASSED PERFECTLY!")
    browser.close()
