import os
import cv2
import numpy as np

frames_dir = r"C:\Users\SEBIN\Desktop\AV\reports\clip-01-analysis\frames-png"
total_frames = 240
fps = 24.0

print(f"Analyzing {total_frames} frames from {frames_dir}...")

# Sample frames across key milestones
# Let's inspect frame differences to detect motion velocity
diffs = []
prev_gray = None

for i in range(1, total_frames + 1):
    frame_path = os.path.join(frames_dir, f"frame_{i:03d}.png")
    if not os.path.exists(frame_path):
        continue
    img = cv2.imread(frame_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    if prev_gray is not None:
        # compute mean absolute difference
        diff = np.mean(np.abs(gray.astype(float) - prev_gray.astype(float)))
        diffs.append((i, diff))
    prev_gray = gray

print("\nMotion difference analysis (sample every 12 frames / 0.5s):")
for i, d in diffs[::12]:
    sec = i / fps
    print(f"Frame {i:03d} (t={sec:4.2f}s): motion_diff = {d:6.2f}")

# Look at the last 30 frames (sec 8.75 to 10.0)
print("\nLast 25 frames motion (sec 9.0 to 10.0):")
for i, d in diffs[-25:]:
    sec = i / fps
    print(f"Frame {i:03d} (t={sec:4.2f}s): motion_diff = {d:6.2f}")

# Find frames with lowest motion near the end
late_diffs = diffs[-48:] # last 2 seconds
sorted_late = sorted(late_diffs, key=lambda x: x[1])
print("\nTop 5 lowest-motion frames in the final 2 seconds:")
for i, d in sorted_late[:5]:
    sec = i / fps
    print(f"Frame {i:03d} (t={sec:4.2f}s): motion_diff = {d:6.2f}")
