#!/bin/bash

# Function to get file size in MB
get_file_size_mb() {
    local file="$1"
    local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    echo $((size / 1024 / 1024))
}

# Function to optimize video to max 4MB
optimize_video() {
    local input="$1"
    local output="${input%.mp4}_optimized.mp4"
    local duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$input" 2>/dev/null)
    
    # Calculate target bitrate (4MB = 32Mbits, reserve ~128kbps for audio)
    local target_size_mb=4
    local target_bits=$((target_size_mb * 8))
    local audio_bitrate=128
    local video_bitrate=$(( (target_bits * 1000 / ${duration%.*}) - audio_bitrate ))
    
    echo "Optimizing $input (duration: ${duration}s, target bitrate: ${video_bitrate}k)"
    
    # Two-pass encoding for better quality
    ffmpeg -y -i "$input" -c:v libx264 -b:v ${video_bitrate}k -pass 1 -an -f null /dev/null 2>/dev/null
    ffmpeg -y -i "$input" -c:v libx264 -b:v ${video_bitrate}k -pass 2 -c:a aac -b:a ${audio_bitrate}k -movflags +faststart "$output" 2>/dev/null
    
    # Replace original if optimization successful
    if [ -f "$output" ]; then
        local new_size_mb=$(get_file_size_mb "$output")
        if [ $new_size_mb -le 4 ]; then
            mv "$output" "$input"
            echo "✓ $input optimized to ${new_size_mb}MB"
        else
            echo "✗ $input still too large (${new_size_mb}MB), trying lower bitrate..."
            rm "$output"
            # Try with 20% lower bitrate
            video_bitrate=$((video_bitrate * 80 / 100))
            ffmpeg -y -i "$input" -c:v libx264 -b:v ${video_bitrate}k -pass 1 -an -f null /dev/null 2>/dev/null
            ffmpeg -y -i "$input" -c:v libx264 -b:v ${video_bitrate}k -pass 2 -c:a aac -b:a ${audio_bitrate}k -movflags +faststart "$output" 2>/dev/null
            if [ -f "$output" ]; then
                mv "$output" "$input"
                new_size_mb=$(get_file_size_mb "$input")
                echo "✓ $input optimized to ${new_size_mb}MB (second attempt)"
            fi
        fi
        # Clean up pass files
        rm -f ffmpeg2pass-*.log* 2>/dev/null
    fi
}

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Checking videos in: $SCRIPT_DIR"
echo ""

# Process all .mp4 files in the directory
for video in *.mp4; do
    # Skip if no .mp4 files found
    [ -e "$video" ] || continue
    
    # Skip background-main.mp4
    if [ "$video" = "background-main.mp4" ]; then
        echo "⊘ Skipping $video (excluded)"
        continue
    fi
    
    # Get file size
    file_size_mb=$(get_file_size_mb "$video")
    
    # Check if file is larger than 4MB
    if [ $file_size_mb -gt 4 ]; then
        echo "→ $video is ${file_size_mb}MB (needs optimization)"
        optimize_video "$video"
        echo ""
    else
        echo "✓ $video is ${file_size_mb}MB (already optimized, skipping)"
    fi
done

echo "Done!"
